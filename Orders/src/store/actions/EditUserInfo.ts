import {EDIT_USER_INFO, ORDER_DATA} from '../types';

export const editUserInfo = (value) => {
  return {
    type: EDIT_USER_INFO,
    payload: value,
  };
};
