import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {COLORS} from '../../constants/colors';
import { OrderStatus } from '../Components/OrderStatus';
import { statusToType } from '../../helpers/StatusToType';

export const ListItem = ({
    item = {id: 0, text: ''}, 
    changeActiveItem = (item) => {}, 
    activeItem = {id: -1}
}) => {
    const isActive = activeItem.id === item.id
    const handlePress = () => {
        changeActiveItem(item)
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
