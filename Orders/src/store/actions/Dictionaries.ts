import {
  LIST_DEPARTMENTS,
  LIST_CURRENCIES,
  DEPARTMENT_GROUP,
  OPERATION_TYPES,
  LOAD_STATUS,
  GET_ORDERS, ORDER_DATA,
  ORDER_DATA_COUNT,
  SELECTED_ITEM_DEP,
  ORDER_DATA_PAGINATION
} from '../types';

export const ListDepartments = (value) => {
  return {
    type: LIST_DEPARTMENTS,
    payload: value,
  };
};
export const listCurrencies = (value) => {
  return {
    type: LIST_CURRENCIES,
    payload: value,
  };
};
export const loadDepartmentsGroups = (value) => {
  return {
    type: DEPARTMENT_GROUP,
    payload: value,
  };
};
export const loadOperationTypes = (value) => {
  return {
    type: OPERATION_TYPES,
    payload: value,
  };
};
export const loadOrdersStatus = (value) => {
  return {
    type: LOAD_STATUS,
    payload: value,
  };
};
export const getOrders = (value) => {
  return {
    type: GET_ORDERS,
    payload: value,
  };
};
export const orderData = (value) => {
  return {
    type: ORDER_DATA,
    payload: value,
  };
};
export const getOrdersPagination = (value) => {
  return {
    type: ORDER_DATA_PAGINATION,
    payload: value,
  };
};
export const getOrdersCount = (value) => {
  return {
    type: ORDER_DATA_COUNT,
    payload: value,
  };
};
export const selectedItemDep = (value) => {
  return {
    type: SELECTED_ITEM_DEP,
    payload: value,
  };
};
