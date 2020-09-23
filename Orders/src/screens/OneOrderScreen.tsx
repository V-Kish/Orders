import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import { reduxTypes } from '../Types';

export const OneOrderScreen = () => {
  const startApp = useSelector((state: reduxTypes) => state.start.startApp);
  return (
    <View>
      <Text>OneOrderScreen</Text>
    </View>
  );
};
