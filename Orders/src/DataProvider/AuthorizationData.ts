import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';
import messaging from '@react-native-firebase/messaging';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBodyToken} from '../Types';
import {AppLog} from '../Common/AppLog';
class AuthorizationData {
  // Список регіонів
  static async AuthorizationFetch(body) {
    return fetchData('/rest/v1/tokens/register', 'POST', body);
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
            AppLog.log('response 1', response);
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
}
export {AuthorizationData};
