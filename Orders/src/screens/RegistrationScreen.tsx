import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {navigator} from '../Core/Navigator';
import {useDispatch} from 'react-redux';
export const RegistrationScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigator().changeNavigationStateAuth(false, dispatch)}>
        <Text>navigation</Text>
      </TouchableOpacity>
    </View>
  );
};
