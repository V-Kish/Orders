import {BaseModel} from '../Common/BaseModel';
import {Keyboard} from 'react-native';
import {navigator} from '../Core/Navigator';
import {DrawerAdminModel} from './DrawerAdminModel';
import {DrawerUserModel} from './DrawerUserModel';
import { CounterModel } from '../Model/CounterModel';
import { ContactIconModel } from '../Model/Components/UserIconModels/ContactIconModel';

type chooseDrawerModel = {
  id: string;
  counterModel: CounterModel;
}
class ChooseDrawerModel extends BaseModel {
  private _isDrawerAdmin: boolean;
  private readonly _drawerAdmin: DrawerAdminModel;
  private readonly _drawerUser: DrawerUserModel;

  private _isShowContent: boolean;
  constructor(model: chooseDrawerModel) {
    super(model.id);
    this.selectDrawerAdmin = this.selectDrawerAdmin.bind(this);
    this.selectDrawerUser = this.selectDrawerUser.bind(this);
    this.onDrawerBtnPress = this.onDrawerBtnPress.bind(this);
    this._isDrawerAdmin = false;
    this._isShowContent = true;
    this._drawerAdmin = new DrawerAdminModel({
      id: 'DrawerAdminModel',
      onDrawerBtnPress: this.onDrawerBtnPress,
      counterModel: model.counterModel,
    });
    this._drawerUser = new DrawerUserModel({
      id: 'DrawerUserModel',
      onDrawerBtnPress: this.onDrawerBtnPress,
      counterModel: model.counterModel,
    });

  }
  // settings drawer
  get isDrawerAdmin() {
    return this._isDrawerAdmin;
  }
  // change drawer container view
  set isDrawerAdmin(value: boolean) {
    if (this._isDrawerAdmin === value) {
      return;
    }
    this._isDrawerAdmin = value;
    this.modified = true;
    this.forceUpdate();
  }
  selectDrawerAdmin() {
    this.isDrawerAdmin = true;
    this._drawerAdmin.userPhoto = new ContactIconModel({
      id: 'newContactIconModel',
      name: 'Не задано',
      photo: null,
    });
    this._drawerAdmin.modified = true;
    this._drawerAdmin.forceUpdate();
  }
  selectDrawerUser() {
    this.isDrawerAdmin = false;
    this._drawerUser.userPhoto = new ContactIconModel({
      id: 'newContactIconModel',
      name: 'Не задано',
      photo: null,
    });
    this._drawerUser.modified = true;
    this._drawerUser.forceUpdate();
  }
  // open Drawer
  onDrawerBtnPress() {
    Keyboard.dismiss();
    setTimeout(() => {
      navigator().toggleDrawer();
    }, 0);
  }

  get drawerAdmin() {
    return this._drawerAdmin;
  }
  get drawerUser() {
    return this._drawerUser;
  }

  get isShowContent() {
    return this._isShowContent;
  }

  set isShowContent(value: boolean) {
    this._isShowContent = value;
  }
}

export {ChooseDrawerModel};
