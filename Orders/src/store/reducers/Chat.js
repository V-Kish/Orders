import {CHAT_LIST} from '../types';

const initialState = {
  TotalItems: 0,
  TotalPages: 0,
  PageIndex: 0,
  PageSize: 0,
  Items: [],
};
export const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_LIST:
      return {
        ...state,
        TotalItems: action.TotalItems,
        TotalPages: action.TotalPages,
        PageIndex: action.PageIndex,
        PageSize: action.PageSize,
        Items: action.payload,
      };

    default:
      return state;
  }
};
