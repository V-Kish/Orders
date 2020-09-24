import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { useSelector } from 'react-redux';
import { OrderItem } from './OrderItem';

export const HomeListView = () => {
    const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
    console.log('orders', orders)
  return (
    <View style={styles.container}>
        {orders.Items && orders.Items.map((item: any)=>{
            return <OrderItem key={item.system.orderNum} item={item}/>
        })}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,1)',
    }
})
