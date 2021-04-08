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
      <Text style={styles.textUser}>{item.fromUserName}:</Text>
      <Text style={styles.textMessage}>{item.message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    paddingLeft: hp(20),
    paddingVertical: hp(20),
    backgroundColor:COLORS.FONT_WHITE,
    borderRadius:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 6,
    paddingHorizontal:wp(10),
    marginLeft:wp(10),
    marginVertical:hp(10)
  },
  textMessage: {
    fontFamily: 'Roboto-Regular',
      fontSize: hp(18),
    color: COLORS.FONT_BLACK,
    textAlign:'left'
  },
  textUser: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(12),
    color: COLORS.FONT_BLACK,
    textAlign:'right'
  },
});
