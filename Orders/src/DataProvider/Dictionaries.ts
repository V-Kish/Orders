import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';
import {Departments, DictionariesLoadStatusType} from '../Types';
import {AppLog} from '../Common/AppLog';
import {
  ListDepartments,
  listCurrencies,
  loadDepartmentsGroups,
  loadOperationTypes,
  loadOrdersStatus,
  getOrders,
} from '../store/actions/Dictionaries';
import {MethodsRequest} from './MethodsRequest';
import {PreloaderMain, settingsAppAction} from "../store/actions/AppStart";

class Dictionaries {
  private _onDictionariesLoad: () => void;
  private static _loadStatus: DictionariesLoadStatusType;
  private _departmentsStatus: boolean;
  private _listCurrenciesStatus: boolean;
  private _typesOperationStatus: boolean;
  private _ordersStatusesStatus: boolean;
  private _listDepartmentsStatus: boolean;
  private _getOrdersStatus: boolean;
  private _loadSettingsStatus: boolean;
  private _loadCounters: boolean;
  constructor() {
    this._onDictionariesLoad = null;
    this._listDepartmentsStatus = false;
    this._listCurrenciesStatus = false;
    this._departmentsStatus = false;
    this._typesOperationStatus = false;
    this._ordersStatusesStatus = false;
    this._getOrdersStatus = false;
    this._loadSettingsStatus = false;
    this._loadCounters = false;
  }
  static InitDictionaries(onDictionariesLoad: () => void, dispatch) {
    if (typeof onDictionariesLoad === 'function') {
      this._onDictionariesLoad = onDictionariesLoad;
    }
    this._getOrders(dispatch).then();
    this._loadDepartments(dispatch).then();
    this._loadCurrencies(dispatch).then();
    this._loadDepartmentsGroups(dispatch).then();
    this._loadTypesOperation(dispatch).then();
    this._LoadOrdersStatus(dispatch).then();
    this._loadSettings(dispatch).then();
  }

  // Валюти
  static async listCurrencies() {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/dictionary/dic_currencies`,
      'GET',
    );
  }
  // Типи операцій в системі
  static async operationTypes() {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/dictionary/dic_operationTypes`,
      'GET',
    );
  }
  // Групи відділень для програми лояльності
  static async departmentsGroups() {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/dictionary/dic_loyaltyProg_DepartmentsGroups`,
      'GET',
    );
  }
  // Статуси заявок
  static async ordersStatus() {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/dictionary/dic_loyaltyProg_ordersStatus`,
      'GET',
    );
  }
  // Налаштування
  static async settingsApp(body) {
    return fetchData(
      `rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/dictionary/dic_settings/get`,
      'POST',
      body,
    );
  }
  // Список відділень
  static async loadDepartments(body: Departments = {rootType: 0, sQuery: ''}) {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/departments/load`,
      'POST',
      body,
    );
  }
  //

  static async getCounters() {
    return fetchData(
        `/rest/v1/${currentUser().userId}/${
            currentUser().userToken
        }/departments/load`,
        'POST',
    );
  }
  //

  // Статус загрузки словників
  //якщо === true всі словники завантажені
  private static isLoaded() {
    if (
      this._listCurrenciesStatus &&
      this._getOrdersStatus &&
      this._listDepartmentsStatus &&
      this._departmentsStatus &&
      this._loadSettingsStatus &&
      this._typesOperationStatus &&
      this._ordersStatusesStatus
    ) {
      return true;
    }
    return false;
  }

  private static onComplete() {
    if (this.isLoaded()) {
      this._onDictionariesLoad();
    }
  }

  // Заповнили список валют
  static async _loadDepartments(dispatch) {
    this._listDepartmentsStatus = false;
    try {
      const response = await Dictionaries.loadDepartments();
      if (response.statusCode !== 200) {
        await currentUser().logout();
        dispatch(PreloaderMain(false));
        return;
      }
      dispatch(ListDepartments(response.data));
      this._listDepartmentsStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadDepartments', ex);
      await currentUser().logout();
      dispatch(PreloaderMain(false));
    }
  }
  // Заповнили список валют
  static async _loadCurrencies(dispatch) {
    this._listCurrenciesStatus = false;
    try {
      const response = await Dictionaries.listCurrencies();
      if (response.statusCode !== 200) {
        await currentUser().logout();
        dispatch(PreloaderMain(false));
        return;
      }
      dispatch(listCurrencies(response.data));
      this._listCurrenciesStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadCurrencies', ex);
      await currentUser().logout();
      dispatch(PreloaderMain(false));
    }
  }
  static async _loadSettings(dispatch) {
    this._loadSettingsStatus = false;
    try {
      const body = {
        names: ['OrderWaitLifeMinTime', 'OrderWaitLifeMaxTime'],
      };
      const response = await Dictionaries.settingsApp(body);
      console.log('settings response',response)
      if (response.statusCode !== 200) {
        await currentUser().logout();
        dispatch(PreloaderMain(false));
        return;
      }
       dispatch(settingsAppAction(response.result));
      this._loadSettingsStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadCurrencies', ex);
      await currentUser().logout();
      dispatch(PreloaderMain(false));
    }
  }
  // групи відділень
  static async _loadDepartmentsGroups(dispatch) {
    this._departmentsStatus = false;
    try {
      const response = await Dictionaries.departmentsGroups();
      if (response.statusCode !== 200) {
        await currentUser().logout();
        dispatch(PreloaderMain(false));
        return;
      }
      dispatch(loadDepartmentsGroups(response.data));
      this._departmentsStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadDepartmentsGroups', ex);
      await currentUser().logout();
      dispatch(PreloaderMain(false));
    }
  }
  // Типи операцій
  static async _loadTypesOperation(dispatch) {
    this._typesOperationStatus = false;
    try {
      const response = await Dictionaries.operationTypes();
      if (response.statusCode !== 200) {
        await currentUser().logout();
        dispatch(PreloaderMain(false));
        return;
      }
      dispatch(loadOperationTypes(response.data));
      this._typesOperationStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadTypesOperation', ex);
      await currentUser().logout();
      dispatch(PreloaderMain(false));
    }
  }
  // Статуси заявок
  static async _LoadOrdersStatus(dispatch) {
    this._ordersStatusesStatus = false;
    try {
      const response = await Dictionaries.ordersStatus();
      if (response.statusCode !== 200) {
        await currentUser().logout();
        dispatch(PreloaderMain(false));
        return;
      }
      dispatch(loadOrdersStatus(response.result));
      this._ordersStatusesStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_LoadOrdersStatus', ex);
      await currentUser().logout();
      dispatch(PreloaderMain(false));
    }
  } // Загрузити замовлення
  static async _getOrders(dispatch) {
    this._getOrdersStatus = false;
    try {
      const response = await MethodsRequest.getOrders({
        pageIndex: 1,
        pageSize: 10,
        operationType: 'all',
        status: -1,
        departmentId: -1,
        sQuery: '',
      });
      console.log('response getOrders',response)
      if (response.statusCode === 200) {
        dispatch(getOrders(response.data));
        this._getOrdersStatus = true;
      }
      if (response.statusCode !== 200) {
        await currentUser().logout();
        dispatch(PreloaderMain(false));
        return;
      }
    } catch (ex) {
    }
  }
}
export {Dictionaries};
