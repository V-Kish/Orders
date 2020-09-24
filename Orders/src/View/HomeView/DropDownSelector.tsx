import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import {HomeListView} from './HomeListView';
import {SearchContainer} from './SearchContainer';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants/colors';
import { OrderStatus } from '../Components/OrderStatus';

export const DropDownSelector = ({dropdown}) => {
  const ordersStatus = useSelector(
    (state: reduxTypes) => state.dictionaries.ordersStatus,
  );
  return (
    <Animated.View
      style={
        dropdown
          ? {...styles.dropDown, ...styles.dropDownShowed}
          : styles.dropDown
      }>
      <View style={styles.containerList}>
        {ordersStatus &&
          ordersStatus.map((item) => {
            return (
              <View key={item.id} style={styles.container}>
                <View style={styles.wrapCircle}>
                  <View
                    style={[styles.circle, {borderColor: COLORS.HEADER_BLUE}]}>
                    <View style={styles.circleActive} />
                  </View>
                </View>
                <View style={styles.wrapText}>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
                  <OrderStatus type="done"/>
              </View>
            );
          })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
