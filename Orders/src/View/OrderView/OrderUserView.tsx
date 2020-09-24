import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {ButtonView} from './ButtonView';
import {useSelector} from 'react-redux';
import {reduxTypes, userDataTypes, orderDataTypes} from '../../Types';
export const OrderUserView = () => {
  const userData: userDataTypes = useSelector(
    (state: reduxTypes) => state.ditUser.editUser,
  );
  const orderData: orderDataTypes = useSelector(
    (state: reduxTypes) => state.dictionaries.orderData,
  );
  const selectedDepartments: Array<any> = useSelector(
      (state: reduxTypes) => state.dictionaries.selectedDepartments,
  );
  console.log('userKISH', userData);
  console.log('userKISH orderData', orderData);
  console.log('userKISH selectedDepartments', selectedDepartments);
  return (
    <View>
      <View style={styles.blockContainer}>
        <View style={styles.containers}>
          <Text style={styles.textDefault}>Клієнт: </Text>
          <Text style={styles.userName}>{userData.user.name}</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefault}>Номер карти: </Text>
          <Text style={styles.userCard}>{userData.cards[0]?.number}</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefault}>Номер телефону: </Text>
          <Image source={ICONS.phoneIcon} style={styles.imgPhone} />
          <Text style={styles.userPhone}>{userData.user.phone}</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefault}>Операція обміну: </Text>
          <Text style={styles.operationType}>
            {orderData.detail.operationType === 'buy' ? 'Продаж' : 'Купівля'}
          </Text>
        </View>
      </View>
      <View style={styles.blockContainer}>
        <View style={styles.containers}>
          <Text style={styles.textDefaultSecond}>До отримання: </Text>
          <Text style={styles.money}>100 {orderData.detail.currencyCode} доробити</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefaultSecond}>Курс операції: </Text>
          <Text style={styles.money}>{orderData.detail.rate}</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefaultSecond}>До видачі: </Text>
          <Text style={styles.money}>3345.00 {orderData.detail.currencyToCode}доробити</Text>
        </View>
      </View>
      <View style={styles.lastBlock}>
        <View style={styles.containers}>
          {orderData.system.status === 3 && (
            <>
              <Text style={styles.textDefaultSecond}>Відділення: </Text>
              <Text style={styles.department}>{selectedDepartments[0].name}</Text>
            </>
          )}
          {orderData.system.status === 3 && (
            //Жека в'єби тернар
            <></>
          )}
        </View>
      </View>
      <View style={styles.containerButtons}>
        <ButtonView
          title={'Відхилити'}
          color={COLORS.HEADER_RED}
          textColor={'white'}
        />
        <View style={{width: wp(20)}} />
        {orderData.system.status === 3 && (
          <ButtonView
            title={'Взяти в роботу'}
            color={COLORS.BUTTON_LIGHT_GREEN}
            textColor={'white'}
          />
        )}
        {orderData.system.status === 2 && (
          <ButtonView
            title={'Відправити на видачу'}
            color={COLORS.BUTTON_BUY_SALE_YELLOW}
            textColor={'black'}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(10),
  },
  blockContainer: {
    marginTop: hp(25),
    borderBottomWidth: hp(2),
    borderBottomColor: COLORS.FONT_GRAY_WHITE,
    paddingHorizontal: wp(5),
  },
  lastBlock: {
    marginTop: hp(25),
    paddingHorizontal: wp(5),
  },
  textDefault: {
    fontSize: hp(18),
  },
  textDefaultSecond: {
    fontSize: hp(18),
  },
  userName: {
    fontSize: hp(22),
    fontWeight: 'bold',
  },
  userCard: {
    fontSize: hp(22),
  },
  imgPhone: {
    resizeMode: 'contain',
    height: hp(15),
    width: wp(15),
    marginHorizontal: wp(5),
  },
  userPhone: {
    fontSize: hp(22),
    color: COLORS.HEADER_BLUE,
    textDecorationLine: 'underline',
  },
  operationType: {
    fontSize: hp(22),
    fontWeight: 'bold',
  },
  money: {
    fontSize: hp(22),
    fontWeight: 'bold',
  },
  department: {
    fontSize: hp(22),
    fontWeight: 'bold',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(75),
  },
});
