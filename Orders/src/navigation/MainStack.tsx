import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import { OrderScreen } from '../screens/OrderScreen';
const Stack = createStackNavigator();
export const MainStack = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};
