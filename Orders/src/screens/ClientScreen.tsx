import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ICONS} from '../constants/icons';
import {COLORS} from '../constants/colors';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {OrderUserView} from '../View/OrderView/OrderUserView';
import {mockupHeightToDP as hp} from '../constants/Dimensions';
import {orderDataTypes, reduxTypes} from '../Types';
import {useSelector} from 'react-redux';
import {navigator} from '../Core/Navigator';
import { CustomerDetails } from '../View/Customers/CustomerDetails';

export const ClientScreen = () => {
  function goBack() {
    navigator().toGoBack();
  }
  return (
    <View style={styles.container}>
      <HeaderView
        icon={ICONS.arrowBackWhite}
        title="Клієнт"
        color={COLORS.HEADER_BLUE}
        // desc={orderData.system.orderNum}
        ordersSettings={true}
        onPress={goBack}
      />
      <View style={styles.mainContainer}>
            <CustomerDetails />
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
