import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {navigator} from '../Core/Navigator';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from "../Types";
export const HomeScreen = () => {
  const dispatch = useDispatch();
    const listCurrencies  = useSelector((state: reduxTypes) => state.dictionaries.listCurrencies);
    console.log('listCurrencies',listCurrencies)
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigator().changeNavigationStateAuth(true, dispatch)}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};
