import React from 'react';

import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS} from '../../../constants/colors';

export const PreloaderChat = ({isHide = false}) => {
  if (isHide) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrapIndicator}>
        <ActivityIndicator size="large" color={COLORS.HEADER_BLUE} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: COLORS.FONT_WHITE,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapIndicator: {},
});
