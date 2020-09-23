import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import { MainNavigation } from './src/navigation/MainNavigation';
import { StatusBar } from 'react-native';
declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar/>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </>
  );
};

export default App;
