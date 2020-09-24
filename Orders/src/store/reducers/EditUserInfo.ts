import {EDIT_USER_INFO} from '../types';

const initialState = {
  editUser: [],
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
