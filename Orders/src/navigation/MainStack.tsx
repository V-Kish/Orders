import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RegistrationScreen} from '../screens/RegistrationScreen/RegistrationScreen';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();
export const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        {/*<Stack.Screen name="HomeScreen" component={HomeScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
