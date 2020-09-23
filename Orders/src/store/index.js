import {combineReducers, createStore} from 'redux';
import {appStartReducer} from './reducers/AppStart';

const rootReducer = combineReducers({
  start: appStartReducer,
});

export default createStore(rootReducer);
