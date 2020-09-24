import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { useSelector } from 'react-redux';

export const HomeListView = () => {
    const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
    console.log('orders', orders)
  return (
    <View style={styles.container}>
        
    </View>
  );
};


const styles = StyleSheet.create({
    container: {

    }
})
