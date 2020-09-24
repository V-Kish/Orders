import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';
import {Departments, DictionariesLoadStatusType} from '../Types';
import {AppLog} from '../Common/AppLog';
import {ListDepartments, listCurrencies} from '../store/actions/Dictionaries';

class Dictionaries {
  private _onDictionariesLoad: () => void;
  private static _loadStatus: DictionariesLoadStatusType;
  private _departmentsStatus: boolean;
  private _listCurrenciesStatus: boolean;
  private _regionsStatus: boolean;
  private _ordersStatusesStatus: boolean;
  private _listDepartmentsStatus: boolean;
  constructor() {
    this._onDictionariesLoad = null;
    this._departmentsStatus = false;
    this._listCurrenciesStatus = false;
    this._regionsStatus = false;
    this._ordersStatusesStatus = false;
    this._listDepartmentsStatus = false;
  }
  static InitDictionaries(onDictionariesLoad: () => void, dispatch) {
    if (typeof onDictionariesLoad === 'function') {
      this._onDictionariesLoad = onDictionariesLoad;
    }
    // this._loadDepartments(dispatch).then();
    this._loadCurrencies(dispatch).then();
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
      ` /rest/v1/${currentUser().userId}/${
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
    // this._loadStatus.departments &&
    // this._loadStatus.ordersStatuses &&
    // this._loadStatus.regions &&
    // this._listDepartmentsStatus &&
    if (this._listCurrenciesStatus) {
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
}
export {Dictionaries};
