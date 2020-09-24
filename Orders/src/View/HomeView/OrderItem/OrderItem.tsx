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
  const orderNum = item.system.orderNum.split("-")
  const orderAllNumber = `${orderNum[0]}-${orderNum[1]}-`
  const orderBoldNumber = orderNum[2]
  
  const handleItemPress = () => {
    console.log('item',item)
    GetOrderInfo.getOrder(dispatch,item)
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleItemPress} activeOpacity={0.9}>
        <OperationType type={item.detail.operationType}/>
        <View style={styles.orderMainView}>
            <View style={styles.orderNumberView}>
                <Text style={styles.orderNumber}>{`${orderAllNumber}`}</Text>
                <Text style={styles.orderNumberBold}>{orderBoldNumber}</Text>
            </View>
            <View style={styles.exchangeOperationView}>
                <Text style={styles.operationValueText}>{`${item.detail.sum} ${item.detail.currencyCode}`}</Text>
                <Text style={styles.operationArrow}>{`>`}</Text>
                <Text style={styles.operationValueText}>{`${(item.detail.sum*item.detail.rate).toFixed(2)} ${item.detail.currencyToCode}`}</Text>
            </View>
        </View>
        <OrderSystemInfo item={item}/>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: wp(5)
    },


    orderMainView: {
        width: '60%',
        paddingVertical: hp(10)
    },
    orderNumberView: {
        flexDirection: 'row'
    },
    orderNumber: {
        fontSize: wp(12),
    },
    orderNumberBold: {
        fontSize: wp(12),
        fontWeight: 'bold'
    },

    exchangeOperationView: {
        flexDirection: 'row',

    },
    operationValueText: {
        
    },
    operationArrow: {
        paddingHorizontal: wp(5)
    },


    orderInfoView: {
        width: '20%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingVertical: hp(10)
        // backgroundColor: 'red'
    },
    orderInfoDates: {
        alignItems: 'flex-end'
    },
    orderDate: {
        fontSize: wp(12),
        textAlign: "right"
    },
    orderStatus: {

    }

})
