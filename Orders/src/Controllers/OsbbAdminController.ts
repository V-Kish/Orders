import {OsbbAdmin} from '../Models/OsbbAdminStack/OsbbAdmin/OsbbAdmin';
import {RegisterHomeModal} from '../Models/OsbbAdminStack/Modals/RegisterHomeModal';
import {RegisterApartmentModal} from '../Models/OsbbAdminStack/Modals/RegisterApartmentModal';
import {RegisterLiverModal} from '../Models/OsbbAdminStack/Modals/RegisterLiverModal';
import {OsbbControllModel} from '../Models/OsbbAdminStack/OsbbConrtollModel/OsbbControllModel';
import {AdminScreenModel} from '../Models/OsbbAdminStack/Modals/AdminScreenModel';
import {TariffsModel} from '../Models/Tariffs/TariffsModel';
import {VotesModel} from '../Models/OsbbAdminStack/Votes/VotesModel';
import {NewsModel} from '../Models/OsbbAdminStack/News/NewsModel';
import {MessagesModel} from '../Models/OsbbAdminStack/Messages/MessagesModel';
import {EventsModel} from '../Models/OsbbAdminStack/Events/EventsModel';
import {BillAccountModel} from '../Models/OsbbAdminStack/BillAccount/BillAccountModel';
import {HeaderWithDrawerAndSearchModel} from '../Models/OsbbAdminStack/Modals/HeaderWithDrawerAndSearchModel';
import {AdminBalanceModel} from '../Models/OsbbAdminStack/Balances/AdminBalanceModel';
import {ApartmentBalances} from '../Models/OsbbAdminStack/Balances/ApartmentBalances';
import {ApartmentDetailBalanceModel} from '../Models/OsbbAdminStack/Balances/ApartmentDetailBalanceModel';
import {ApartmentPayments} from '../Models/OsbbAdminStack/Balances/ApartmentPayments';
import {AdminPaymentsModel} from '../Models/OsbbAdminStack/Balances/AdminPaymentsModel';
import {PlanedPaymentsModel} from '../Models/PlanedPayments/PlanedPayments';
import {JoinStatementModel} from '../Models/JoinStatementModel/JoinStatementModel';
import {JoinStatementDetailModel} from '../Models/JoinStatementModel/JoinStatementDetailModel';
import {AdminMeterIndicatorsScreen} from '../Screens/AdminMeterIndicatorsScreen';
import {AdminMeterIndicator} from '../Models/BothStacks/MeterIndicators/AdminMeterIndicator';
import {SettingsModel} from '../Models/SettingsModel/SettingsModel';
import {DebtorsModel} from '../Models/DebtorsModel/DebtorsModel';

class OsbbAdminController {
  private _osbbAdmin: OsbbAdmin;
  private _registerHome: RegisterHomeModal;
  private _registerApartment: RegisterApartmentModal;
  private _registerLiver: RegisterLiverModal;
  private _osbbControllScreen: OsbbControllModel;
  private _adminControllScreenModel: AdminScreenModel;
  private _tariffsModel: TariffsModel;
  private _votesModel: VotesModel;
  private _newsModel: NewsModel;
  private _messagesModel: MessagesModel;
  private _events: EventsModel;
  private _billAccount: BillAccountModel;
  private _adminBalanceModel: AdminBalanceModel;
  private _apartmentBalances: ApartmentBalances;
  private _headerWithDrawerAndSearch: HeaderWithDrawerAndSearchModel;
  private _apartmentDetailBalance: ApartmentDetailBalanceModel;
  private _adminPayments: AdminPaymentsModel;
  private _apartmentPayments: ApartmentPayments;
  private _adminPlanedPayments: PlanedPaymentsModel;
  private _joinStatementModel: JoinStatementModel;
  private _joinStatementDetailModel: JoinStatementDetailModel;
  private _settings: SettingsModel;
  private _debtors: DebtorsModel;

  private _meterIndicators: AdminMeterIndicator;
  constructor() {
    this._osbbAdmin = new OsbbAdmin('osbbAdmin');
    this._registerHome = new RegisterHomeModal('registerHome');
    this._registerApartment = new RegisterApartmentModal('registerApartment');
    this._registerLiver = new RegisterLiverModal('registerLiver');
    this._osbbControllScreen = new OsbbControllModel('OsbbControllModel');
    this._adminControllScreenModel = new AdminScreenModel({
      id: 'AdminScreenModel',
    });
    this._tariffsModel = new TariffsModel('TariffsModel');
    this._votesModel = new VotesModel('votesModel');
    this._newsModel = new NewsModel('newsModel');
    this._messagesModel = new MessagesModel('messagesModel');
    this._events = new EventsModel('eventsModel');
    this._billAccount = new BillAccountModel('billAccount');
    this._adminBalanceModel = new AdminBalanceModel('adminBalance');
    this._apartmentBalances = new ApartmentBalances('apartmentBalances');
    this._apartmentDetailBalance = new ApartmentDetailBalanceModel(
      'apartmentBalancesDetail',
    );
    this._apartmentPayments = new ApartmentPayments('apartmentPayments');
    this._adminPayments = new AdminPaymentsModel('_adminPayments');
    this._headerWithDrawerAndSearch = new HeaderWithDrawerAndSearchModel({
      id: 'HeaderAdminModel',
      onChangeText: () => {},
      showSearchForm: true,
      // showDrawerBtn: true
    });
    this._adminPlanedPayments = new PlanedPaymentsModel({
      id: 'adminPlanedPayments',
      isAdmin: true,
    });
    this._joinStatementModel = new JoinStatementModel({
      id: 'JoinStatementModel',
    });
    this._joinStatementDetailModel = new JoinStatementDetailModel({
      id: 'JoinStatementDetailModel',
    });
    this._settings = new SettingsModel({
      id: 'SettingsModel',
    });
    this._debtors = new DebtorsModel({
      id: 'DebtorsModel',
    });
    this._meterIndicators = new AdminMeterIndicator('AdminMeterIndicator');
  }

  get osbbAdmin() {
    return this._osbbAdmin;
  }
  get osbbControllScreen() {
    return this._osbbControllScreen;
  }

  get adminControllScreenModel() {
    return this._adminControllScreenModel;
  }

  get joinStatementModel() {
    return this._joinStatementModel;
  }

  get joinStatementDetailModel() {
    return this._joinStatementDetailModel;
  }

  get registerHome() {
    return this._registerHome;
  }

  get registerApartment() {
    return this._registerApartment;
  }

  get registerLiver() {
    return this._registerLiver;
  }

  get tariffsModel() {
    return this._tariffsModel;
  }

  get votesModel() {
    return this._votesModel;
  }

  get newsModel() {
    return this._newsModel;
  }

  get messagesModel() {
    return this._messagesModel;
  }

  get events() {
    return this._events;
  }

  get billAccount() {
    return this._billAccount;
  }

  get adminBalance() {
    return this._adminBalanceModel;
  }

  get apartmentBalances() {
    return this._apartmentBalances;
  }

  get apartmentDetailBalance() {
    return this._apartmentDetailBalance;
  }

  get apartmentPayments() {
    return this._apartmentPayments;
  }

  get adminPayments() {
    return this._adminPayments;
  }

  get headerWithDrawerAndSearch() {
    return this._headerWithDrawerAndSearch;
  }

  get adminPlandedPayments() {
    return this._adminPlanedPayments;
  }

  get settings() {
    return this._settings;
  }

  get debtors() {
    return this._debtors;
  }

  get meterIndicators() {
    return this._meterIndicators;
  }
}

export {OsbbAdminController};
