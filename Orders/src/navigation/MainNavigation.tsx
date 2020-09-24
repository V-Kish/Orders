import React, {useEffect} from 'react';
import {MainStack} from './MainStack';
import {AuthStack} from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from '../Types';
import {NavigationContainer} from '@react-navigation/native';
import {navigator} from '../Core/Navigator';
import {currentUser} from '../Core/CurrentUser';
import {Dictionaries} from '../DataProvider/Dictionaries';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {getOrders} from '../store/actions/Dictionaries';
export const MainNavigation = () => {
  const dispatch = useDispatch();
  async function getUserData() {
    currentUser()
      .secureUserDataGet()
      .then(async (response) => {
        const date = JSON.parse(response);
        console.log('date', date);
        if (date === null || date.userToken === null) {
          navigator().changeNavigationStateAuth(true, dispatch);
        } else {
          currentUser().restoreUserData = response;
          try {
            await Dictionaries.InitDictionaries(function () {
              navigator().changeNavigationStateAuth(false, dispatch);
            }, dispatch);
          } catch (ex) {
            console.warn('Auth getTokenFireBase', ex);
          }
          try {
            const response = await MethodsRequest.getOrders();
            if (response.statusCode !== 200) {
              return;
            }
            dispatch(getOrders(response.data));
          } catch (ex) {
            console.warn('MethodsRequest getOrders', ex);
          }
          navigator().changeNavigationStateAuth(false, dispatch);
        }
      })
      .catch((error) => {});
  }
  useEffect(() => {
    console.log('useEffect');
    getUserData().then();
  }, []);
  const isAuthStack = useSelector(
    (state: reduxTypes) => state.start.isAuthStack,
  );

  return (
    <NavigationContainer ref={navigator().setNavigation.bind(navigator())}>
      {isAuthStack ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};
