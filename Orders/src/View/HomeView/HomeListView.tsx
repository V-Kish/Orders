import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {reduxTypes} from '../../Types';
import {OrderItem} from './OrderItem/OrderItem';
import {COLORS} from "../../constants/colors";
import {mockupHeightToDP as hp} from "../../constants/Dimensions";

export const HomeListView = () => {
  const ordersArray = useSelector((state: reduxTypes) => state.dictionaries.ordersArray);
console.log('ordersArray',ordersArray)
  return (
    <View style={styles.container}>
      {ordersArray &&
      ordersArray.map((item: any) => {
          return <OrderItem key={item.system.orderNum} item={item} />
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
