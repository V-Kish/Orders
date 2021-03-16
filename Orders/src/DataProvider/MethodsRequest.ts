import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';
import {Orders} from '../Types';
class MethodsRequest {
  // Пошук заявок
  static async getOrders(body: Orders) {
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
    body: {orderStatusId: number; comment: string; waitTimeInMinutes: number}, //waitTimeInMinutes:120
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
  // -- Метод вертає кількість замовленя за статусом
  static async getOrdersNumber(
    body: {ordersStatus: Array<string>} = {ordersStatus:[1]},
  ) {
    return fetchData(
      `rest/v1/${currentUser().userId}/${currentUser().userToken}/loyaltyProg/orders/stat`,
      'POST',
      body,
    );
  }
}
export {MethodsRequest};
