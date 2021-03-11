import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React  from 'react';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';

export const DrawerButtonComponent = ({
  imgURL,
  text,
  onPress,
  imgStyles = false,
  additionalTextStyle = false,
  additionalContainerStyle = null,
  padding = null,
}) => {
  return (
    <View
      style={[
        styles.containerItem,
        additionalContainerStyle,
        padding !== null ? { paddingBottom: padding } : null,
      ]}>
      <TouchableOpacity onPress={() => onPress()} style={styles.itemNav}>
        <View style={styles.imageBackCircle}>
          <Image source={imgURL} style={[imgStyles ? imgStyles : null]} />
        </View>
        <Text
          style={[
            styles.itemText,
            additionalTextStyle ? additionalTextStyle : null,
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    paddingBottom: hp(28),
    flex: 1
  },
  itemNav: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },

  itemText: {
    paddingTop: hp(3),
    // paddingLeft: wp(15),
    fontFamily: 'Roboto-Regular',
    fontSize: hp(10),
    color: COLORS.WHITE.bg,
  },
  imageBackCircle: {
    borderRadius: 50,
    backgroundColor: COLORS.FONT_WHITE,
    overflow: 'hidden',
    width: wp(30),
    height: wp(30),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
