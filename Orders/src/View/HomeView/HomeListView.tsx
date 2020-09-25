import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {reduxTypes} from '../../Types';
import {OrderItem} from './OrderItem/OrderItem';

export const HomeListView = () => {
  const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);

  return (
    <View style={styles.container}>
      {orders.Items &&
        orders.Items.map((item: any) => {
          return <OrderItem key={item.system.orderNum} item={item} />;
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
  },
});
