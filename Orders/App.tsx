import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {MainNavigation} from './src/navigation/MainNavigation';
import { pushMessagesHandler } from './src/Core/pushMessageHundler';
declare const global: {HermesInternal: null | {}};
global.reload = false;
global.pushMessagesHandler = pushMessagesHandler;
const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
