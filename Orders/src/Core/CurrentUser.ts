import { saveData } from './saveData';
import { readData } from './readData';
import { AppLog } from '../Common/AppLog';
import AsyncStorage from '@react-native-community/async-storage';
type user = {

};
class CurrentUserImpl {
  private _user: user;
  constructor() {
    this._user = {
      userToken: null,
      name: null,
      phone: null,
      timeStamp: 0,
      isTokenValid: false,
      tokenExpirationTime: 1000 * 60 * 60 * 24 * 6,
      cardInfo: null,
      current: null,
    };
  }

  set userToken(userToken) {
    this.user.userToken = userToken;
  }

  get userToken() {
    return this.user.userToken;
  }

  set userSavingsAccount(value) {
    this.user.current = value;
  }

  get userSavingsAccount() {
    return this.user.current;
  }
  get pointsAwarded() {
    if (this.user.cardInfo === null) {
      return '0';
    } else {
      return this.user.cardInfo.balance.diff;
    }
  }

  secureUserDataSet(name) {
    AppLog.log('name', name);
    if (!name.hasOwnProperty('timeStamp') || name.timeStamp === 0) {
      name.timeStamp = new Date().getTime();
    }
    this.user.timeStamp = name.timeStamp;
    this.user.userToken = name.userToken;
    this.isTokenValid = name.timeStamp;
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

  set isTokenValid(timeStamp) {
    if (this.userToken === null) {
      this.user.isTokenValid = false;
    } else {
      this.user.isTokenValid =
        new Date().getTime() - timeStamp <= this.user.tokenExpirationTime;
    }
  }

  get isTokenValid() {
    AppLog.log('GET', this.user.isTokenValid);
    return this.user.isTokenValid;
  }
  set restoreUserData(string: string) {
    if (typeof string !== 'undefined' || string !== false || string !== null) {
      let jsonData = JSON.parse(string);
      this.user.userToken = jsonData.userToken;
      this.user.name = jsonData.name;
      this.user.phone = jsonData.phone;
      this.user.timeStamp = jsonData.timeStamp;
      this.user.isTokenValid = jsonData.timeStamp;
      this.user.cardInfo = jsonData.cardInfo;
      this.user.current = jsonData.current;
      AppLog.log('isUserPinCode save', this.user);
    }
  }

  get user(): user {
    return this._user;
  }

  set user(value: user) {
    this._user.name = value.name;
    this._user.phone = value.phone;
    this._user.cardInfo = value.cardInfo;
  }
  async logout() {
    const logoutUser = await UserDataProvider.userlogout();
    this._user = {
      userToken: null,
      name: null,
      phone: null,
      timeStamp: 0,
      isTokenValid: false,
      tokenExpirationTime: 1000 * 60 * 60 * 24 * 6,
      cardInfo: null,
      current: null,
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
