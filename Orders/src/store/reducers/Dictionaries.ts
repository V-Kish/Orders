import {LIST_DEPARTMENTS, LIST_CURRENCIES} from '../types';

const initialState = {
  listDepartments: [],
  listCurrencies: [],
};
export const Dictionaries = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case LIST_DEPARTMENTS:
      return {
        ...state,
        listDepartments: action.payload,
      };
    case LIST_CURRENCIES:
      console.log('LIST_CURRENCIES1',action)
      console.log('LIST_CURRENCIES2',action.payload)
      return {
        ...state,
        listCurrencies: action.payload,
      };
    default:
      return state;
  }
};
