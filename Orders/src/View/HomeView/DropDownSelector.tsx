import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Animated} from 'react-native';
import { HomeListView } from './HomeListView';
import { SearchContainer } from './SearchContainer';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { useSelector } from 'react-redux';

export const DropDownSelector = ({dropdown}) => {
    const ordersStatus = useSelector(
        (state: reduxTypes) => state.dictionaries.ordersStatus,
      );
  return (
    <Animated.View style={dropdown ? {...styles.dropDown, ...styles.dropDownShowed } : styles.dropDown}>
        {ordersStatus && ordersStatus.map(item=>{
            return <Text key={item.id}>{item.name}</Text>
        })}
    </Animated.View>
  );
};


const styles = StyleSheet.create({
    container: {

    },
    dropDown: {
        position: 'absolute',
        top: hp(100),
        right:0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
        overflow: 'hidden',
        height: 0,
        zIndex: 999999
    },
    dropDownShowed: {
        height: Dimensions.get('screen').height
    }
})
