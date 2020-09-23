import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authorization} from '../functions/Authorization';
import {navigator} from '../Core/Navigator';

export const RegistrationScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          Authorization.authorizationUser(dispatch, {
            login: 'qa misha',
            password: '12345678',
            deviceInfo: '',
          })
        }>
        <Text>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
