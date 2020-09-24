import React from 'react';
import {View, StyleSheet} from 'react-native';
import { useSelector} from 'react-redux';
import {reduxTypes} from '../Types';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {ICONS} from '../constants/icons';
import { HomeView } from '../View/HomeView/HomeView';
export const HomeScreen = () => {
  const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
  const orderDataCount = useSelector(
    (state: reduxTypes) => state.dictionaries.orderDataCount,
  );
  console.log('orders', orders);

  return (
    <>
      <HeaderView
        icon={ICONS.logoSmall}
        title="Робота з замовленнями"
        desc={`Нових замовлень: `}
        counter={`${orderDataCount}`}
      />
      <View style={styles.container}>
        <HomeView/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,1)',
    flex:1
  },
});
