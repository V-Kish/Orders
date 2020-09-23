import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import { MainNavigation } from './src/navigation/MainNavigation';
declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
      {/*<OfflineNotice />*/}
    </Provider>
  );
};

export default App;
