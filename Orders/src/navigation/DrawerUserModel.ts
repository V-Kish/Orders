import {BaseModel} from '../Common/BaseModel';
import {navigator} from '../Core/Navigator';
import {DrawerUserName} from './DrawerUserName';
import {CounterModel} from '../Model/CounterModel';
import {ContactIconModel} from '../Model/Components/UserIconModels/ContactIconModel';
import {Button} from '../Model/Components/Button';
import {ICONS} from '../constants/icons';

type DrawerAdminTypes = {
  id: string;
  onDrawerBtnPress: () => void;
  counterModel: CounterModel;
};

class DrawerUserModel extends BaseModel {
  private _model: DrawerAdminTypes;
  private _logoutBtn: Button;
  private _drawerBtn: Button;
  private _userPhoto: ContactIconModel;
  public _loading: boolean;
  private _onDrawerBtnPress: () => void;
  private _userName: DrawerUserName;

  constructor(_model: DrawerAdminTypes) {
    super(_model.id);
    this._model = _model;
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this.onAboutProgramBtnPress = this.onAboutProgramBtnPress.bind(this);
    this._onDrawerBtnPress = this._model.onDrawerBtnPress;
    this._drawerBtn = new Button({
      id: 'drawerBtnHeader',
      style: 'drawerIconStyleHeader',
      onPress: this._onDrawerBtnPress,
      icon: ICONS.close,
    });
    this._userPhoto = new ContactIconModel({
      // @ts-ignore
      photo: null,
      name: 'Vasya',
      id: this.id,
    });

    this._logoutBtn = new Button({
      id: 'logout',
      title: 'Повернутися до вибору ОСББ',
      style: 'drawerButtonsStyles',
      onPress: this.onLogoutPress,
      icon: ICONS.errorScreenLogo,
    });

    this._userName = new DrawerUserName();
    this._loading = false;
  }
  get userName() {
    return this._userName;
  }

  onAboutProgramBtnPress() {
    navigator().navigate('AboutProgramOSBB');
    navigator().closeDrawer();
  }

  get userPhoto() {
    return this._userPhoto;
  }

  set userPhoto(val) {
    this._userPhoto = val;
  }

  get logoutBtn() {
    return this._logoutBtn;
  }

  get drawerBtn() {
    return this._drawerBtn;
  }

  async onLogoutPress() {
    navigator().closeDrawer();
  }
  // Photo user
  get loading() {
    return this._loading;
  }
  set loading(value) {
    this._loading = value;
    this.modified = true;
    this.forceUpdate();
  }
}

export {DrawerUserModel};
