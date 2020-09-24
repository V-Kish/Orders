import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from '../Types';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {ICONS} from '../constants/icons';
import { HomeView } from '../View/HomeView/HomeView';
import { GetOrderInfo } from '../functions/GetOrderInfo';
export const HomeScreen = () => {
  const dispatch = useDispatch();
  const listCurrencies = useSelector(
    (state: reduxTypes) => state.dictionaries.listCurrencies,
  );
  const listDepartmentGroup = useSelector(
    (state: reduxTypes) => state.dictionaries.listDepartmentGroup,
  );
  const listDepartments = useSelector(
    (state: reduxTypes) => state.dictionaries.listDepartments,
  );
  const operationTypes = useSelector(
    (state: reduxTypes) => state.dictionaries.operationTypes,
  );
  const ordersStatus = useSelector(
    (state: reduxTypes) => state.dictionaries.ordersStatus,
  );
  const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
  const orderDataCount = useSelector(
    (state: reduxTypes) => state.dictionaries.orderDataCount,
  );
  console.log('listCurrencies', listCurrencies);
  console.log('listDepartmentGroup', listDepartmentGroup);
  console.log('listDepartments', listDepartments);
  console.log('operationTypes', operationTypes);
  console.log('ordersStatus', ordersStatus);
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
