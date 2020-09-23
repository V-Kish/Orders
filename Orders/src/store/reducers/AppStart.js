import {TEST} from '../types';

const initialState = {
  startApp: true,
};
export const appStartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        startApp: action.payload,
      };
    default:
      return state;
  }
};
