import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import { reduxTypes } from '../../Types';
export const RegistrationScreen = () => {
  const startApp = useSelector((state: reduxTypes) => state.start.startApp);
  console.warn('startApp', startApp);
  return (
    <View>
      <Text>{startApp}</Text>
    </View>
  );
};
