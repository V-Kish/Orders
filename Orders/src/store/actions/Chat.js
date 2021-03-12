import {CHAT_LIST, CHAT_LIST_SEARCH_PARAM, CHAT_LIST_PAGINATION,CHAT_LIST_PAGINATION_ITEMS,SELECTED_CHAT_ITEM} from '../types';

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
export const selectedItemChatAction = (value) => {
  return {
    type: SELECTED_CHAT_ITEM,
    payload: value,
  };
};
