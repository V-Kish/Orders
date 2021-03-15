import {navigator} from '../Core/Navigator';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {Dispatch} from 'react';
import {editUserInfo, paginationMainList} from '../store/actions/EditUserInfo';
import {
  orderData,
  getOrders,
  getOrdersPagination,
} from '../store/actions/Dictionaries';
import {Orders} from '../Types';

class GetOrderInfo {
  static async getOrder(dispatch: Dispatch<any>, selectedIdItem) {
    try {
      dispatch(orderData(selectedIdItem));
      const response = await MethodsRequest.getUserInfo(
        selectedIdItem.detail.clientId,
      );
      if (response.statusCode === 200) {
        dispatch(editUserInfo(response.data));
        navigator().navigate('OrderScreen');
      }
    } catch (ex) {
    }
  }
  static async getOrders(
    dispatch: Dispatch<any>,
    searchText = '',
    status: number = -1,
    body: Orders = {
      pageIndex: 1,
      pageSize: 10,
      operationType: 'all',
      status: -1,
      departmentId: -1,
      sQuery: '',
    },
    pagination = false,
  ) {
    let bodyRequest = body;
    bodyRequest.sQuery = searchText;
    bodyRequest.status = status;
    try {
      const response = await MethodsRequest.getOrders(bodyRequest);
      console.log('response orders',response)
      if (response.statusCode === 200 && !pagination) {
        dispatch(getOrders(response.data));
      }
      if (response.statusCode === 200 && pagination) {
        dispatch(getOrdersPagination(response.data));
        dispatch(paginationMainList(body));
      }
      return response;
    } catch (ex) {
    }
  }
}
export {GetOrderInfo};
