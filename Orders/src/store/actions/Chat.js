import {CHAT_LIST} from '../types';

export const ChatListAction = (value) => {
  return {
    type: CHAT_LIST,
    payload: value.Items,
    TotalItems: value.TotalItems,
    TotalPages: value.TotalPages,
    PageIndex: value.PageIndex,
    PageSize: value.PageSize,
  };
};
