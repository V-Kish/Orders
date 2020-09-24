import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {ErrorScreen} from '../screens/ErrorScreen';
const Stack = createStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
