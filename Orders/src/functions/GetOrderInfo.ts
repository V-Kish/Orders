import {navigator} from '../Core/Navigator';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {Dispatch} from 'react';
import {editUserInfo} from '../store/actions/EditUserInfo';
import {orderData, getOrders} from '../store/actions/Dictionaries';
import {Orders} from '../Types';
import {currentUser} from "../Core/CurrentUser";

class GetOrderInfo {
  static async getOrder(dispatch: Dispatch<any>, selectedIdItem) {
    try {
      console.log('selectedIdItem',selectedIdItem)
      dispatch(orderData(selectedIdItem));
      const response = await MethodsRequest.getUserInfo(selectedIdItem.detail.clientId);
      console.log('response kish', response);
      if (response.statusCode === 200) {
        dispatch(editUserInfo(response.data));
        navigator().navigate('OrderScreen');
      }
    } catch (ex) {
      console.warn('GetOrderInfo getOrder', ex);
    }
  }
  static async getOrders(
    dispatch: Dispatch<any>,
    searchText = '',
    status:number = -1,
    body: Orders = {
      pageIndex: 1,
      pageSize: 10,
      operationType: 'all',
      status: -1,
      departmentId: -1,
      sQuery: '',
    },
  ) {
    let bodyRequest = body;
    bodyRequest.sQuery = searchText;
    bodyRequest.status = status;
    try {
      const response = await MethodsRequest.getOrders(bodyRequest);
      if (response.statusCode === 200) {
        dispatch(getOrders(response.data));
      }
    } catch (ex) {
      console.warn('GetOrderInfo getOrder', ex);
    }
  }
}
export {GetOrderInfo};
