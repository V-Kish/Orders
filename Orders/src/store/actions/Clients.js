import {
    CLIENTS_LIST,
    CLIENTS_LIST_PAGINATION,
    CLIENT_DETAILS
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