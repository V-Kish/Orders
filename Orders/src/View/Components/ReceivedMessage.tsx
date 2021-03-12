import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {COLORS} from '../../constants/colors';

export const ReceivedMessage = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textMessage}>{item.message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '80%',
    paddingLeft: hp(20),
    paddingVertical: hp(20),
  },
  textMessage: {
    fontFamily: 'Roboto-Regular',
      fontSize: hp(18),
    color: COLORS.FONT_BLACK,
    textAlign:'left'
  },
});
