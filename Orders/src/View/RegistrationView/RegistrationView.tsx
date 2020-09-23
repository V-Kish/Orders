import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authorization} from '../../functions/Authorization';
import {navigator} from "../../Core/Navigator";
import { RegistrationTextInput } from './RegistrationTextInput';

export const RegistrationView = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View>
      <RegistrationTextInput
        value={login}

      />
    </View>
  );
};


const styles = StyleSheet.create({

})