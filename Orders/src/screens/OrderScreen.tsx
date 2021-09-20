import React, {useEffect, useState} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import {ICONS} from '../constants/icons';
import {COLORS} from '../constants/colors';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {OrderUserView} from '../View/OrderView/OrderUserView';
import {mockupHeightToDP as hp} from '../constants/Dimensions';
import {orderDataTypes, reduxTypes} from '../Types';
import {useSelector} from 'react-redux';
import {navigator} from '../Core/Navigator';
export const OrderScreen = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const orderData: orderDataTypes = useSelector(
    (state: reduxTypes) => state.dictionaries.orderData,
  );
  const [inputValue, setInputValue] = useState(''); // date

  function goBack() {
    navigator().toGoBack();
    setInputValue('');
  }
  function handleBackButtonClick() {
    setInputValue('');
    return false;
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
        <OrderUserView setInputValue={setInputValue} inputValue={inputValue} />
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
