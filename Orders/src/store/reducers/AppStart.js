import {TEST} from '../types';

const initialState = {
  startApp: 'This text from Redux',
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
