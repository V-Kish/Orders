import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RegistrationScreen} from '../screens/RegistrationScreen';
const Stack = createStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
