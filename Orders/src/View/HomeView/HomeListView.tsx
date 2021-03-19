import React from 'react';
import {StyleSheet,  View} from 'react-native';
import {useSelector} from 'react-redux';
import {reduxTypes} from '../../Types';
import {OrderItem} from './OrderItem/OrderItem';

export const HomeListView = () => {
  const ordersArray = useSelector((state: reduxTypes) => state.dictionaries.ordersArray);

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
