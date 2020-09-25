import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ICONS} from '../constants/icons';
import {COLORS} from '../constants/colors';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {OrderUserView} from '../View/OrderView/OrderUserView';
import {mockupHeightToDP as hp} from '../constants/Dimensions';
import {orderDataTypes, reduxTypes} from '../Types';
import {useSelector} from 'react-redux';
import {navigator} from '../Core/Navigator';
export const OrderScreen = () => {
  const orderData: orderDataTypes = useSelector(
    (state: reduxTypes) => state.dictionaries.orderData,
  );
  function goBack() {
    navigator().toGoBack();
  }
  return (
    <View style={styles.container}>
      <HeaderView
        icon={ICONS.arrowBackWhite}
        title="Замовлення"
        color={COLORS.HEADER_BLUE}
        desc={orderData.system.orderNum}
        ordersSettings={true}
        onPress={goBack}
      />
      <View style={styles.mainContainer}>
        <OrderUserView />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: hp(10),
  },
});
