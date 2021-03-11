import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {COLORS} from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectedDepartment } from '../../store/actions/EditUserInfo';

export const ListItem = ({
    item = {id: 0, text: ''},
    setItem = (item) => {},
}) => {
        const dispatch = useDispatch()
        // const selectedDepartmentSelector = useSelector(
        //     (state: reduxTypes) => state.ditUser.selectedDepartment,
        // );
        const isActive = selectedDepartmentSelector.id === item.id
        const handlePress = () => {
            dispatch(selectedDepartment(item))
            setItem(item)
        }
    return (
        <TouchableOpacity
         style={styles.container}
         activeOpacity={0.9}
         onPress={handlePress}
        >
            <View style={styles.wrapCircle}>
                <View
                style={[styles.circle, {borderColor: isActive ? COLORS.STATUS_BLUE : COLORS.STATUS_GRAY}]}>
                    <View style={isActive ? styles.circleActive : styles.circleDisable} />
                </View>
            </View>
            <View style={styles.wrapText}>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp(20),
    marginBottom: hp(30),
  },
  containerList: {
    //backgroundColor: 'red',
    backgroundColor: 'rgba(255,255,255,1)',
    paddingTop:hp(20),
  },
  wrapCircle: {
    marginRight: hp(15),
  },
  wrapText: {
    marginRight: hp(15),
      width:'85%'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 3,
    width: hp(26),
    height: hp(26),
    // backgroundColor:'red'
  },
  circleActive: {
    borderRadius: 100,
    width: hp(15),
    height: hp(15),
    backgroundColor: COLORS.HEADER_BLUE,
  },
  circleDisable: {
    display: 'none',
  },
  text: {
    fontSize: hp(24),
    color: COLORS.FONT_BLACK,
  },
});
