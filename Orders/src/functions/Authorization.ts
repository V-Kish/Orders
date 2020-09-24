import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {Alert} from 'react-native';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {AppLog} from '../Common/AppLog';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody} from '../Types';
import {currentUser} from '../Core/CurrentUser';
import {Dictionaries} from '../DataProvider/Dictionaries';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {getOrders} from '../store/actions/Dictionaries';

class Authorization {
  // Список регіонів
  static async authorizationUser(dispatch: Dispatch<any>, userData: AuthBody) {
    // get userToken
    const body: AuthBody = userData;
    // @ts-ignore
    body.deviceInfo = await this.createFetchBody();
    try {
      const authorization = await UserDataProvider.AuthorizationFetch(body);
      console.log('authorization', authorization);
      if (authorization.statusCode !== 200) {
        // @ts-ignore
        alert(authorization.data.message);
        return false;
      }
      // save user token
      currentUser().userToken = authorization.data.accessToken;
      currentUser().userId = authorization.data.userId;
      console.log('authorization body', body);
    } catch (ex) {
      alert('ERROR 3');
      return;
      AppLog.error('Authorization authorizationUser', ex);
    }
    // send firebase token to server
    try {
      await UserDataProvider.getTokenFireBase().then((deviceToken) => {
        UserDataProvider.saveTokenToDatabase(
          currentUser().userToken,
          deviceToken,
        );
      });
    } catch (ex) {
      console.warn('Auth getTokenFireBase', ex);
    }
    currentUser().saveUser();
    // load Dictionaries
    try {
      await Dictionaries.InitDictionaries(function () {
        navigator().changeNavigationStateAuth(false, dispatch);
      }, dispatch);
    } catch (ex) {
      console.warn('Auth getTokenFireBase', ex);
    }
    try {
      const response = await MethodsRequest.getOrders();
      if (response.statusCode !== 200) {
        return;
      }
      dispatch(getOrders(response.data));
    } catch (ex) {
      console.warn('MethodsRequest getOrders', ex);
    }
  }

  // Create body for fetch
  private static async createFetchBody() {
    try {
      const deviceInfo = await PhoneInfo.getDeviceInfo();
      return JSON.stringify(deviceInfo);
    } catch (error) {
      console.log('deviceInfo error', error);
    }
  }
}
export {Authorization};
