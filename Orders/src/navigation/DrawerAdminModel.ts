import {BaseModel} from '../Common/BaseModel';
import {Button} from '../Models/Components/Button';
import {
  BOTTOM_NAVIGATION_DEFAULT_ICON,
  DRAWER_ICONS,
  ICONS, INDICATOR_ICONS,
} from '../constants/icons';
import {ContactIconModel} from '../Models/Components/UserIconModels/ContactIconModel';
import {navigator} from '../Core/Navigator';
import {ImagePickerModel} from '../Models/SelectedPhoto/ImagePickerModel';
import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {SelectedPhotoModel} from '../Models/SelectedPhoto/SelectedPhotoModel';
import {controllers} from '../Controllers/Controllers';
import {CounterModel} from '../Models/CounterModel';

type DrawerUserTypes = {
  id: string;
  onDrawerBtnPress: () => void;
  counterModel: CounterModel;
};

class DrawerAdminModel extends BaseModel {
  private _drawerBtn: Button;
  private _model: DrawerUserTypes;
  private _userPhoto: ContactIconModel;
  private _calendar: Button;
  private _advertisement: Button;
  private _votingAndPolls: Button;
  private _accountsAndBalance: Button;
  private _chats: Button;
  private _question: Button;
  private _declaration: Button;
  private _debtors: Button;
  private _clock: Button;
  private _infoOsbb: Button;
  private _logoutBtn: Button;
  public _loading: boolean;
  private _onDrawerBtnPress: () => void;
  private _aboutProgram: Button;

  constructor(_model: DrawerUserTypes) {
    super(_model.id);
    this._model = _model;
    this.onCalendarPress = this.onCalendarPress.bind(this);
    this.onAdvertisementPress = this.onAdvertisementPress.bind(this);
    this.onVotingAndPollsPress = this.onVotingAndPollsPress.bind(this);
    this.onAccountsAndBalancePress = this.onAccountsAndBalancePress.bind(this);
    this.onQuestionPress = this.onQuestionPress.bind(this);
    this.onClockPress = this.onClockPress.bind(this);
    this.onChatsPress = this.onChatsPress.bind(this);
    this.onDeclarationPress = this.onDeclarationPress.bind(this);
    this.onDebtorsPress = this.onDebtorsPress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this.onInformationPress = this.onInformationPress.bind(this);
    this.onAboutProgramBtnPress = this.onAboutProgramBtnPress.bind(this);
    this._onDrawerBtnPress = this._model.onDrawerBtnPress;
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
      title: 'Події',
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
      icon: DRAWER_ICONS.FAQ,
    });
    this._accountsAndBalance = new Button({
      id: '_accountsAndBalance',
      title: 'Баланс ОСББ',
      style: 'drawerButtonsStyles',
      onPress: this.onAccountsAndBalancePress,
      icon: DRAWER_ICONS.accountsAndBalance,
    });
    this._chats = new Button({
      id: '_chats',
      title: 'Повідомлення від мешканців',
      style: 'drawerButtonsStyles',
      onPress: this.onChatsPress,
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.mail,
      counterModel: _model.counterModel,
    });
    this._question = new Button({
      id: 'question',
      title: 'Питання керівництву',
      style: 'drawerButtonsStyles',
      onPress: this.onQuestionPress,
      icon: DRAWER_ICONS.FAQ,
    });
    this._declaration = new Button({
      id: 'declaration',
      title: 'Оголошення',
      style: 'drawerButtonsStyles',
      onPress: this.onDeclarationPress,
      icon: DRAWER_ICONS.FAQ,
    });
    this._debtors = new Button({
      id: 'debtors',
      title: 'Боржники',
      style: 'drawerButtonsStyles',
      onPress: this.onDebtorsPress,
      icon: DRAWER_ICONS.money, //need
    });
    this._clock = new Button({
      id: 'clock',
      title: 'Налаштування',
      style: 'drawerButtonsStyles',
      onPress: this.onClockPress,
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.settings,
    });
    this._infoOsbb = new Button({
      id: '_infoOsbb',
      title: 'Довідкова',
      style: 'drawerButtonsStyles',
      onPress: this.onInformationPress,
      icon: DRAWER_ICONS.clock,
    });
    this._logoutBtn = new Button({
      id: 'logout',
      title: 'Повернутися до вибору ОСББ',
      style: 'drawerButtonsStyles',
      onPress: this.onLogoutPress,
      icon: ICONS.arrowLeftBlue,
    });
    this._aboutProgram = new Button({
      id: 'aboutProgramAdmin',
      title: 'Про програму',
      style: 'drawerButtonsStyles',
      icon: BOTTOM_NAVIGATION_DEFAULT_ICON.home,
      onPress: this.onAboutProgramBtnPress,
    });
    this._loading = false;
  }

  get drawerBtn() {
    return this._drawerBtn;
  }
  get aboutProgram() {
    return this._aboutProgram;
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
  onAboutProgramBtnPress(){
    navigator().navigate('AboutProgramOSBB');
    navigator().closeDrawer();
  }
  async onAdvertisementPress() {
    navigator().navigate('NewsScreen');
    navigator().closeDrawer();
    // this._advertisement.counterModel = 2;
  }

  async onVotingAndPollsPress() {
    navigator().navigate('VotesScreen');
    navigator().closeDrawer();
    // this._votingAndPolls.counterModel = 3;
  }

  async onAccountsAndBalancePress() {
    navigator().navigate('BillAccountScreen');
    navigator().closeDrawer();
    // this._accountsAndBalance.counterModel = 4;
  }

  async onChatsPress() {
    navigator().toChatStack();
    navigator().closeDrawer();
  }

  async onDeclarationPress() {
    alert('В розробці');
  }

  async onDebtorsPress() {
    navigator().navigate('DebtorsScreen');
    navigator().closeDrawer();
  }

  async onQuestionPress() {
    this._question.counterModel = 6;
  }

  async onClockPress() {
    navigator().navigate('SettingsScreen')
  }

  async onLogoutPress() {
    navigator().closeDrawer();
    navigator().toConfirmOssbStack();
    navigator().closeDrawer();
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

  get declaration() {
    return this._declaration;
  }

  get debtors() {
    return this._debtors;
  }

  get accountsAndBalance() {
    return this._accountsAndBalance;
  }

  get chats() {
    return this._chats;
  }
  get infoOsbb() {
    return this._infoOsbb;
  }
  async onInformationPress() {
    navigator().navigate('InformationOsbbScreen');
    navigator().closeDrawer();
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
