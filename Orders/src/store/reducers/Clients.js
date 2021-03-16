import { CLIENTS_LIST} from '../types';

const initialState = {
  Items: [],
};

export const ClientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENTS_LIST:
      return {
        ...state,
        Items: action.payload.Items,
      };
    default:
      return state;
  }
};
