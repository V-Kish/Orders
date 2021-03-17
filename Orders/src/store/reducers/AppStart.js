import {
  START_APP,
  CHANGE_STACK,
  PRELOADER_MAIN,
  MODAL_CREATE_NEW_CHAT,
  SETTINGS_APP,
} from '../types';

const initialState = {
  startApp: 'This text from Redux',
  isAuthStack: true, // true = AuthStack; false = MainStack
  mainPreloader: true,
  showModal: false,
  // Максимальна кількість часу в хвилинах для проведення заявки зі статусу Очікує
  maxMinutes: [{value: '1440'}],
  // Мінімальна кількість часу в хвилинах для проведення заявки зі статусу Очікує
  minMinutes: [{value: '30'}],
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
    case MODAL_CREATE_NEW_CHAT:
      return {
        ...state,
        showModal: action.payload,
      };
    case SETTINGS_APP:
      return {
        ...state,
        maxMinutes: action.maxMinutes,
        minMinutes: action.minMinutes,
      };
    default:
      return state;
  }
};
