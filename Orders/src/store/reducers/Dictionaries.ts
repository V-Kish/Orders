import {
  LIST_DEPARTMENTS,
  LIST_CURRENCIES,
  DEPARTMENT_GROUP,
  OPERATION_TYPES,
  LOAD_STATUS,
  GET_ORDERS,
  ORDER_DATA,
  ORDER_DATA_COUNT,
} from '../types';

const initialState = {
  listDepartments: [],
  listCurrencies: [],
  listDepartmentGroup: [],
  operationTypes: [],
  ordersStatus: [],
  orders: [],
  orderData: {},
  orderDataCount: 0,
  selectedDepartments: [],
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
    case ORDER_DATA_COUNT:
      return {
        ...state,
        orderDataCount: action.payload[0].count,
      };
    case ORDER_DATA:
      let orderData = state.orders.Items.find(
        (item) => item.system.orderId === action.payload,
      );
      orderData.detail.currencyIdCode = state.listCurrencies.find(
        (item) => item.id === orderData.detail.currencyId,
      ).code;
      orderData.detail.currencyToIdCode = state.listCurrencies.find(
        (item) => item.id === orderData.detail.currencyToId,
      ).code;
      const selectedDepartments = state.listDepartments.filter(
        (item) => item.id === orderData.detail.departmentId,
      );
      console.log('orderDataZZZZ', orderData);
      return {
        ...state,
        orderData: orderData !== undefined ? orderData : [],
        selectedDepartments:
          selectedDepartments !== undefined ? selectedDepartments : [],
      };
    default:
      return state;
  }
};
