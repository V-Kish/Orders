import {START_APP, CHANGE_STACK,PRELOADER_MAIN} from '../types';

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
export const PreloaderMain = (value) => {
  return {
    type: PRELOADER_MAIN,
    payload: value,
  };
};
