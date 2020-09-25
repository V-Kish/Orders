import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {OrderItem} from './OrderItem/OrderItem';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { reduxTypes } from '../../Types';
export const HomeListView = () => {
  const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
  const searchParam = useSelector((state: reduxTypes) => state.ditUser.searchParam);
  console.log('searchParam', searchParam);
  const loadDataMore = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 500;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <ScrollView
      onScroll={({nativeEvent}) => {
        if (loadDataMore(nativeEvent)) {
       //load more
        }
      }}>
      <View style={styles.container}>
        {orders.Items &&
          orders.Items.map((item: any) => {
            return <OrderItem key={item.system.orderNum} item={item} />;
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp(80),
  },
});
