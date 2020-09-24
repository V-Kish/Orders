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
}
export {MethodsRequest};
