import {combineReducers, createStore} from 'redux';
import {appStartReducer} from './reducers/AppStart';
import {Dictionaries} from './reducers/Dictionaries';

const rootReducer = combineReducers({
  start: appStartReducer,
  dictionaries: Dictionaries,
});

export default createStore(rootReducer);
