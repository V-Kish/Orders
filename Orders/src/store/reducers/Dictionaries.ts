import {
  LIST_DEPARTMENTS,
  LIST_CURRENCIES,
  DEPARTMENT_GROUP,
  OPERATION_TYPES,
  LOAD_STATUS,
  GET_ORDERS,
  ORDER_DATA,
} from '../types';

const initialState = {
  listDepartments: [],
  listCurrencies: [],
  listDepartmentGroup: [],
  operationTypes: [],
  ordersStatus: [],
  orders: [],
  orderData: [],
};
export const Dictionaries = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case LIST_DEPARTMENTS:
      return {
        ...state,
        listDepartments: action.payload,
      };
    case LIST_CURRENCIES:
      return {
        ...state,
        listCurrencies: action.payload,
      };
    case DEPARTMENT_GROUP:
      return {
        ...state,
        listDepartmentGroup: action.payload,
      };
    case OPERATION_TYPES:
      return {
        ...state,
        operationTypes: action.payload,
      };
    case LOAD_STATUS:
      return {
        ...state,
        ordersStatus: action.payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case ORDER_DATA:
      const orderData: any[] = [];
      state.orders.Items.forEach((item) => {
        if (item.system.orderId === action.payload) {
          orderData.push(item);
        }
      });
      return {
        ...state,
        orderData: orderData,
      };
    default:
      return state;
  }
};
