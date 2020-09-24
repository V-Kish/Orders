import {EDIT_USER_INFO, ORDER_DATA} from '../types';

const initialState = {
  editUser: [],
  orderData: [],
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
    default:
      return state;
  }
};
