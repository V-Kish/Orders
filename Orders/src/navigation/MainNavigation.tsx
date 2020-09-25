import React, {useEffect} from 'react';
import {MainStack} from './MainStack';
import {AuthStack} from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from '../Types';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {navigator} from '../Core/Navigator';
import {currentUser} from '../Core/CurrentUser';
import {Dictionaries} from '../DataProvider/Dictionaries';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {getOrdersCount} from '../store/actions/Dictionaries';
export const MainNavigation = () => {
  const dispatch = useDispatch();
  async function getUserData() {
    await currentUser()
      .secureUserDataGet()
      .then(async (response) => {
        const date = JSON.parse(response);
        console.log('date', date);
        if (date === null || date.userToken === null) {
          navigator().changeNavigationStateAuth(true, dispatch);
          navigator().state.prevScreen.push({
            name: 'RegistrationScreen',
            params: {data: {}, key: undefined, screen: null},
          });
        } else {
          currentUser().restoreUserData = response;
          try {
            await Dictionaries.InitDictionaries(function () {
              navigator().changeNavigationStateAuth(false, dispatch);
              navigator().state.prevScreen.push({
                name: 'HomeScreen',
                params: {data: {}, key: undefined, screen: null},
              });
            }, dispatch);
          } catch (ex) {
            console.warn('Auth getTokenFireBase', ex);
          }
          try {
            const response = await MethodsRequest.getOrdersNumber();
            if (response.statusCode === 200) {
              dispatch(getOrdersCount(response.result));
            }
          } catch (ex) {
            console.warn('MethodsRequest.getOrdersNumber', ex);
          }
        }
      })
      .catch((error) => {
        console.warn('MethodsRequest.error', error);
      });
  }
  useEffect(() => {
    getUserData().then();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (currentUser().userToken !== null) {
        global.pushMessagesHandler.setBackground(false);
        global.pushMessagesHandler.checkMessageType(remoteMessage,dispatch);
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        if (currentUser().userToken !== null) {
          global.pushMessagesHandler.setBackground(true);
          global.pushMessagesHandler.checkMessageType(remoteMessage,dispatch);
        }
      },
    );
    return unsubscribe;
  }, []);
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      global.pushMessagesHandler.setIsOpenBackground(true);
      global.pushMessagesHandler.checkMessageType(remoteMessage,dispatch);
    });
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
