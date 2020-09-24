import {
  LIST_DEPARTMENTS,
  LIST_CURRENCIES,
  DEPARTMENT_GROUP,
  OPERATION_TYPES,
  LOAD_STATUS,
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
