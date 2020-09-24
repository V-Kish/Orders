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
import {getOrders, getOrdersCount} from '../store/actions/Dictionaries';

class Authorization {
  // Список регіонів
  static async authorizationUser(dispatch: Dispatch<any>, userData: AuthBody) {
    // get userToken
    const body: AuthBody = userData;
    // @ts-ignore
    body.deviceInfo = await this.createFetchBody();
    body.appCode = 'OrdersApp';
    console.log('authorization body', body);
    try {
      const authorization = await UserDataProvider.AuthorizationFetch(body);
      console.log('authorization', authorization);
      if (
        authorization.statusCode === 403 &&
        authorization.statusMessage === 'forbidden'
      ) {
        // @ts-ignore
        navigator().navigate('ErrorScreen');
        return;
      }
      if (authorization.statusCode === 403) {
        alert(authorization.data.message);
        navigator().navigate('ErrorScreen');
        return;
      }
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
    try {
      const response = await MethodsRequest.getOrdersNumber();
      if (response.statusCode === 200){
        dispatch(getOrdersCount(response.result))
      }
    }catch (ex) {
      console.warn('MethodsRequest.getOrdersNumber',ex)
    }
    // load Dictionaries
    try {
      await Dictionaries.InitDictionaries(function () {
        navigator().changeNavigationStateAuth(false, dispatch);
        navigator().state.prevScreen.push({name: "HomeScreen", params: {data: {},key: undefined, screen: null}});
      }, dispatch);
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
