import {
    CLIENTS_LIST,
    CLIENTS_LIST_SEARCH_PARAM,
    SELECT_CLIENT_CHAT,
    CLEAR_SELECTED_CHAT,
    SELECTED_CLIENT_DETAILS,
    SELECTED_CLIENT_ID
  } from '../types';


const initialState = {
    Items: [],
    searchParam: {searchText: ''},
    selectedChatUser: {
        userName: '',
        id: -1
    },
    selectedUser: {},
    selectedClientId: {},
    selectedUserOperations: []
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
        case SELECTED_CLIENT_DETAILS:
            return {
                ...state,
                selectedUser: action.payload.value,
                selectedUserOperations: action.payload.operations
            }
        case SELECTED_CLIENT_ID:
            return {
                ...state,
                selectedClientId: action.payload
            }
        default:
            return state;
    }
}
