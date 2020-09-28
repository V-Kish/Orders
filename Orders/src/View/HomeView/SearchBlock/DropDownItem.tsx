import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  mockupHeightToDP as hp,
} from '../../../constants/Dimensions';
import {COLORS} from '../../../constants/colors';
import { OrderStatus } from '../../Components/OrderStatus';
import { statusToType } from '../../../helpers/StatusToType';

export const DropDownItem = ({item, changeStatus, activeStatus, text = 'Тільки статус'}) => {
    const isActive = activeStatus.id === item.id
    const handlePress = () => {
        changeStatus(item)
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
                <Text style={styles.text}>{text}</Text>
            </View>
            <OrderStatus type={statusToType(item.id)}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: hp(20),
    marginBottom: hp(30),
      zIndex:99999,
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
  },
  dropDown: {
    position: 'absolute',
    top: hp(70),
    right: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    overflow: 'hidden',
    height: 0,
    zIndex: 999999,
  },
  dropDownShowed: {
    height: Dimensions.get('screen').height,
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
    fontSize: hp(16),
    color: COLORS.FONT_BLACK,
  },
});
