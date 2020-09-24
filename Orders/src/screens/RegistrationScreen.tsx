import React from 'react';
import {StyleSheet, View} from 'react-native';
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
