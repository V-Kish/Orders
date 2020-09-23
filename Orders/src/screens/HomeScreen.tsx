import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {navigator} from '../Core/Navigator';
import {useDispatch} from 'react-redux';
export const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigator().changeNavigationStateAuth(true, dispatch)}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};
