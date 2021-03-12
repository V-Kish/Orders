import {
  CHAT_LIST,
  CHAT_LIST_SEARCH_PARAM,
  CHAT_LIST_PAGINATION,
  CHAT_LIST_PAGINATION_ITEMS,
  SELECTED_CHAT_ITEM, CHAT_LIST_MESSAGES, CHAT_LIST_PAGINATION_MESSAGES, CHAT_MESSAGE_PAGINATION
} from '../types';

const initialState = {
  chatListInfo: {
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
  selectedChat: {
    id: -1,
    rootId: -1,
    clientId: -1,
    clientName: '',
    clientPhone: '',
    theme: '',
    message: '',
    fromUserId: -1,
    fromUserIsClient: null,
    isUread: null,
    isMread: null,
    unReadCountU: 0,
    unReadCountM: 0,
    date: '',
  },
  listMessages: [],
  chatListMessagesInfo: {
    Theme: "",
    TotalItems: 0,
    TotalPages: 0,
    PageIndex: 0,
    PageSize: 0,
  },
  paginationBodyMessage:{
    pageIndex: 1,
    pageSize: 20,
  }
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
    case CHAT_MESSAGE_PAGINATION:
      return {
        ...state,
        paginationBodyMessage: action.payload,
      };
    case SELECTED_CHAT_ITEM:
      return {
        ...state,
        selectedChat: action.payload,
      };
      case CHAT_LIST_MESSAGES:
      return {
        ...state,
        listMessages: action.payload.Items,
        chatListMessagesInfo: {
          Theme: action.payload.Theme,
          TotalItems: action.payload.TotalItems,
          TotalPages: action.payload.TotalPages,
          PageIndex: action.payload.PageIndex,
          PageSize: action.payload.PageSize,
        },
      };
    case CHAT_LIST_PAGINATION_MESSAGES:
      return {
        ...state,
        listMessages: (action.payload.Items).concat(state.listMessages),
        chatListMessagesInfo: {
          TotalItems: action.payload.TotalItems,
          TotalPages: action.payload.TotalPages,
          PageIndex: action.payload.PageIndex,
          PageSize: action.payload.PageSize,
        },
      };
    default:
      return state;
  }
};
