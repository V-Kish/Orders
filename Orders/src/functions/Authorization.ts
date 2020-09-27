import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody} from '../Types';
import {currentUser} from '../Core/CurrentUser';
import {Dictionaries} from '../DataProvider/Dictionaries';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {getOrdersCount} from '../store/actions/Dictionaries';
import {PreloaderMain} from '../store/actions/AppStart';

class Authorization {
  // Список регіонів
  static async authorizationUser(dispatch: Dispatch<any>, userData: AuthBody) {
    dispatch(PreloaderMain(true));
    // get userToken
    const body: AuthBody = userData;
    // @ts-ignore
    body.deviceInfo = await this.createFetchBody();
    body.appCode = 'OrdersApp';
    try {
      const authorization = await UserDataProvider.AuthorizationFetch(body);
      if (
        authorization.statusCode === 403 &&
        authorization.statusMessage === 'forbidden'
      ) {
        // @ts-ignore
        navigator().navigate('ErrorScreen');
        dispatch(PreloaderMain(false));
        return;
      }
      if (authorization.statusCode === 403) {
        alert(authorization.data.message);
        navigator().navigate('ErrorScreen');
        dispatch(PreloaderMain(false));
        return;
      }
      if (authorization.statusCode !== 200) {
        // @ts-ignore
        alert(authorization.data.message);
        dispatch(PreloaderMain(false));
        return false;
      }
      // save user token
      currentUser().userToken = authorization.data.accessToken;
      currentUser().userId = authorization.data.userId;
    } catch (ex) {
      dispatch(PreloaderMain(false));
      return;
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
      dispatch(PreloaderMain(false));
    }
    currentUser().saveUser();
    try {
      const response = await MethodsRequest.getOrdersNumber();
      if (response.statusCode === 200) {
        dispatch(getOrdersCount(response.result));
      }
    } catch (ex) {
      dispatch(PreloaderMain(false));
    }
    // load Dictionaries
    try {
      await Dictionaries.InitDictionaries(function () {
        navigator().changeNavigationStateAuth(false, dispatch);
        navigator().state.prevScreen.push({
          name: 'HomeScreen',
          params: {data: {}, key: undefined, screen: null},
        });
        dispatch(PreloaderMain(false));
      }, dispatch);
    } catch (ex) {
      dispatch(PreloaderMain(false));
    }
  }

  // Create body for fetch
  private static async createFetchBody() {
    try {
      const deviceInfo = await PhoneInfo.getDeviceInfo();
      return JSON.stringify(deviceInfo);
    } catch (error) {
    }
  }
}
export {Authorization};
