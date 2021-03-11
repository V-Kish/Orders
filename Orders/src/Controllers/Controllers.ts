import {NavigationController} from './NavigationController';
import {AuthController} from './AuthController';
import {ConfirmOssbController} from './ConfirmOssbController';
import {ChoosePhotoModel} from '../Models/SelectedPhoto/ChoosePhotoModel';
import {AppStateControllerModel} from '../Models/AppStateControllerModel/AppStateControllerModel';
import {InformationModel} from '../Models/InformationModel';
import {Preloader} from '../Models/Components/Preloader';
import {PermissionModel} from '../Models/PermissionModel/PermissionModel';
import {NoConnection} from '../Models/NoConnection';
import {Extension} from '../Models/Extension';
import {OsbbAdminController} from './OsbbAdminController';
import {SharedController} from './SharedController';
import {BottomNavigationModel} from '../Models/navigation/BottomNavigation/BottomNavigationModel';
import {UserController} from './UserController';
import {DrawerSwitchModel} from '../Navigation/DrawerSwitchModel';
import {ChatController} from './ChatController';
import {StatementOfResidentsController} from '../Models/StatementOfResidentsStack/StatementOfResidentsController';
import {HeaderWithDrawerAndSearchModel} from '../Models/OsbbAdminStack/Modals/HeaderWithDrawerAndSearchModel';
import {Updator} from '../Common/Updator';
import {CounterModel} from '../Models/CounterModel';
import {AnonimusModelCollection} from "./AnonimusModelCollection";
import React from "react";
import {MultiBase} from "../Common/BaseModel";
import {FillBalance} from "../Models/BothStacks/FillBalance/FillBalance";
import {AboutProgramOSBB} from "../Screens/AboutProgramOSBB/AboutProgramOSBB";
import { AboutProgramOSBBModel } from '../Models/AboutProgramOSBBModel/AboutProgramOSBBModel';
import {BaseScreen} from "../Common/BaseScreen";
import {TestController} from "./TestController";
import Analytics from "../Models/Analytics/Analytics";
import {VotesCounter} from "../DataProvider/VotesCounter";
import {LastItemPaddingBottomModel} from "../Models/navigation/PagedList/LastItemPaddingBottomModel";

class ControllersImpl {
  private readonly _navigationController: NavigationController;
  private readonly _authController: AuthController;
  private readonly _confirmOssbController: ConfirmOssbController;
  private readonly _osbbAdminController: OsbbAdminController;
  private readonly _drawerSwitch: DrawerSwitchModel;
  private readonly _appStateControllerModel: AppStateControllerModel;
  private readonly _preloader: Preloader;
  private readonly _permissions: PermissionModel;
  private readonly _choosePhotoModel: ChoosePhotoModel;
  private readonly _information: InformationModel;
  private readonly _noConnection: NoConnection;
  private readonly _extension: Extension;
  private readonly _sharedController: SharedController;
  private readonly _bottomNavigation: BottomNavigationModel;
  private readonly _userController: UserController;
  private readonly _chatController: ChatController;
  private readonly _statementOfResidentsController: StatementOfResidentsController;
  private readonly _defaultHeader: HeaderWithDrawerAndSearchModel;
  private readonly _updator: Updator;
  private readonly _chatsCounter: CounterModel;
  private readonly _anonimusModelCollection: AnonimusModelCollection;
  private readonly _fillBalance: FillBalance;
  private readonly _aboutProgramOSBB: AboutProgramOSBBModel;
  private readonly _testController: TestController;
  private readonly _analytics: Analytics;
  private readonly _votesCounter: VotesCounter;
  private readonly _lastItemPaddingBottom: LastItemPaddingBottomModel;

  constructor() {
    this._chatsCounter = new CounterModel({id: 'chatsCounter', counter: 0});
    this._navigationController = new NavigationController();
    this._authController = new AuthController();
    this._confirmOssbController = new ConfirmOssbController();
    this._osbbAdminController = new OsbbAdminController();
    this._sharedController = new SharedController();
    this._drawerSwitch = new DrawerSwitchModel({
      id: 'DrawerSwitch',
      counterModel: this._chatsCounter,
    });
    this._appStateControllerModel = new AppStateControllerModel({
      id: 'AppStateControllerModel',
    });
    this._preloader = new Preloader({id: 'preloader'});
    this._permissions = new PermissionModel('permissions');
    this._choosePhotoModel = new ChoosePhotoModel({id: 'choosePhotoModel'});
    this._information = new InformationModel({id: 'information'});
    this._noConnection = new NoConnection({id: 'noConnection'});
    this._extension = new Extension({id: 'extension'});
    this._bottomNavigation = new BottomNavigationModel({
      id: 'BottomNavigationModel',
      chatsCounter: this._chatsCounter,
    });
    this._userController = new UserController();
    this._chatController = new ChatController();
    this._statementOfResidentsController = new StatementOfResidentsController({
      id: 'StatementOfResidentsController',
    });
    this._defaultHeader = new HeaderWithDrawerAndSearchModel({
      id: 'HeaderDefaultModel',
      onChangeText: () => {},
      showSearchForm: false,
      showDrawerBtn: false,
    });
    this._updator = new Updator();
    this._fillBalance = new FillBalance();
    this._anonimusModelCollection = new AnonimusModelCollection();
    this._aboutProgramOSBB = new AboutProgramOSBBModel('AboutProgramOSBBModel');
    this._analytics = new Analytics();
    this._testController = new TestController();
    this._votesCounter = new VotesCounter();
    this._lastItemPaddingBottom = new LastItemPaddingBottomModel(
      'LastItemPaddingBottomModelController',
    );
  }
  get votesCounter(){
    return this._votesCounter
  }
  get analytics(){
    return this._analytics
  }
  get testController(){
    return this._testController
  }
  public getAnonimusComponent(component: typeof React.Component, key: string, model: typeof MultiBase|null = null): MultiBase{
   return this._anonimusModelCollection.getOrAdd(component, key, model)
  }
  get fillBalance(){
    return this._fillBalance
  }
  get aboutProgramOSBB(){
    return this._aboutProgramOSBB
  }
  get chatsCounter() {
    return this._chatsCounter;
  }
  get sharedController() {
    return this._sharedController;
  }
  get statementOfResidentsController() {
    return this._statementOfResidentsController;
  }
  get lastItemPaddingBottom(){
    return this._lastItemPaddingBottom
  }
  get bottomNavigation() {
    return this._bottomNavigation;
  }
  get navigationController() {
    return this._navigationController;
  }
  get appStateControllerModel() {
    return this._appStateControllerModel;
  }
  get authController() {
    return this._authController;
  }
  get confirmOssbController() {
    return this._confirmOssbController;
  }
  get osbbAdminController() {
    return this._osbbAdminController;
  }
  get drawerSwitch() {
    return this._drawerSwitch;
  }
  get preloader() {
    return this._preloader;
  }
  get permissions() {
    return this._permissions;
  }

  get choosePhotoModel() {
    return this._choosePhotoModel;
  }
  get information() {
    return this._information;
  }
  get noConnection() {
    return this._noConnection;
  }
  get extension() {
    return this._extension;
  }
  get userController() {
    return this._userController;
  }
  get chatController() {
    return this._chatController;
  }

  get defaultHeader() {
    return this._defaultHeader;
  }
  get updator() {
    return this._updator;
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
