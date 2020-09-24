import React from 'react';
import {StyleSheet, View} from 'react-native';
import { RegistrationForm } from '../View/RegistrationView/RegistrationForm';
import { RegistrationLogo } from '../View/RegistrationView/RegistrationLogo';
import { HeaderView } from '../View/HeaderView/HeaderView';
import { ICONS } from '../constants/icons';

export const RegistrationScreen = () => {
  return (
    <>
      <HeaderView
          icon={ICONS.headerPeoples}
          title="Вхід до системи"
        />
      <View style={styles.container}>
        <RegistrationLogo/>
        <RegistrationForm/>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})
