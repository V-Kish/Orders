import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authorization} from '../functions/Authorization';
import {navigator} from "../Core/Navigator";
import { RegistrationForm } from '../View/RegistrationView/RegistrationView';
import { RegistrationLogo } from '../View/RegistrationView/RegistrationLogo';

export const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <RegistrationLogo/>
      <RegistrationForm/>
    </View>
  );
};


const styles = StyleSheet.create({
  
})