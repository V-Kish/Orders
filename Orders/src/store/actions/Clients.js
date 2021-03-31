import {
    CLIENTS_LIST,
    CLIENTS_LIST_PAGINATION,
    CLIENT_DETAILS,
    CLIENTS_LIST_SEARCH_PARAM,
    SELECT_CLIENT_CHAT,
    CLEAR_SELECTED_CHAT,
    SELECTED_CLIENT_DETAILS,
    SELECTED_CLIENT_ID,
    SELECT_CLIENT_ORDERS,
    ADD_NEW_CHAT,
    SELECTED_CLIENT_NOTES,
    ADD_NOTES_TO_LIST
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

export const SelectClientOrdersAction = (value) =>{
    return {
        type: SELECT_CLIENT_ORDERS,
        payload: value
    };
}


export const ClearSelectedChat = (value) => {
    return {
        type: CLEAR_SELECTED_CHAT,
        payload: value,
    };
};


export const SelectedClientDetails = (value, operations, orders) => {
    return {
        type: SELECTED_CLIENT_DETAILS,
        payload: {
            value,
            operations,
            orders
        },
    };
};

export const SelectedClientId = (value) => {
    return {
        type: SELECTED_CLIENT_ID,
        payload: value,
    };
};
export const AddNewChat = (value) => {
    return {
        type: ADD_NEW_CHAT,
        payload: value,
    };
};
export const SelectedClientNotes = (value) => {
    return {
        type: SELECTED_CLIENT_NOTES,
        payload: value
    };
};
export const addNotesToList = (value) => {
    return {
        type: ADD_NOTES_TO_LIST,
        payload: value
    };
};
