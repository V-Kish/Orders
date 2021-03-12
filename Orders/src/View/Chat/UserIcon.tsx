import React  from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {IconHelper} from '../../Common/HelperIcon';
import {COLORS} from '../../constants/colors';

export const UserIcon = ({item, diameter}) => {
  return (
    <View
      style={[
        IconHelper.getColor(item.clientName),
        IconHelper.iconDiameter(diameter),
        styles.containers,
      ]}>
      <Text style={{color: 'white'}}>
        {IconHelper.character(item.clientName)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  containers: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIcon: {
    fontSize: hp(16),
    color: COLORS.FONT_WHITE,
  },
});
