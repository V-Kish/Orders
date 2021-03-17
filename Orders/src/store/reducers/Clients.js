import {
    CLIENTS_LIST,
    CLIENTS_LIST_SEARCH_PARAM,
    SELECT_CLIENT_CHAT,
    CLEAR_SELECTED_CHAT,
    SELECTED_CLIENT_DETAILS,
    SELECTED_CLIENT_ID,
    CLIENTS_LIST_PAGINATION
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
    selectedUserOperations: [],
    selectedUserOrders: [],
    clientsListInfo: {
        TotalItems: 0,
        TotalPages: 0,
        PageIndex: 0,
        PageSize: 0
    }
}



export const ClientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLIENTS_LIST:
            return {
                ...state,
                Items: action.payload.Items,
                clientsListInfo: {
                    TotalItems: action.payload.TotalItems,
                    TotalPages: action.payload.TotalPages,
                    PageIndex: action.payload.PageIndex,
                    PageSize: action.payload.PageSize,
                }
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
        case CLIENTS_LIST_PAGINATION:
            return {
            ...state,
            Items: state.Items.concat(action.payload.Items),
            clientsListInfo: {
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
                PageIndex: action.payload.PageIndex,
                PageSize: action.payload.PageSize,
            }
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
                selectedUserOperations: action.payload.operations,
                selectedUserOrders: action.payload.orders
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
