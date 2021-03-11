import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {MainNavigation} from './src/navigation/MainNavigation';
import { pushMessagesHandler } from './src/Core/pushMessageHundler';
import {MainNavigationView} from "./src/navigation/MainNavigationView";
import { controllers } from './src/Controllers/Controllers';
import { StatusBar, View,Text } from 'react-native';
declare const global: {HermesInternal: null | {}};
global.pushMessagesHandler = pushMessagesHandler;
const App = () => {

  return (
      // <View><Text>App</Text></View>
    <Provider store={store}>
      {/*<MainNavigation />*/}
        <MainNavigationView
            model={controllers().navigationController.mainNavigation}
            key={controllers().navigationController.mainNavigation.id}
            id={controllers().navigationController.mainNavigation.id}
        />
    </Provider>
  );
};

export default App;
