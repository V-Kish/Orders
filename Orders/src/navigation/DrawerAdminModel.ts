import {BaseModel} from '../Common/BaseModel';

import {navigator} from '../Core/Navigator';
import { CounterModel } from '../Model/CounterModel';
import { Button } from '../Model/Components/Button';
import { ContactIconModel } from '../Model/Components/UserIconModels/ContactIconModel';
import { ICONS } from '../constants/icons';


type DrawerUserTypes = {
  id: string;
  onDrawerBtnPress: () => void;
  counterModel: CounterModel;
};

class DrawerAdminModel extends BaseModel {
  private _drawerBtn: Button;
  private _model: DrawerUserTypes;
  private _userPhoto: ContactIconModel;
  private _logoutBtn: Button;
  public _loading: boolean;
  private _onDrawerBtnPress: () => void;


  constructor(_model: DrawerUserTypes) {
    super(_model.id);
    this._model = _model;
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this._onDrawerBtnPress = this._model.onDrawerBtnPress;
    this._drawerBtn = new Button({
      id: 'drawerBtnHeader',
      style: 'drawerIconStyleHeader',
      onPress: this._onDrawerBtnPress,
      icon: ICONS.done,
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
      icon: ICONS.close,
    });
    this._loading = false;
  }

  get drawerBtn() {
    return this._drawerBtn;
  }
  get userPhoto() {
    return this._userPhoto;
  }

  set userPhoto(val) {
    this._userPhoto = val;
  }

  async onCalendarPress() {
    navigator().navigate('MessagesScreen');
    navigator().closeDrawer();
    // this._calendar.counterModel = 1;
  }

  async onAdvertisementPress() {
    navigator().navigate('NewsScreen');
    navigator().closeDrawer();
    // this._advertisement.counterModel = 2;
  }


  async onAccountsAndBalancePress() {
    navigator().navigate('BillAccountScreen');
    navigator().closeDrawer();
    // this._accountsAndBalance.counterModel = 4;
  }

  async onChatsPress() {
    navigator().closeDrawer();
  }

  async onClockPress() {
    navigator().navigate('SettingsScreen')
  }

  async onLogoutPress() {
    navigator().closeDrawer();

    navigator().closeDrawer();
  }


  async onInformationPress() {
    navigator().navigate('InformationOsbbScreen');
    navigator().closeDrawer();
  }

  get logoutBtn() {
    return this._logoutBtn;
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

export {DrawerAdminModel};
