import {START_APP, CHANGE_STACK,PRELOADER_MAIN,MODAL_CREATE_NEW_CHAT,SETTINGS_APP} from '../types';

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
export const showModalCreateNewChat = (value) => {
  return {
    type: MODAL_CREATE_NEW_CHAT,
    payload: value,
  };
};
export const settingsAppAction = (value) => {
  const maxMinutes =  value.filter(item => item.name === "OrderWaitLifeMaxTime");
  const minMinutes =  value.filter(item => item.name === "OrderWaitLifeMinTime");
  return {
    type: SETTINGS_APP,
    payload: value,
    maxMinutes:maxMinutes ? maxMinutes : [{value: "1440"}],
    minMinutes:minMinutes ? minMinutes : [{value:'30'}]
  };
};
