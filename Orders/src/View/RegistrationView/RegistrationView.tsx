import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authorization} from '../../functions/Authorization';
import {navigator} from "../../Core/Navigator";
import { RegistrationTextInput } from './RegistrationTextInput';
import { RegistrationSubmitButton } from './RegistrationSubmitButton';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  
  const authorize = () => {
    Authorization.authorizationUser(dispatch, {login,password})
  }
  return (
    <View style={styles.container}>
        <RegistrationTextInput
            title="Логін для входу в систему"
            value={login}
            setValue={setLogin}
        />
        <RegistrationTextInput
            title="Ваш пароль"
            value={password}
            setValue={setPassword}
        />
        <RegistrationSubmitButton
            authSubmit={authorize}
        />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        
    }
})