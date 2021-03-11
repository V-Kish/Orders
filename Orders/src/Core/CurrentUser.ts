import {saveData} from './saveData';
import {readData} from './readData';
import {AppLog} from '../Common/AppLog';
import AsyncStorage from '@react-native-community/async-storage';
import { UserDataProvider } from '../DataProvider/UserDataProvider';
import {store} from '../Chat/provider/Store';
type user = {
  userToken: string | null;
  userId: string | null;
};
class CurrentUserImpl {
  private _user: user;
  private _mistakeHeight: number | null;
  private _saveAreaInset: {
    top:number;
    bottom:number;
    height:number;
  };
  constructor() {
    this._user = {
      userToken: null,
      userId: null,
    };
    this._mistakeHeight = null;
    this._saveAreaInset = {
      // top:RNStaticSafeAreaInsets.safeAreaInsetsTop,
      // bottom:RNStaticSafeAreaInsets.safeAreaInsetsBottom,
      // height:RNStaticSafeAreaInsets.safeAreaHeight
        top:0,
        bottom:0,
        height:0
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
  get mistakeHeight() {
    return this._mistakeHeight;
  }
  get saveAreaInset() {
    return this._saveAreaInset;
  }
  set mistakeHeight(value) {
    if (this._mistakeHeight === null) {
      this._mistakeHeight = value;
    }
  }
  get contact() {
    const contact = store().contactsItems.getOrAdd(this._user.userId);
    return contact;
  }

  get contactIcon() {
    const contact = store().contactsItems.getOrAdd(this._user.userId);
    return contact.icon;
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
