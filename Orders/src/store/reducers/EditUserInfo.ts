import {EDIT_USER_INFO, SEARCH_PARAM, SELECTED_DEPARTMENT} from '../types';

const initialState = {
  editUser: [],
  orderData: [],
  searchParam: {status: {id: -1}, searchText: ''},
  selectedDepartment: {id: 0, text: ''},
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
    case SELECTED_DEPARTMENT:
      return {
        ...state,
        selectedDepartment: action.payload,
      };
    default:
      return state;
  }
};
