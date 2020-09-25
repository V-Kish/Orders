import {EDIT_USER_INFO, SELECTED_DEPARTMENT, SEARCH_PARAM,PAGINATION} from '../types';

export const editUserInfo = (value) => {
  return {
    type: EDIT_USER_INFO,
    payload: value,
  };
};
export const searchParam = (value) => {
  return {
    type: SEARCH_PARAM,
    payload: value,
  };
};
export const selectedDepartment = (value) => {
  return {
    type: SELECTED_DEPARTMENT,
    payload: value,
  };
};
export const paginationMainList = (value) => {
  return {
    type: PAGINATION,
    payload: value,
  };
};
