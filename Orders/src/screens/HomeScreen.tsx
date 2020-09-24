import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {navigator} from '../Core/Navigator';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from '../Types';
export const HomeScreen = () => {
  const dispatch = useDispatch();
    const listCurrencies  = useSelector((state: reduxTypes) => state.dictionaries.listCurrencies);
    const listDepartmentGroup  = useSelector((state: reduxTypes) => state.dictionaries.listDepartmentGroup);
    const listDepartments  = useSelector((state: reduxTypes) => state.dictionaries.listDepartments);
    const operationTypes  = useSelector((state: reduxTypes) => state.dictionaries.operationTypes);
    const ordersStatus  = useSelector((state: reduxTypes) => state.dictionaries.ordersStatus);
    console.log('listCurrencies',listCurrencies)
    console.log('listDepartmentGroup',listDepartmentGroup)
    console.log('listDepartments',listDepartments)
    console.log('operationTypes',operationTypes)
    console.log('ordersStatus',ordersStatus)
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigator().changeNavigationStateAuth(true, dispatch)}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};
