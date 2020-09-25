import {EDIT_USER_INFO, SEARCH_PARAM} from '../types';

const initialState = {
  editUser: [],
  orderData: [],
  searchParam: {statusId: -1, searchText: ''},
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
        searchParam: action.payload,
      };
    default:
      return state;
  }
};
