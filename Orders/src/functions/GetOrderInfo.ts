import {navigator} from '../Core/Navigator';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {Dispatch} from 'react';
import {editUserInfo} from '../store/actions/EditUserInfo';
import { orderData, getOrders } from '../store/actions/Dictionaries';

class GetOrderInfo {
  static async getOrder(dispatch: Dispatch<any>,selectedIdItem) {
    try {
      dispatch(orderData(selectedIdItem));
      const response = await MethodsRequest.getUserInfo(47);
      console.log('response kish',response)
      if (response.statusCode === 200) {
        dispatch(editUserInfo(response.data));
        navigator().navigate('OrderScreen');
      }
    } catch (ex) {
      console.warn('GetOrderInfo getOrder', ex);
    }
  }
  static async getOrders(dispatch: Dispatch<any>,body) {
    try {
      const response = await MethodsRequest.getOrders(body);
      console.log('response getOrdersKISH(!',response)
      if (response.statusCode === 200) {
        dispatch(getOrders(response.data));
      }
    } catch (ex) {
      console.warn('GetOrderInfo getOrder', ex);
    }
  }
}
export {GetOrderInfo};
