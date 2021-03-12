import {CHAT_LIST, CHAT_LIST_SEARCH_PARAM, CHAT_LIST_PAGINATION,CHAT_LIST_PAGINATION_ITEMS} from '../types';

export const ChatListAction = (value) => {
  return {
    type: CHAT_LIST,
    payload: value,
  };
};
export const ChatListPaginationAction = (value) => {
  return {
    type: CHAT_LIST_PAGINATION_ITEMS,
    payload: value,
  };
};
export const chatListSearchParamAction = (value) => {
  return {
    type: CHAT_LIST_SEARCH_PARAM,
    payload: value,
  };
};
export const chatListPagination = (value) => {
  return {
    type: CHAT_LIST_PAGINATION,
    payload: value,
  };
};
