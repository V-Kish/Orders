import {NavigationController} from './NavigationController';
import {AuthController} from './AuthController';
import {ChatController} from './ChatController';
import {CounterModel} from '../Model/CounterModel';
import { AppStateControllerModel } from '../Model/AppStateControllerModel/AppStateControllerModel';
import { DrawerSwitchModel } from '../navigation/DrawerSwitchModel';

class ControllersImpl {
  private readonly _navigationController: NavigationController;
  private readonly _authController: AuthController;
  private readonly _drawerSwitch: DrawerSwitchModel;
  private readonly _chatController: ChatController;
  private readonly _chatsCounter: CounterModel;
  private readonly _appStateControllerModel: AppStateControllerModel;

  constructor() {
    this._chatsCounter = new CounterModel({id: 'chatsCounter', counter: 0});
    this._navigationController = new NavigationController();
    this._authController = new AuthController();
    this._drawerSwitch = new DrawerSwitchModel({
      id: 'DrawerSwitch',
      counterModel: this._chatsCounter,
    });
    this._chatController = new ChatController();
    this._appStateControllerModel = new AppStateControllerModel({
      id: 'AppStateControllerModel',
    });
  }

  get chatsCounter() {
    return this._chatsCounter;
  }
  get appStateControllerModel() {
    return this._appStateControllerModel;
  }
  get navigationController() {
    return this._navigationController;
  }

  get authController() {
    return this._authController;
  }

  get drawerSwitch() {
    return this._drawerSwitch;
  }

  get chatController() {
    return this._chatController;
  }
}

// @ts-ignore
global.__app__ = global.__app__ || {};
// @ts-ignore
global.__app__.controllers =
  // @ts-ignore
  global.__app__.controllers || new ControllersImpl();

export function controllers(): ControllersImpl {
  // @ts-ignore
  return global.__app__.controllers;
}
