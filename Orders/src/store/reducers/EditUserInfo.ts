import {
  EDIT_USER_INFO,
  PAGINATION,
  SEARCH_PARAM,
  SELECTED_DEPARTMENT,
} from '../types';

const initialState = {
  editUser: [],
  orderData: [],
  searchParam: {status: {id: -1}, searchText: ''},
  selectedDepartment: {id: 0, text: ''},
  paginationBody: {
    pageIndex: 1,
    pageSize: 10,
    operationType: 'all',
    departmentId: -1,
  },
};
export const EditUser = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case EDIT_USER_INFO:
      return {
        ...state,
        editUser: action.payload,
      };
    case SEARCH_PARAM:
      return {
        ...state,
        searchParam: {
          ...state.searchParam,
          ...action.payload,
        },
      };
    case PAGINATION:
      return {
        ...state,
        paginationBody: action.payload,
      };
    case SELECTED_DEPARTMENT:
      return {
        ...state,
        selectedDepartment: action.payload,
      };
    default:
      return state;
  }
};
