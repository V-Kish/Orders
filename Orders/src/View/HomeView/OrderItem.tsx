import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { useSelector } from 'react-redux';
import { OperationType } from './OperationType';

export const OrderItem = ({item}) => {
  return (
    <View style={styles.container}>
        <OperationType type={item.detail.operationType}/>
        <View style={styles.orderMainView}>
            {/* <Text>list</Text> */}
        </View>
        <View style={styles.orderInfoView}>

        </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    orderMainView: {
        width: '60%',
        backgroundColor: 'red'
    },
    orderInfoView: {
        width: '20%',
        backgroundColor: 'yellow'
    }
})
