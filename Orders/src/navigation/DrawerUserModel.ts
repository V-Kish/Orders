import {BaseModel} from '../Common/BaseModel';
import {Button} from '../Models/Components/Button';
import {
  BOTTOM_NAVIGATION_DEFAULT_ICON,
  DRAWER_ICONS,
  ICONS,
  INDICATOR_ICONS,
} from '../constants/icons';
import {navigator} from '../Core/Navigator';
import {ContactIconModel} from '../Models/Components/UserIconModels/ContactIconModel';
import {SwitchButtonModel} from '../Models/Components/SwitchButtonModel/SwitchButtonModel';
import {currentUser} from '../Core/CurrentUser';
import {controllers} from '../Controllers/Controllers';
import {CounterModel} from '../Models/CounterModel';
import {store} from '../Chat/provider/Store';
import {loadData, UserDataProvider} from '../DataProvider/UserDataProvider';
import {baseResponse} from '../DataTypes/BaseTypes';
import {osbbSettings} from '../DataTypes/osbbSettings';
import {DrawerUserName} from "./DrawerUserName";

type DrawerAdminTypes = {
  id: string;
  onDrawerBtnPress: () => void;
  counterModel: CounterModel;
};

class DrawerUserModel extends BaseModel {
  private _model: DrawerAdminTypes;
  private _switchButtonModel: SwitchButtonModel;
  private _drawerBtn: Button;
  private _calendar: Button;
  private _advertisement: Button;
  private _votingAndPolls: Button;
  private _accountsAndBalance: Button;
  private _chats: Button;
  private _question: Button;
  private _clock: Button;
  private _logoutBtn: Button;
  private _askAdminChat: Button;
  private _infoOsbb: Button;
  private _aboutOsbb: Button;
  private _userPhoto: ContactIconModel;
  private _textDescriptions: Array<any>;
  public _loading: boolean;
  private _onDrawerBtnPress: () => void;
  private _indicatorsBtn: Button;
  private _aboutProgram: Button;
  private _timerId: any;
  private _userName: DrawerUserName;

  constructor(_model: DrawerAdminTypes) {
    super(_model.id);
    this._model = _model;
    this.onValueChangeSwitch = this.onValueChangeSwitch.bind(this);
    this.onCalendarPress = this.onCalendarPress.bind(this);
    this.onAdvertisementPress = this.onAdvertisementPress.bind(this);
    this.onVotingAndPollsPress = this.onVotingAndPollsPress.bind(this);
    this.onAccountsAndBalancePress = this.onAccountsAndBalancePress.bind(this);
    this.onQuestionPress = this.onQuestionPress.bind(this);
    this.onAboutOsbbPress = this.onAboutOsbbPress.bind(this);
    this.onClockPress = this.onClockPress.bind(this);
    this.onChatsPress = this.onChatsPress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this.onChatsAdminPress = this.onChatsAdminPress.bind(this);
    this.onInformationPress = this.onInformationPress.bind(this);
    this.onAboutProgramBtnPress = this.onAboutProgramBtnPress.bind(this);
    this.isShowPhone = this.isShowPhone.bind(this);
    this.getIsPhoneVisible = this.getIsPhoneVisible.bind(this);
    this._timerId = null;
    this._onDrawerBtnPress = this._model.onDrawerBtnPress;
    this._textDescriptions = [
      'зробити телефон публічним',
      'зробити телефон приватним',
    ];
    this._switchButtonModel = new SwitchButtonModel({
      id: 'DrawerModel_SwitchButtonModel',
      // @ts-ignore
      textDescriptions: this._textDescriptions,
      onValueChangeSwitch: this.onValueChangeSwitch,
    });
    this._drawerBtn = new Button({
      id: 'drawerBtnHeader',
      style: 'drawerIconStyleHeader',
      onPress: this._onDrawerBtnPress,
      icon: ICONS.drawerIcon,
    });
    this._userPhoto = new ContactIconModel({
      // @ts-ignore
      photo: null,
      name: 'Vasya',
      id: this.id,
    });
    this._calendar = new Button({
      id: 'calendar',
      title: 'Події мого будинку',
      style: 'drawerButtonsStyles',
      onPress: this.onCalendarPress,
      icon: DRAWER_ICONS.calendar,
    });
    this._advertisement = new Button({
      id: 'advertisement',
      title: 'Новини',
      style: 'drawerButtonsStyles',
      onPress: this.onAdvertisementPress,
      icon: DRAWER_ICONS.advertisement,
    });
    this._votingAndPolls = new Button({
      id: 'votingAndPolls',
      title: 'Опитування',
      style: 'drawerButtonsStyles',
      onPress: this.onVotingAndPollsPress,
      icon: DRAWER_ICONS.votingAndPolls,
    });
    this._accountsAndBalance = new Button({
      id: '_accountsAndBalance',
      title: 'Рахунки та баланс',
      style: 'drawerButtonsStyles',
      onPress: this.onAccountsAndBalancePress,
      icon: DRAWER_ICONS.accountsAndBalance,
    });
    this._chats = new Button({
      id: '_chats',
      title: 'Мої сусіди. Чати та переписка',
      style: 'drawerButtonsStyles',
      onPress: this.onChatsPress,
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.mail,
      counterModel: _model.counterModel,
    });
    this._askAdminChat = new Button({
      id: '_chats',
      title: 'Питання керівництву',
      style: 'drawerButtonsStyles',
      onPress: this.onChatsAdminPress,
      icon: DRAWER_ICONS.FAQ,
    });
    this._aboutOsbb = new Button({
      id: 'aboutOsbb',
      title: 'Офіційна інформація ОСББ',
      style: 'drawerButtonsStyles',
      onPress: this.onAboutOsbbPress,
      icon: DRAWER_ICONS.about,
    });
    this._question = new Button({
      id: 'question',
      title: 'Питання керівництву',
      style: 'drawerButtonsStyles',
      onPress: this.onQuestionPress,
      icon: DRAWER_ICONS.FAQ,
    });
    this._clock = new Button({
      id: 'clock',
      title: 'Налаштування для входу',
      style: 'drawerButtonsStyles',
      onPress: this.onClockPress,
      icon: DRAWER_ICONS.clock,
    });
    this._infoOsbb = new Button({
      id: '_infoOsbb',
      title: 'Довідкова',
      style: 'drawerButtonsStyles',
      onPress: this.onInformationPress,
      icon: DRAWER_ICONS.about,
    });
    this._logoutBtn = new Button({
      id: 'logout',
      title: 'Повернутися до вибору ОСББ',
      style: 'drawerButtonsStyles',
      onPress: this.onLogoutPress,
      icon: ICONS.arrowLeftBlue,
    });
    this._indicatorsBtn = new Button({
      id: 'indicatorsBtns',
      title: 'Лічильники',
      style: 'drawerButtonsStyles',
      icon: INDICATOR_ICONS.indicator,
      onPress: this.onIndicatorBtnPress,
    });
    this._aboutProgram = new Button({
      id: 'aboutProgram',
      title: 'Про програму',
      style: 'drawerButtonsStyles',
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.home,
      onPress: this.onAboutProgramBtnPress,
    });
    this._userName = new DrawerUserName();
    this._loading = false;
  }
  get userName(){
    return this._userName
  }
  get indicatorsBtn() {
    return this._indicatorsBtn;
  }
  onIndicatorBtnPress() {
    navigator().navigate('MeterIdicatorsScreen');
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

  get calendar() {
    return this._calendar;
  }

  get advertisement() {
    return this._advertisement;
  }

  get votingAndPolls() {
    return this._votingAndPolls;
  }

  get accountsAndBalance() {
    return this._accountsAndBalance;
  }

  get chats() {
    return this._chats;
  }

  get question() {
    return this._question;
  }

  get clock() {
    return this._clock;
  }

  get logoutBtn() {
    return this._logoutBtn;
  }
  get aboutProgram() {
    return this._aboutProgram;
  }

  get askAdminChat() {
    return this._askAdminChat;
  }

  get switchButtonModel() {
    return this._switchButtonModel;
  }

  get aboutOsbb() {
    return this._aboutOsbb;
  }
  get infoOsbb() {
    return this._infoOsbb;
  }

  get debtors() {
    return controllers().drawerSwitch.chooseDrawer.drawerAdmin.debtors;
  }

  get drawerBtn() {
    return this._drawerBtn;
  }

  async onValueChangeSwitch() {
    this._switchButtonModel.stateSwitch = !this._switchButtonModel.stateSwitch;
    clearTimeout(this._timerId);
    this._timerId = setTimeout(async () => {
      await this.isShowPhone(this._switchButtonModel.stateSwitch);
    }, 500);
  }
  async isShowPhone(stateSwitch: boolean) {
    try {
      const response = await loadData<baseResponse<osbbSettings>>(
        UserDataProvider.addUserSettings,
        {
          phoneIsPublic: stateSwitch,
        },
      );
      if (response.statusCode !== 200) {
        this._switchButtonModel.stateSwitch = !this._switchButtonModel
          .stateSwitch;
      }
    } catch (ex) {
      this._switchButtonModel.stateSwitch = !this._switchButtonModel
        .stateSwitch;
      console.log('isShowPhone Drawer user ex', ex);
    }
  }
  async getIsPhoneVisible() {
    const response = await loadData<baseResponse<osbbSettings>>(UserDataProvider.getUserSettings);
    if (response.statusCode === 200) {
      if (response.data !== null && response.data !== undefined) {
        this._switchButtonModel.stateSwitch = response.data.phoneIsPublic;
      } else {
        this._switchButtonModel.stateSwitch = true;
      }
    }
  }
  async onCalendarPress() {
    controllers().bottomNavigation.selectedIndex = 2;
    navigator().navigate('UserEventsScreen');
    navigator().closeDrawer();
  }

  async onAdvertisementPress() {
    navigator().navigate('UserNewsScreen');
    controllers().bottomNavigation.selectedIndex = 3;
    navigator().closeDrawer();
    // this._advertisement.counterModel = 2;
  }

  async onVotingAndPollsPress() {
    controllers().bottomNavigation.selectedIndex = 3;
    navigator().navigate('UserVotesScreen');
    navigator().closeDrawer();
  }

  async onAccountsAndBalancePress() {
    controllers().bottomNavigation.selectedIndex = 1;
    navigator().navigate('UserBalanceScreen');
    navigator().closeDrawer();
  }

  async onChatsPress() {
    navigator().toChatStack();
    navigator().closeDrawer();
  }

  async onQuestionPress() {
    this._question.counterModel = 6;
  }

  async onAboutOsbbPress() {
    controllers().bottomNavigation.selectedIndex = 1; //?
    navigator().navigate('AboutOsbbScreen');
    navigator().closeDrawer();
  }
  async onInformationPress() {
    navigator().navigate('InformationOsbbScreen');
    navigator().closeDrawer();
  }

  async onClockPress() {
    this._clock.counterModel = 7;
  }

  async onLogoutPress() {
    navigator().closeDrawer();
    navigator().toConfirmOssbStack();
    navigator().closeDrawer();
  }

  async onChatsAdminPress() {
    navigator().navigate('StatementOfResidentsStack', {
      screen: 'StatementOfResidentsMainScreen',
      swipeEnabled: true,
    });
    controllers().drawerSwitch.modified = true;
    controllers().drawerSwitch.forceUpdate();
    // await controllers().preloader.show()
    // await navigator().toChatStack()
    // const adminContact = store().contactsItems.getOrAdd(controllers().userController.osbbLead.userId)
    // await store().contacts.createNewChat(adminContact.icon);
    // navigator().closeDrawer();
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

  get userAddress() {
    // console.log('USER_INFO', currentUser().userInfo)
    if (currentUser().userInfo !== null) {
      const detailInfo = currentUser().userInfo.detailInfo.find(
        (d) => d.osbbName == currentUser().currentOsbb?.name,
      );
      if (detailInfo) {
        return `вул. ${detailInfo.houseAddress}, буд. ${detailInfo.houseNumber}\r\nквартира ${detailInfo.apartmentNumber}`;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}

export {DrawerUserModel};
