import {UserDataProvider} from '../DataProvider/UserDataProvider';
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
    console.log('body',body)
    console.log('body if',body.login === '' || body.password === '')
    // @ts-ignore
    if (body.login === '' || body.password === '') {
      alert('ERROR 1');
      return;
    }
    body.deviceInfo = await this.createFetchBody();
    try {
      const authorization = await UserDataProvider.AuthorizationFetch(body);
      console.log('authorization',authorization)
      if (authorization.statusCode !== 200) {
        // @ts-ignore
        alert(authorization.data.message);
        return
      }
      // save user token
      currentUser().userToken = authorization.data.accessToken;
      currentUser().userId = authorization.data.userId;
      console.log('authorization body',body)
      navigator().changeNavigationStateAuth(false, dispatch);
    } catch (ex) {
      alert('ERROR 3');
      return
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
