import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectedDepartment} from '../../store/actions/EditUserInfo';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {reduxTypes} from '../../Types';
import {COLORS} from '../../constants/colors';

export const SelectDepartmentInput = ({switchDepartmentModal}) => {
  const selectedDepartments: Array<any> = useSelector(
    (state: reduxTypes) => state.dictionaries.selectedDepartments,
  );

  return (
    <TouchableOpacity onPress={switchDepartmentModal} style={styles.change}>
      <Text style={styles.textDepart}>{selectedDepartments.name}</Text>
      <View style={styles.triangle} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  change: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    flexDirection: 'row',
    borderBottomWidth: hp(2),
    borderBottomColor: COLORS.FONT_GRAY_WHITE,
  },
  textDefaultSecond: {
    fontSize: hp(18),
  },
  textDepart: {
    fontSize: hp(18),
    paddingVertical: hp(10),
  },
  triangle: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: wp(6),
    borderRightWidth: wp(6),
    borderBottomWidth: wp(6),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.TEXT_DONE,
    transform: [{rotate: '180deg'}],
    zIndex: 2,
    height: hp(15),
    marginTop: hp(10),
    //width: '100%',
  },
});
