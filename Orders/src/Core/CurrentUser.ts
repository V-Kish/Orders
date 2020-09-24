import {saveData} from './saveData';
import {readData} from './readData';
import {AppLog} from '../Common/AppLog';
import AsyncStorage from '@react-native-community/async-storage';
import { UserDataProvider } from '../DataProvider/UserDataProvider';
type user = {
  userToken: string | null;
  userId: string | null;
};
class CurrentUserImpl {
  private _user: user;
  constructor() {
    this._user = {
      userToken: null,
      userId: null,
    };
  }

  set userToken(userToken) {
    this.user.userToken = userToken;
  }

  get userToken() {
    return this.user.userToken;
  }
  set userId(userId) {
    this.user.userId = userId;
  }

  get userId() {
    return this.user.userId;
  }

  // use background
  saveUser() {
    AppLog.log('saveUser', this.user);
    const userData = JSON.stringify(this.user);
    saveData('secureUserData', userData).then();
  }

  async secureUserDataGet() {
    return await readData('secureUserData');
  }

  set restoreUserData(string: string) {
    if (typeof string !== 'undefined' || string !== false || string !== null) {
      let jsonData = JSON.parse(string);
      this.user.userToken = jsonData.userToken;
      this.user.userId = jsonData.userId;
      AppLog.log('isUserPinCode save', this.user);
    }
  }

  get user(): user {
    return this._user;
  }

  set user(value: user) {
    this._user = value;
  }
  async logout() {
    const logoutUser = await UserDataProvider.userLogout();
    this._user = {
      userToken: null,
      userId: null,
    };
    await AsyncStorage.removeItem('secureUserData');
    await AsyncStorage.removeItem('appState');
  }
}

// @ts-ignore
global.__app__ = global.__app__ || {};
// @ts-ignore
global.__app__.currentUser =
  // @ts-ignore
  global.__app__.currentUser || new CurrentUserImpl();

export function currentUser(): CurrentUserImpl {
  // @ts-ignore
  return global.__app__.currentUser;
}
