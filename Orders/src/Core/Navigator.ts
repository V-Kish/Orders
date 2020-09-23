import { CommonActions, DrawerActions } from '@react-navigation/native';
import { AppLog } from '../Common/AppLog';
import { currentUser } from './CurrentUser';
import { readData } from './readData';
import { saveData } from './saveData';
import { controllers } from '../Controllers/Controllers';

type state = {
  prevScreen: Array<any>;
  appState: {
    isBackground: boolean;
  };
  carouselSelectedItem: { id: number; name: string };
  currency: { id: number; code: string };
};

type navigation = {
  dispatch: (navigate: any) => void;
};

type navigateParams = {
  key: any;
  screen: string | null;
  data: object;
};

/**
 *
 */
class NavigatorImpl {
  private _navigation: navigation | null;
  private _state: state;
  private _currentScreen: string;
  constructor() {
    this._navigation = null;
    this._state = {
      carouselSelectedItem: { id: 1, name: 'Ужгород' },
      currency: { id: 1, code: 'USD' },
      prevScreen: [],
      appState: {
        isBackground: false,
      },
    };
    this._currentScreen = 'StartScreen';
    this.saveNavigatorState = this.saveNavigatorState.bind(this);
    this.restoreNavigatorState = this.restoreNavigatorState.bind(this);
    this.handleBackground = this.handleBackground.bind(this);
  }

  get navigation(): navigation | null {
    return this._navigation;
  }

  set navigation(value) {
    this._navigation = value;
  }

  get state(): state {
    return this._state;
  }

  set state(value) {
    this._state = value;
  }
  get carouselSelectedItem() {
    return this._state.carouselSelectedItem;
  }

  set carouselSelectedItem(value) {
    this._state.carouselSelectedItem.id = value.id;
    this._state.carouselSelectedItem.name = value.name;
  }
  get currency() {
    return this._state.currency;
  }
  set currency(value) {
    this._state.currency.id = value.id;
    this._state.currency.code = value.code;
  }

  /**
   * Navigation setter
   * @param navigation
   */
  setNavigation(navigation: any) {
    if (navigation === null) {
      return;
    }
    this.navigation = navigation;
  }

  /**
   * Method navigate for navigation through application
   * @param name
   * @param params
   */
  navigate(
    name: string,
    params: navigateParams = { screen: null, data: {}, key: undefined },
  ) {
    type route = {
      name: string;
      params: navigateParams;
      key?: any;
    };
    if (this.state.prevScreen.length > 20) {
      this.deleteHistoryNavigation();
    }
    if (this.navigation === null || name === this.getCurrentScreen()) {
      return false;
    }
    try {
      this._currentScreen = params.screen ? params.screen : name;
      const route: route = {
        name,
        params,
      };
      if (params.key) {
        route.key = params.key;
      }
      this.navigation.dispatch(CommonActions.navigate(route));
      if (
        name !== 'CrossCursOrderSuccess' &&
        name !== 'CurrencyOperations' &&
        name !== 'CurrencyOrder' &&
        name !== 'CurrencyOperationsScreen' &&
        name !== 'CrossCursOrderScreen' &&
        name !== 'CurrencyOrderSuccess'
      ) {
        this.state.prevScreen.push({ name, params });
        return true;
      }

      return true;
    } catch (ex) {
      AppLog.log('NavigatorImpl navigate ex => ', ex);
    }
    return false;
  }

  get background() {
    return this.state.appState.isBackground;
  }

  set background(isBackground) {
    this.state.appState.isBackground = isBackground;
  }
  toOrderSuccess() {
    this.navigate('CurrencyOperationsScreen', {
      screen: 'CurrencyOrderSuccess',
      initial: false,
    });
  }

  toRegistration() {
    this.navigate('RegistrationScreen', {
      screen: 'RegistrationScreen',
      data: {},
      key: undefined,
    });
  }
  toGetCard() {
    this.navigate('HowToGetCardScreen', {
      screen: 'HowToGetCardScreen',
      data: {},
      key: undefined,
    });
  }
  toBonusAuth() {
    this.navigate('StartBonusProgramScreen', {
      screen: 'StartBonusProgramScreen',
      data: {},
      key: undefined,
    });
  }
  toGoBack() {
    const length = this.state.prevScreen.length;
    if (length < 2) {
      return;
    }
    this.navigate(this.state.prevScreen[this.state.prevScreen.length - 2].name);
    this.state.prevScreen.splice(length - 1, 2);
  }

  getCurrentScreen() {
    return this._currentScreen;
  }

  deleteHistoryNavigation() {
    this.state.prevScreen.splice(0, this.state.prevScreen.length - 20);
  }

  saveNavigatorState() {
    const stringifyConfig = JSON.stringify(this.state);
    saveData('appState', stringifyConfig).then();
  }

  restoreNavigatorState() {
    readData('appState').then(async (response) => {
      if (response !== null) {
        this.state = JSON.parse(response);
      }
    });
  }

  handleBackground(state: string) {
    switch (state) {
      case 'active':
        this.background = false;
        this.restoreNavigatorState();
        break;
      case 'background':
        currentUser().saveUser();
        this.background = true;
        this.saveNavigatorState();
        break;
    }
  }

  // Drawer Actions
  openDrawer() {
    if (this.navigation === null) {
      return false;
    }
    this.navigation.dispatch(DrawerActions.openDrawer());
  }

  closeDrawer() {
    if (this.navigation === null) {
      return false;
    }
    this.navigation.dispatch(DrawerActions.closeDrawer());
  }

  toggleDrawer() {
    if (this.navigation === null) {
      return false;
    }
    this.navigation.dispatch(DrawerActions.toggleDrawer());
  }
}

// @ts-ignore
global.__app__ = global.__app__ || {};
// @ts-ignore
global.__app__.navigator = global.__app__.navigator || new NavigatorImpl();

export function navigator(): NavigatorImpl {
  // @ts-ignore
  return global.__app__.navigator;
}
