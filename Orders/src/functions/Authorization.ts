import {AuthorizationData} from '../DataProvider/AuthorizationData';
import {Alert} from 'react-native';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {AppLog} from '../Common/AppLog';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody} from '../Types';
import {currentUser} from '../Core/CurrentUser';

class Authorization {
  // Список регіонів
  static async authorizationUser(dispatch: Dispatch<any>, userData: AuthBody) {
    // get userToken
    const body: AuthBody = userData;
    // @ts-ignore
    if (typeof body.login === undefined || typeof body.password === undefined) {
      Alert('ERROR 1');
      return;
    }
    body.deviceInfo = await this.createFetchBody();
    try {
      const authorization = await AuthorizationData.AuthorizationFetch(body);
      if (authorization.statusCode !== 200) {
        // @ts-ignore
        Alert('ERROR 2');
      }
      navigator().changeNavigationStateAuth(false, dispatch);
    } catch (ex) {
      Alert('ERROR 3');
      AppLog.error('Authorization authorizationUser', ex);
    }
    // send firebase token to server
    try {
      await AuthorizationData.getTokenFireBase().then((deviceToken) => {
        AuthorizationData.saveTokenToDatabase(
          currentUser().userToken,
          deviceToken,
        );
      });
    } catch (ex) {
      console.warn('Auth getTokenFireBase', ex);
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
