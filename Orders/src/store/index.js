import {combineReducers, createStore} from 'redux';
import {appStartReducer} from './reducers/AppStart';
import {Dictionaries} from './reducers/Dictionaries';
import {EditUser} from './reducers/EditUserInfo';
import {ChatReducer} from "./reducers/Chat";
import {ClientsReducer} from "./reducers/Clients";

const rootReducer = combineReducers({
  start: appStartReducer,
  dictionaries: Dictionaries,
  ditUser: EditUser,
  chat: ChatReducer,
  clients: ClientsReducer
});

export default createStore(rootReducer);
