import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {COLORS} from '../../constants/colors';
export const Counter = ({counter}) => {
  if (counter <= 0) {
    return <></>;
  }

  return (
    <View style={styles.counter}>
      <Text style={styles.counterText}>+{counter}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  counter: {
    position: 'absolute',
    top: hp(-25),
    right: hp(-20),
    backgroundColor: 'red',
    borderRadius: 50,
    width: hp(40),
    height: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontFamily: 'Rotobo-Regular',
    fontSize: hp(14),
    color: COLORS.FONT_WHITE,
  },
});
