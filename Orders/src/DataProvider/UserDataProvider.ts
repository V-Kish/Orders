import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';
import messaging from '@react-native-firebase/messaging';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBodyToken} from '../Types';
import {AppLog} from '../Common/AppLog';
import { baseResponse, IItemType, requestBodyType } from '../DataTypes/BaseTypes';
import {paramsCreateFetchBody, deviceInfoType, getDeviceId} from '../DataTypes/UserDataProviderTypes';
import { readData } from '../Core/readData';
class UserDataProvider {
  // Авторизація користувача
  static async AuthorizationFetch(body) {
    return fetchData('/rest/v1/tokens/register', 'POST', body);
  }
  // Logout user
  static async userLogout() {
    return fetchData(
      `rest/v1/${currentUser().userId}/${currentUser().userToken}/user/logout`,
      'PUT',
    );
  }
  static async getTokenFireBase() {
    return new Promise((resolve, reject) => {
      messaging()
        .getToken()
        .then(
          (deviceToken) => {
            //AppLog.log('response device token', deviceToken)
            resolve(deviceToken);
          },
          (error) => {
            reject(error);
          },
        )
        .catch((error) => {
          reject(error);
        });
    });
  }
  static async saveTokenToDatabase(
    userToken: string | null,
    deviceToken: unknown,
  ) {
    const deviceInfo = await PhoneInfo.getDeviceInfo();
    const body: AuthBodyToken = {
      token: deviceToken,
      deviceInfo: JSON.stringify(deviceInfo),
    };
    return new Promise((resolve, reject) => {
      fetchData(
        `/rest/v1/${currentUser().userId}/${
          currentUser().userToken
        }/user/firebase/cloud-messaging/save-token`,
        'POST',
        body,
        userToken,
      )
        .then(
          (response) => {
            AppLog.log('send firebase token', response);
            resolve(response);
          },
          (error) => {
            reject(error);
          },
        )
        .catch((error) => {
          reject(error);
        });
    });
  }
  static async createFetchBody(
      params: paramsCreateFetchBody,
      device: boolean,
  ): Promise<requestBodyType> {
    try {
      let deviceInfo: deviceInfoType = null;
      const readPhoneInfo = await readData('PhoneInfo');
      let data: deviceInfoType = null;
      if (readPhoneInfo != null) {
        data = JSON.parse(readPhoneInfo);
      }
      if (data === null) {
        deviceInfo = await PhoneInfo.getDeviceInfo();
      } else {
        deviceInfo = data;
      }
      let bodyAuth: getDeviceId = {};
      if (device) {
        bodyAuth = {
          ...params,
          deviceInfo: JSON.stringify(deviceInfo),
        };
      } else {
        bodyAuth = {
          ...params,
        };
      }
      return bodyAuth;
    } catch (error) {
      console.log('deviceInfo error', error);
      return {
        ...params,
        deviceInfo: null,
      };
    }
  }
  async function loadData<T extends baseResponse<IItemType>>(
      func: (bodyF: requestBodyType) => Promise<T>,
      params: object,
      retryCount: number = 0,
      deviceInfo: boolean = false,
  ) {
    if (retryCount >= 3) {
      return emptyResponse(600, 'retryLimit');
    }
    try {
      const body = await UserDataProvider.createFetchBody(params, deviceInfo);
      return await func(body);
    } catch (ex) {
      console.log('exception', ex);
      // if (controllers().noConnection.hasInternet){
      //   controllers().information.makeServerErrorModal(async () => {
      //     // await loadData(func, params, retryCount++);
      //   });
      // }
      return emptyResponse(600, 'retryLimit');
    }
  }
  async function emptyResponse(
      statusCode: number,
      statusMessage: string,
  ): Promise<baseResponse<IItemType>> {
    return {
      statusCode,
      statusMessage,
      data: {
        Items: [],
        PageIndex: 0,
        PageSize: 0,
        TotalItems: 0,
        TotalPages: 0,
      },
    };
  }
}
export {UserDataProvider , loadData};
