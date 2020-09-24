import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';
import {Orders} from '../Types';
class MethodsRequest {
  // Пошук заявок
  static async getOrders(
    body: Orders = {
      pageIndex: 1,
      pageSize: 10,
      operationType: 'all',
      status: -1,
      departmentId: -1,
      sQuery: '',
    },
  ) {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/loyaltyProg/orders`,
      'POST',
      body,
    );
  }
  // - Детальна інформація про клієнта
  static async getUserInfo(editUserId: number) {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/loyaltyProg/users/${editUserId}/info`,
      'GET',
    );
  }
  // - Змінити статус заявки
  static async changeStatusOrder(
    orderId: number,
    body: {orderStatusId: number; comment: string},
  ) {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${
        currentUser().userToken
      }/loyaltyProg/orders/${orderId}/status`,
      'PUT',
      body,
    );
  }
  // -- Змінити відділення заявки
  static async changeDepartmentOrder(
    orderId: number,
    body: {departmentId: number},
  ) {
    return fetchData(
      `/rest/v1/${currentUser().userId}/${currentUser().userToken}/loyaltyProg/orders/${orderId}/department`,
      'PUT',
      body,
    );
  }
}
export {MethodsRequest};
