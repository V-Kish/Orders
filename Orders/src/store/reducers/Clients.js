import {
    CLIENTS_LIST,
    CLIENTS_LIST_SEARCH_PARAM,
    SELECT_CLIENT_CHAT,
    CLEAR_SELECTED_CHAT
  } from '../types';


const initialState = {
    Items: [],
    searchParam: {searchText: ''},
    selectedChatUser: {
        userName: '',
        id: -1
    }
}



export const ClientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLIENTS_LIST:
            return {
                ...state,
                Items: action.payload.Items
            };
        case CLIENTS_LIST_SEARCH_PARAM:
            return {
                ...state,
                searchParam: action.payload,
                paginationBody: {
                    pageIndex: 1,
                    pageSize: 10,
                },
            };
        case SELECT_CLIENT_CHAT:
            return {
                ...state,
                selectedChatUser: action.payload
            };
        case CLEAR_SELECTED_CHAT:
            return {
                ...state,
                selectedChatUser: {
                    userName: '',
                    id: -1
                }
            };
        default:
            return state;
    }
}
