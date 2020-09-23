import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};
