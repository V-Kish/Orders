import {CHAT_LIST, CHAT_LIST_SEARCH_PARAM, CHAT_LIST_PAGINATION, CHAT_LIST_PAGINATION_ITEMS} from '../types';

const initialState = {
  chatListInfo : {
    TotalItems: 0,
    TotalPages: 0,
    PageIndex: 0,
    PageSize: 0,
  },
  Items: [],
  searchParam: {searchText: ''},
  paginationBody: {
    pageIndex: 1,
    pageSize: 10,
    isRead: -1,
  },
};
export const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_LIST:
      return {
        ...state,
        Items: action.payload.Items,
        chatListInfo: {
          TotalItems: action.payload.TotalItems,
          TotalPages: action.payload.TotalPages,
          PageIndex: action.payload.PageIndex,
          PageSize: action.payload.PageSize,
        },
      };
      case CHAT_LIST_PAGINATION_ITEMS:
      return {
        ...state,
        Items: state.Items.concat(action.payload.Items),
        chatListInfo: {
          TotalItems: action.payload.TotalItems,
          TotalPages: action.payload.TotalPages,
          PageIndex: action.payload.PageIndex,
          PageSize: action.payload.PageSize,
        },
      };
    case CHAT_LIST_SEARCH_PARAM:
      return {
        ...state,
        searchParam: action.payload,
        paginationBody: {
          pageIndex: 1,
          pageSize: 10,
          isRead: -1,
        },
      };
    case CHAT_LIST_PAGINATION:
      return {
        ...state,
        paginationBody: action.payload,
      };
    default:
      return state;
  }
};
