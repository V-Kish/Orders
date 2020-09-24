import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {RegistrationForm} from '../View/RegistrationView/RegistrationForm';
import {RegistrationLogo} from '../View/RegistrationView/RegistrationLogo';

import {ICONS} from '../constants/icons';
import {HeaderView} from '../View/HeaderView/HeaderView';

export const RegistrationScreen = () => {
  return (
    <>
      <HeaderView icon={ICONS.headerPeoples} title="Вхід до системи" />
      <ScrollView>
        <View style={styles.container}>
          <RegistrationLogo />
          <RegistrationForm />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
