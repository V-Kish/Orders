import React from 'react';
import {Provider, useDispatch} from 'react-redux';
import store from './src/store';
import {MainNavigation} from './src/navigation/MainNavigation';
import { currentUser } from './src/Core/CurrentUser';
import {navigator} from "./src/Core/Navigator";
declare const global: {HermesInternal: null | {}};

const App = () => {
    // const dispatch = useDispatch();
    // async function getUserData() {
    //     currentUser()
    //         .secureUserDataGet()
    //         .then(async (response) => {
    //             const date = JSON.parse(response);
    //             if (date === null || date.userToken === null) {
    //                 navigator().changeNavigationStateAuth(true, dispatch)
    //             } else {
    //                 currentUser().restoreUserData = response;
    //                 setTimeout(
    //                     () =>
    //                         (controllers().mainPreloaderController.mainPreloaderController.isVisible = true),
    //                     1000,
    //                 );
    //         }
    // }
    // }
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
