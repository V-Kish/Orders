import {START_APP, CHANGE_STACK, PRELOADER_MAIN} from '../types';

const initialState = {
  startApp: 'This text from Redux',
  isAuthStack: true, // true = AuthStack; false = MainStack
  mainPreloader:true,
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
    case PRELOADER_MAIN:
      return {
        ...state,
        mainPreloader: action.payload,
      };
    default:
      return state;
  }
};
