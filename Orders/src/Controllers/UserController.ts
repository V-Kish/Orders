import {TimeLineDetailModel} from '../Models/MainStack/DetailModel/TimeLineDetailModel';
import {HomeModel} from '../Models/MainStack/HomeModel';
import {PaymentDetailModel} from '../Models/MainStack/PaymentDetailModel/PaymentDetailModel';
import {PaymentsModel} from '../Models/MainStack/PaymentsModel/PaymentsModel';
import {UserBalanceModel} from '../Models/MainStack/UserBalanceModel/UserBalanceModel';
import {UserEventsModel} from '../Models/MainStack/UserEventsModel/UserEventsModel';
import {UserNewsModel} from '../Models/MainStack/UserNewsModel/UserNewsModel';
import {UserVotesModel} from '../Models/MainStack/UserVotesModel/UserVotesModel';
import {HeaderWithDrawerAndSearchModel} from '../Models/OsbbAdminStack/Modals/HeaderWithDrawerAndSearchModel';
import {PlanedPaymentsModel} from '../Models/PlanedPayments/PlanedPayments';
import {AboutOsbbModel} from '../Models/MainStack/AboutOsbbModel/AboutOsbbModel';
import {MeterIndicators} from '../Models/BothStacks/MeterIndicators/MeterIndicators';
import {OsbbDocumentsModel} from '../Models/MainStack/OsbbDocumentsModel/OsbbDocumentsModel';
import {ContactsOsbbModel} from '../Models/MainStack/ContactsOsbbModel/ContactsOsbbModel';
import {InformationOsbbModel} from '../Models/BothStacks/InformationOsbbModel/InformationOsbbModel';
import {UserSettingsModel} from "../Models/SettingsModel/UserSettingsModel";

class UserController {
  private _userHome: HomeModel;
  private _aboutOsbb: AboutOsbbModel;
  private _contactsOsbbModel: ContactsOsbbModel;
  private _osbbDocuments: OsbbDocumentsModel;
  private _informationOsbb: InformationOsbbModel;
  private _timeLineDetail: TimeLineDetailModel;
  private _userEventsModel: UserEventsModel;
  private _userNewsModel: UserNewsModel;
  private _userVotesModel: UserVotesModel;
  private _payments: PaymentsModel;
  private _paymentDetail: PaymentDetailModel;
  private _userBalance: UserBalanceModel;
  private _headerWithDrawerAndSearch: HeaderWithDrawerAndSearchModel;
  private _osbbLead: any;
  private _planedPaymentsModel: PlanedPaymentsModel;
  private _meterIndicators: MeterIndicators;
  private _settings: UserSettingsModel;
  // private _addIndicators: AddIndicator;

  // private _periodCalendar: CalendarModel;
  constructor() {
    this._userHome = new HomeModel('HomeModel');
    this._aboutOsbb = new AboutOsbbModel('AboutOsbb');
    this._informationOsbb = new InformationOsbbModel('InformationOsbb');
    this._contactsOsbbModel = new ContactsOsbbModel('ContactsOsbbModel');
    this._timeLineDetail = new TimeLineDetailModel('TimeLineModel');
    this._userEventsModel = new UserEventsModel({id: 'UserEventsModel'});
    this._userNewsModel = new UserNewsModel('UserNewsModel');
    this._userVotesModel = new UserVotesModel('UserVotesModel');
    this._payments = new PaymentsModel('payments');
    this._paymentDetail = new PaymentDetailModel('paymentDetail');
    this._userBalance = new UserBalanceModel('userBalance');
    this._osbbLead = null;
    this._headerWithDrawerAndSearch = new HeaderWithDrawerAndSearchModel({
      id: 'headerWithButtonsModel',
      onChangeText: () => {},
      showSearchForm: true,
    });
    this._planedPaymentsModel = new PlanedPaymentsModel({
      id: 'planedPayments',
      isAdmin: false,
    });
    this._meterIndicators = new MeterIndicators('_meterIndicators');
    this._osbbDocuments = new OsbbDocumentsModel({id: 'osbbDocuments'});
    this._settings = new UserSettingsModel({id: 'userSettings'});
  }

  get settings(){
    return this._settings
  }

  get userHome() {
    return this._userHome;
  }

  get aboutOsbb() {
    return this._aboutOsbb;
  }

  get contactsOsbbModel() {
    return this._contactsOsbbModel;
  }

  get osbbDocuments() {
    return this._osbbDocuments;
  }

  get osbbLead() {
    return this._osbbLead;
  }

  set osbbLead(value) {
    this._osbbLead = value;
  }

  get timeLineDetail() {
    return this._timeLineDetail;
  }

  get userEventsModel() {
    return this._userEventsModel;
  }

  get userNewsModel() {
    return this._userNewsModel;
  }

  get userVotesModel() {
    return this._userVotesModel;
  }

  get payments() {
    return this._payments;
  }

  get paymentDetail() {
    return this._paymentDetail;
  }

  get userBalance() {
    return this._userBalance;
  }

  get headerWithDrawerAndSearch() {
    return this._headerWithDrawerAndSearch;
  }

  get planedPayments() {
    return this._planedPaymentsModel;
  }

  get meterIndicators() {
    return this._meterIndicators;
  }

  get informationOsbb() {
    return this._informationOsbb;
  }

  // get periodCalendar(){
  //   return this._periodCalendar
  // }
}

export {UserController};
