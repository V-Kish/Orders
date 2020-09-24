import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { OrderItem } from './OrderItem/OrderItem';

export const HomeListView = () => {
    const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
    console.log('orders', orders)
  return (

    <ScrollView>
        <View style={styles.container}>
            {orders.Items && orders.Items.map((item: any)=>{
                return <OrderItem key={item.system.orderNum} item={item}/>
            })}
        </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
    }
})
