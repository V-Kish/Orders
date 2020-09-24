import {LIST_DEPARTMENTS,LIST_CURRENCIES} from '../types';

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
