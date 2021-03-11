import {BaseModel, MultiBase} from '../../../Common/BaseModel';
import {IconButton} from '../../Components/IconButton';
import {
  BOTTOM_NAVIGATION_ACTIVE_ICON,
  BOTTOM_NAVIGATION_DEFAULT_ICON,
  ICONS,
} from '../../../constants/icons';
import {navigator} from '../../../Core/Navigator';
import {controllers} from '../../../Controllers/Controllers';
import {currentUser} from '../../../Core/CurrentUser';
import {CounterModel} from '../../CounterModel';

type bottomNavigation = {
  id: string;
  chatsCounter: CounterModel;
};

class BottomNavigationModel extends MultiBase {
  private _model: bottomNavigation;
  //головний екран
  private readonly _btn1: IconButton;
  private readonly _btn1User: IconButton;
  //каледарь
  private readonly _btn2: IconButton;
  //
  private readonly _btn3: IconButton;
  // Повідомлення
  private readonly _btn4: IconButton;
  // Налаштування
  private readonly _btn5: IconButton;
  private _hidden: boolean;
  private _selectedIndex: number | undefined;

  constructor(model: bottomNavigation) {
    super(model.id);
    this._model = model;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onPressBtn1 = this.onPressBtn1.bind(this);
    this.onPressBtn2 = this.onPressBtn2.bind(this);
    this.onPressBtn3 = this.onPressBtn3.bind(this);
    this.onPressBtn4 = this.onPressBtn4.bind(this);
    this.onPressBtn5 = this.onPressBtn5.bind(this);
    this._btn1 = new IconButton({
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.coin,
      iconActive: BOTTOM_NAVIGATION_ACTIVE_ICON.coin,
      id: 'BottomNavigation1',
      style: 'navigationButton',
      onPress: this.onPressBtn1,
      activeOpacity: 1,
    });
    this._btn1User = new IconButton({
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.home,
      iconActive: BOTTOM_NAVIGATION_ACTIVE_ICON.home,
      id: 'BottomNavigation1User',
      style: 'navigationButton',
      onPress: this.onPressBtn1,
      activeOpacity: 1,
    });
    this._btn2 = new IconButton({
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.calendar,
      iconActive: BOTTOM_NAVIGATION_ACTIVE_ICON.calendar,
      id: 'BottomNavigation2',
      style: 'navigationButton',
      onPress: this.onPressBtn2,
      activeOpacity: 1,
    });
    this._btn3 = new IconButton({
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.points,
      iconActive: BOTTOM_NAVIGATION_ACTIVE_ICON.points,
      id: 'BottomNavigation3',
      style: 'navigationButtonCenterButton',
      onPress: this.onPressBtn3,
      activeOpacity: 1,
    });
    this._btn4 = new IconButton({
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.mail,
      iconActive: BOTTOM_NAVIGATION_ACTIVE_ICON.mail,
      id: 'BottomNavigation4',
      style: 'navigationButton',
      onPress: this.onPressBtn4,
      activeOpacity: 1,
      _counterModel: model.chatsCounter,
    });
    this._btn5 = new IconButton({
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.settings,
      iconActive: BOTTOM_NAVIGATION_ACTIVE_ICON.settings,
      id: 'BottomNavigation5',
      style: 'navigationButton',
      onPress: this.onPressBtn5,
      activeOpacity: 1,
    });
    this._hidden = false;
    this.selectedIndex = 1;
  }
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    this._selectedIndex = value;
    switch (value) {
      case 1:
        this._btn1.isActive = true;
        this._btn1User.isActive = true;
        this._btn2.isActive = false;
        this._btn3.isActive = false;
        this._btn4.isActive = false;
        this._btn5.isActive = false;
        break;
      case 2:
        this._btn1.isActive = false;
        this._btn1User.isActive = false;
        this._btn2.isActive = true;
        this._btn3.isActive = false;
        this._btn4.isActive = false;
        this._btn5.isActive = false;
        break;
      case 3:
        this._btn1.isActive = false;
        this._btn1User.isActive = false;
        this._btn2.isActive = false;
        this._btn3.isActive = true;
        this._btn4.isActive = false;
        this._btn5.isActive = false;
        break;
      case 4:
        this._btn1.isActive = false;
        this._btn1User.isActive = false;
        this._btn2.isActive = false;
        this._btn3.isActive = false;
        this._btn4.isActive = true;
        this._btn5.isActive = false;
        break;
      case 5:
        this._btn1.isActive = false;
        this._btn1User.isActive = false;
        this._btn2.isActive = false;
        this._btn3.isActive = false;
        this._btn4.isActive = false;
        this._btn5.isActive = true;
        break;
    }
  }
  get btn2(): IconButton {
    return this._btn2;
  }

  get btn1(): IconButton {
    return this._btn1;
  }
  get btn1User(): IconButton {
    return this._btn1User;
  }

  get btn3(): IconButton {
    return this._btn3;
  }

  get btn4(): IconButton {
    return this._btn4;
  }
  get btn5(): IconButton {
    return this._btn5;
  }

  get hidden(): boolean {
    return this._hidden;
  }

  set hidden(value: boolean) {
    this._hidden = value;
  }
  show() {
    this.hidden = false;
    this.modified = true;
    this.forceUpdate();
  }
  hide() {
    this.hidden = true;
    this.modified = true;
    this.forceUpdate();
  }
  hide2(calback) {
    this.hidden = true;
    this.modified = true;
    this.forceUpdate();
    calback()
  }

  async onPressBtn1() {
    this.selectedIndex = 1;
    this.modified = true;
    if (currentUser().isAdminOsbb) {
      // await navigator().toMainStack()
      navigator().navigate('OsbbControllScreen');
    } else {
      // await navigator().toMainStack()
      navigator().navigate('UserBalanceScreen');
    }
    // await navigator().toMainStack();
    // await controllers().userController.userHome.loadClearLineList()
    // navigator().navigate('HomeScreen')
  }
  async onPressBtn2() {
    this.selectedIndex = 2;
    this.modified = true;
    if (currentUser().isAdminOsbb) {
      // await navigator().toOsbbAdminStack();
      navigator().navigate('EventsScreen');
    } else {
      // await navigator().toMainStack();
      navigator().navigate('UserEventsScreen');
    }
  }
  async onPressBtn3() {
    this.selectedIndex = 3;
    this.modified = true;
    if (currentUser().isAdminOsbb) {
      // await navigator().toOsbbAdminStack()
      navigator().navigate('AdminScreen');
    } else {
      // await navigator().toMainStack()
      navigator().navigate('HomeScreen');
    }
  }

  onPressBtn4() {
    this.selectedIndex = 4;
    this.modified = true;
    // navigator().navigate('ChatListScreen')
    navigator().toChatStack();
  }
  onPressBtn5() {
    // alert("PressBtn5")
    if (currentUser().isAdminOsbb) {
      navigator().navigate('SettingsScreen');
    } else {
      navigator().navigate('UserSettingsScreen');
    }
    // this.selectedIndex = 5;
    // this.selectedIndex = 5;
    // if (currentUser().isAdminOsbb) {
    //   navigator().navigate('AdminMeterIndicatorsScreen');
    // } else {
    //   navigator().navigate('MeterIdicatorsScreen');
    // }
    // this.modified = true;
    // navigator().navigate('StatementOfResidentsStack',{
    //   screen:'StatementOfResidentsMainScreen',
    //   swipeEnabled:true
    // });
    // controllers().drawerSwitch.modified = true;
    // controllers().drawerSwitch.forceUpdate();
    // return
  }
}
export {BottomNavigationModel};
