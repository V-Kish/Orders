import {AuthorizationData} from '../DataProvider/AuthorizationData';
import {Alert} from 'react-native';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {AppLog} from '../Common/AppLog';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody} from '../Types';

class Authorization {
  // Список регіонів
  static async authorizationUser(dispatch: Dispatch<any>) {
    // get userToken
    const body: AuthBody = await this.createFetchBody();
    if (body.login === '' || body.password === '') {
      Alert('ERROR 1');
      return;
    }
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
  }
  // Create body for fetch
  private static async createFetchBody() {
    try {
      const deviceInfo = await PhoneInfo.getDeviceInfo();
      const bodyAuth: AuthBody = {
        login: '',
        password: '',
        deviceInfo: JSON.stringify(deviceInfo),
      };
      return bodyAuth;
    } catch (error) {
      console.log('deviceInfo error', error);
      const bodyAuth: AuthBody = {
        login: '',
        password: '',
        deviceInfo: '',
      };
      return bodyAuth;
    }
  }
}
export {Authorization};
