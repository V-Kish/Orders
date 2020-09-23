import {TEST} from '../types';

export const StartApp = (value) => {
  return {
    type: TEST,
    payload: value,
  };
};
