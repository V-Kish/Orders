import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
export const ButtonView = ({color, textColor, title, onPress=()=>{}}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, backgroundColor: color}}
      onPress={onPress}>
      <Text style={{...styles.text, color: textColor}}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 6,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: hp(16),
    paddingHorizontal: hp(15),
    paddingVertical: hp(10),
  },
});
