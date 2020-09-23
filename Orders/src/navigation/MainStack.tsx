import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { RegistrationScreen } from '../screens/RegistrationScreen/RegistrationScreen';
const Stack = createStackNavigator();
export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      {/*<Stack.Screen name="HomeScreen" component={HomeScreen} />*/}
    </Stack.Navigator>
  );
};
