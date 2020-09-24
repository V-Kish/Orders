import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OperationType } from './OperationType';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../../constants/Dimensions';
import { reduxTypes } from '../../../Types';
import { OrderSystemInfo } from './OrderSystemInfo';
import { GetOrderInfo } from '../../../functions/GetOrderInfo';
import { OrderMainInfo } from './OrderMainInfo';
import { statusToType } from '../../../helpers/StatusToType';

export const OrderItem = ({item}) => {
    const dispatch = useDispatch()
    const listCurrencies = useSelector(
        (state: reduxTypes) => state.dictionaries.listCurrencies,
      );
    item.detail.currencyCode = listCurrencies.find(
        (currency) => currency.id === item.detail.currencyId,
      ).code;
    item.detail.currencyToCode = listCurrencies.find(
        (currency) => currency.id === item.detail.currencyToId,
    ).code;
  item.system.type = statusToType(item.system.status)
  const handleItemPress = () => {
    GetOrderInfo.getOrder(dispatch,item)
  }
  return (
    <TouchableOpacity onPress={handleItemPress} activeOpacity={0.9}>
        <View style={{...styles.container, ...styles[`${item.system.type}`]}}>
            <OperationType item={item}/>
            <OrderMainInfo item={item}/>
            <OrderSystemInfo item={item}/>
        </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: wp(5),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
    },
    new: {
        backgroundColor: '#F5FFF9'
    },
    reject: {
        backgroundColor: '#F2F2F2',
        opacity: 0.5,
    },
})
