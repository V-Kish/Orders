import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { CHAT_ICONS } from '../../constants/icons';
import {CHAT_COLORS, COLORS} from "../../constants/colors";

export const FloatButton = ({clickFn}) => {
  return (
    <TouchableOpacity
      style={styles.containers}
      onPress={() => {
        if (typeof clickFn === 'function') {
          clickFn();
        }
      }}
    >
        <Image source={CHAT_ICONS.plus} style={styles.img}/>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  containers: {
    position: 'absolute',
    right:wp(20),
    bottom: hp(20),
    backgroundColor: CHAT_COLORS.FLOAT_BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    width:hp(70),
    height:hp(70),
    borderRadius:50,
    shadowColor: 'rgba(0,0,0,0)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10.32,

    elevation: 5,
  },
  img:{
    resizeMode:'contain',
    width:hp(25),
    height:hp(25),
  }
});
