import {combineReducers, createStore} from 'redux';
import {appStartReducer} from './reducers/AppStart';
import {Dictionaries} from './reducers/Dictionaries';
import {EditUser} from './reducers/EditUserInfo';

const rootReducer = combineReducers({
  start: appStartReducer,
  dictionaries: Dictionaries,
  ditUser: EditUser,
});

export default createStore(rootReducer);
