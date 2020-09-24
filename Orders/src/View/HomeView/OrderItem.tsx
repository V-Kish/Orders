import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { useSelector } from 'react-redux';
import { OperationType } from './OperationType';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { reduxTypes } from '../../Types';
import { OrderStatus } from '../Components/OrderStatus'

export const OrderItem = ({item}) => {
    const listCurrencies = useSelector(
        (state: reduxTypes) => state.dictionaries.listCurrencies,
      );
    item.detail.currencyIdCode = listCurrencies.find(
        (currency) => currency.id === item.detail.currencyId,
      ).code;
    item.detail.currencyToIdCode = listCurrencies.find(
        (currency) => currency.id === item.detail.currencyToId,
    ).code;

  return (
    <View style={styles.container}>
        <OperationType type={item.detail.operationType}/>
        <View style={styles.orderMainView}>
            <View style={styles.orderNumberView}>
                <Text style={styles.orderNumber}>031231-123123-</Text>
                <Text style={styles.orderNumberBold}>12312312</Text>
            </View>
            <View style={styles.exchangeOperationView}>
                <Text style={styles.operationValueText}> EUR</Text>
                <Text style={styles.operationArrow}>{`>`}</Text>
                <Text style={styles.operationValueText}>3200 UAH</Text>
            </View>
        </View>
        <View style={styles.orderInfoView}>
            <Text style={styles.orderDate}>12.42.2132</Text>
            <Text style={styles.orderDate}>12:23:34</Text>
            <OrderStatus type="wait"/>
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: wp(5)
    },


    orderMainView: {
        width: '60%',
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
        // backgroundColor: 'red'
    },
    orderDate: {
        fontSize: wp(12),
        textAlign: "right"
    },
    orderStatus: {

    }

})
