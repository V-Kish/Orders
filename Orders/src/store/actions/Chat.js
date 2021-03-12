import {
  CHAT_LIST,
  CHAT_LIST_SEARCH_PARAM,
  CHAT_LIST_PAGINATION,
  CHAT_LIST_PAGINATION_ITEMS,
  SELECTED_CHAT_ITEM,
  CHAT_LIST_MESSAGES,
  CHAT_LIST_PAGINATION_MESSAGES,CHAT_MESSAGE_PAGINATION
} from '../types';

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
export const chatMessagesPagination = (value) => {
  return {
    type: CHAT_MESSAGE_PAGINATION,
    payload: value,
  };
};
export const selectedItemChatAction = (value) => {
  return {
    type: SELECTED_CHAT_ITEM,
    payload: value,
  };
};
export const ChatListMessagesAction = (value) => {
  return {
    type: CHAT_LIST_MESSAGES,
    payload: value,
  };
};
export const ChatListMessagesPaginationAction = (value) => {
  return {
    type: CHAT_LIST_PAGINATION_MESSAGES,
    payload: value,
  };
};
