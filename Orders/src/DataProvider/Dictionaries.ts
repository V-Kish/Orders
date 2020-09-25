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
import {GetOrderInfo} from '../functions/GetOrderInfo';
import {navigator} from '../Core/Navigator';

class Dictionaries {
  private _onDictionariesLoad: () => void;
  private static _loadStatus: DictionariesLoadStatusType;
  private _departmentsStatus: boolean;
  private _listCurrenciesStatus: boolean;
  private _typesOperationStatus: boolean;
  private _ordersStatusesStatus: boolean;
  private _listDepartmentsStatus: boolean;
  private _getOrdersStatus: boolean;
  constructor() {
    this._onDictionariesLoad = null;
    this._listDepartmentsStatus = false;
    this._listCurrenciesStatus = false;
    this._departmentsStatus = false;
    this._typesOperationStatus = false;
    this._ordersStatusesStatus = false;
    this._getOrdersStatus = false;
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

  // Статус загрузки словників
  //якщо === true всі словники завантажені
  private static isLoaded() {
    if (
      this._listCurrenciesStatus &&
      this._getOrdersStatus &&
      this._listDepartmentsStatus &&
      this._departmentsStatus &&
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
      console.log('_loadDepartments', response);
      if (response.statusCode !== 200) {
        await currentUser().logout();
        return;
      }
      dispatch(ListDepartments(response.data));
      this._listDepartmentsStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadDepartments', ex);
      await currentUser().logout();
    }
  }
  // Заповнили список валют
  static async _loadCurrencies(dispatch) {
    this._listCurrenciesStatus = false;
    try {
      const response = await Dictionaries.listCurrencies();
      console.log('_loadCurrencies', response);
      if (response.statusCode !== 200) {
        await currentUser().logout();
        return;
      }
      dispatch(listCurrencies(response.data));
      this._listCurrenciesStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadCurrencies', ex);
      await currentUser().logout();
    }
  }
  // групи відділень
  static async _loadDepartmentsGroups(dispatch) {
    this._departmentsStatus = false;
    try {
      const response = await Dictionaries.departmentsGroups();
      console.log('_loadDepartmentsGroups', response);
      if (response.statusCode !== 200) {
        await currentUser().logout();
        return;
      }
      dispatch(loadDepartmentsGroups(response.data));
      this._departmentsStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadDepartmentsGroups', ex);
      await currentUser().logout();
    }
  }
  // Типи операцій
  static async _loadTypesOperation(dispatch) {
    this._typesOperationStatus = false;
    try {
      const response = await Dictionaries.operationTypes();
      console.log('_loadTypesOperation', response);
      if (response.statusCode !== 200) {
        await currentUser().logout();
        return;
      }
      dispatch(loadOperationTypes(response.data));
      this._typesOperationStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_loadTypesOperation', ex);
      await currentUser().logout();
    }
  }
  // Статуси заявок
  static async _LoadOrdersStatus(dispatch) {
    this._ordersStatusesStatus = false;
    try {
      const response = await Dictionaries.ordersStatus();
      console.log('_LoadOrdersStatus', response);
      if (response.statusCode !== 200) {
        await currentUser().logout();
        return;
      }
      dispatch(loadOrdersStatus(response.result));
      this._ordersStatusesStatus = true;
      this.onComplete();
    } catch (ex) {
      AppLog.error('_LoadOrdersStatus', ex);
      await currentUser().logout();
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
      if (response.statusCode === 200) {
        dispatch(getOrders(response.data));
        this._getOrdersStatus = true;
      }
      if (response.statusCode !== 200) {
        await currentUser().logout();
        return;
      }
    } catch (ex) {
      console.warn('MethodsRequest getOrders', ex);
    }
  }
}
export {Dictionaries};
