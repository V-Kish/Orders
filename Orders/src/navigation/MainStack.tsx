import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {OrderScreen} from '../screens/OrderScreen';
import {navigator} from '../Core/Navigator';
import {OptionsScreen} from '../screens/OptionsScreen';
import {ChatListScreen} from '../screens/Chat/ChatListScreen';
import {ChatScreen} from '../screens/Chat/ChatScreen';
const Stack = createStackNavigator();
export const MainStack = () => {
  useEffect(() => {
    const backAction = () => {
      navigator().toGoBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Stack.Navigator initialRouteName={'OptionsScreen'}>
      <Stack.Screen
        name="OptionsScreen"
        component={OptionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
