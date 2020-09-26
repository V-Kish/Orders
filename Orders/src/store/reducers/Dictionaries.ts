import {
  LIST_DEPARTMENTS,
  LIST_CURRENCIES,
  DEPARTMENT_GROUP,
  OPERATION_TYPES,
  LOAD_STATUS,
  GET_ORDERS,
  ORDER_DATA,
  ORDER_DATA_COUNT,
  GET_ORDERS_MORE,
  SELECTED_ITEM_DEP,
  ORDER_DATA_PAGINATION,
} from '../types';
import {dateParse, convertToUTCString} from '../../helpers/DateParse';

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
  ordersArray:[]
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
    case SELECTED_ITEM_DEP:
      let selectedDep = state.listDepartments.find(
        (item) => item.id === action.payload,
      );
      return {
        ...state,
        selectedDepartments: selectedDep,
      };
    case ORDER_DATA_PAGINATION:
      let ordersPagination = action.payload.Items;
      function sortPaginationArray(a, b) {
        let dateA = dateParse(convertToUTCString(a.system.statusDate));
        let dateB = dateParse(convertToUTCString(b.system.statusDate));
        return dateB.getTime() - dateA.getTime();
      }
      ordersPagination.sort(sortPaginationArray);
      return {
        ...state,
        ordersArray: state.ordersArray.concat(ordersPagination),
        orders: action.payload
      };
    case GET_ORDERS:
      let orders = action.payload;
      function sortHistoryArray(a, b) {
        let dateA = dateParse(convertToUTCString(a.system.statusDate));
        let dateB = dateParse(convertToUTCString(b.system.statusDate));
        return dateB.getTime() - dateA.getTime();
      }
      orders.Items.sort(sortHistoryArray);
      return {
        ...state,
        orders: orders,
        ordersArray:orders.Items
      };
    case ORDER_DATA_COUNT:
      return {
        ...state,
        orderDataCount: action.payload[0].count,
      };
    case ORDER_DATA:
      let orderData = action.payload;
      console.log('orderData', orderData);
      const selectedDepartments = state.listDepartments.find(
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
