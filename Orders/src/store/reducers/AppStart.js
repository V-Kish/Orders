import {START_APP, CHANGE_STACK} from '../types';

const initialState = {
  startApp: 'This text from Redux',
  isAuthStack: true, // true = AuthStack; false = MainStack
};
export const appStartReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_APP:
      return {
        ...state,
        startApp: action.payload,
      };
    case CHANGE_STACK:
      return {
        ...state,
        isAuthStack: action.payload,
      };
    default:
      return state;
  }
};
