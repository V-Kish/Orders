import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../../constants/Dimensions';
import { reduxTypes } from '../../../Types';
import { OrderStatus } from '../../Components/OrderStatus'
import { convertToUTCString, dateParse, dateTimeToDateString, dateTimeToTimeString } from '../../../helpers/DateParse';

export const OrderSystemInfo = ({item}) => {
  return (<View style={styles.orderInfoView}>
            <View style={styles.orderInfoDates}>
                <Text style={styles.orderDate}>{dateTimeToDateString(
                        dateParse(convertToUTCString(item.system.statusDate)))}</Text>
                <Text style={styles.orderDate}>{dateTimeToTimeString(
                        dateParse(convertToUTCString(item.system.statusDate)))}</Text>
            </View>
            <OrderStatus type="new"/>
        </View>
  );
};


const styles = StyleSheet.create({
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
