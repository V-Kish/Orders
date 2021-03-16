import {
    CLIENTS_LIST,
    CLIENTS_LIST_PAGINATION,
    CLIENT_DETAILS,
    CLIENTS_LIST_SEARCH_PARAM,
    SELECT_CLIENT_CHAT
  } from '../types';

export const ClientsListAction = (value) => {
    return {
        type: CLIENTS_LIST,
        payload: value,
    };
};

export const ClientsListPaginationAction = (value) => {
    return {
        type: CLIENTS_LIST_PAGINATION,
        payload: value,
    };
};

export const ClientDetails = (value) => {
    return {
        type: CLIENT_DETAILS,
        payload: value,
    };
};

export const ClientsListSearchParamAction = (value) => {
    return {
        type: CLIENTS_LIST_SEARCH_PARAM,
        payload: value,
    };
};

export const SelectClientChatAction = (value) => {
    return {
        type: SELECT_CLIENT_CHAT,
        payload: value,
    };
};
