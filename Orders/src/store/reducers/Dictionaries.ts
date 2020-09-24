import {
  LIST_DEPARTMENTS,
  LIST_CURRENCIES,
  DEPARTMENT_GROUP,
  OPERATION_TYPES,
  LOAD_STATUS,
  GET_ORDERS,
} from '../types';

const initialState = {
  listDepartments: [],
  listCurrencies: [],
  listDepartmentGroup: [],
  operationTypes: [],
  ordersStatus: [],
  orders: [],
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
    default:
      return state;
  }
};
