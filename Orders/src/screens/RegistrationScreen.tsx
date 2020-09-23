import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authorization} from '../functions/Authorization';
export const RegistrationScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        onPress={() => Authorization.authorizationUser(dispatch)}>
        <Text>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
};
