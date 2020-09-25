import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {OperationType} from './OperationType';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {reduxTypes} from '../../../Types';
import {OrderSystemInfo} from './OrderSystemInfo';
import {GetOrderInfo} from '../../../functions/GetOrderInfo';
import {OrderMainInfo} from './OrderMainInfo';
import {
  recalculateSumResult,
  statusToType,
} from '../../../helpers/StatusToType';
import {COLORS} from '../../../constants/colors';

export const OrderItem = ({item}) => {
  const dispatch = useDispatch();
  const listCurrencies = useSelector(
    (state: reduxTypes) => state.dictionaries.listCurrencies,
  );
  const listDepartments = useSelector(
    (state: reduxTypes) => state.dictionaries.listDepartments,
  );
  item.detail.currencyCode = listCurrencies.find(
    (currency) => currency.id === item.detail.currencyId,
  ).code;
  item.detail.currencyToCode = listCurrencies.find(
    (currency) => currency.id === item.detail.currencyToId,
  ).code;
  item.detail.departmentName = listDepartments.find(
    (department) => department.id === item.detail.departmentId,
  ).name;
  item.system.type = statusToType(item.system.status);
  item.detail.sumTo = recalculateSumResult(item);
  const handleItemPress = () => {
    GetOrderInfo.getOrder(dispatch, item);
  };
  return (
    <TouchableOpacity onPress={handleItemPress} activeOpacity={0.9} style={{paddingHorizontal:hp(10)}}>
      <View style={{...styles.container, ...styles[`${item.system.type}`]}}>
        <OperationType item={item} />
        <OrderMainInfo item={item} />
        <OrderSystemInfo item={item} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: wp(5),
    paddingRight:wp(10),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    borderBottomWidth: 2,
    borderColor: COLORS.TEXT_REJECT,
  },
  new: {
    backgroundColor: '#F5FFF9',
  },
  reject: {
    backgroundColor: '#F2F2F2',
    opacity: 0.5,
  },
});
