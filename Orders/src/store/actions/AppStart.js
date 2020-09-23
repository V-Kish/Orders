import {START_APP, CHANGE_STACK} from '../types';

export const StartApp = (value) => {
  return {
    type: START_APP,
    payload: value,
  };
};
export const ChangeStackNavigation = (value) => {
  return {
    type: CHANGE_STACK,
    payload: value,
  };
};
