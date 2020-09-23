import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {navigator} from '../../Core/Navigator';
export const RegistrationScreen = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigator().changeNavigationStateAuth(false)}>
        <Text>navigation</Text>
      </TouchableOpacity>
    </View>
  );
};
