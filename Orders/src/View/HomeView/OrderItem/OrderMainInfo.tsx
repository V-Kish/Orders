import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {
  convertToUTCString,
  dateParse,
  dateTimeToDateString,
  dateTimeToTimeString,
} from '../../../helpers/DateParse';
import {statusToType} from '../../../helpers/StatusToType';

export const OrderMainInfo = ({item}) => {
  const type = item.system.type;
  // order number split
  const orderNum = item.system.orderNum.split('-');
  const orderAllNumber = `${orderNum[0]}-${orderNum[1]}-`;
  const orderBoldNumber = orderNum[2];

  let showCourceAndCity = true;
  let showDepartmentPoint = false;
  let showTime = false;
  switch (type) {
    case 'new':
      break;
    case 'accept':
      break;
    case 'wait':
      showCourceAndCity = false;
      showDepartmentPoint = true;
      showTime = true;
      break;
    case 'reject':
      break;
    case 'done':
      showCourceAndCity = false;
      showDepartmentPoint = true;
      showTime = true;
      break;
  }
  return (
    <View style={styles.orderMainView}>
      {/* order num info  */}
      <View style={styles.orderNumberView}>
        <Text style={styles.orderNumber}>{`${orderAllNumber}`}</Text>
        <Text style={styles.orderNumberBold}>{orderBoldNumber}</Text>
      </View>
      {/* operation info */}
      <View style={styles.exchangeOperationView}>
        <Text
          style={
            styles.operationValueText
          }>{`${item.detail.sum} ${item.detail.currencyCode}`}</Text>
        <Text style={styles.operationArrow}>{'>'}</Text>
        <Text style={styles.operationValueText}>{`${item.detail.sumTo} ${item.detail.currencyToCode}`}</Text>
      </View>
      {/* course and city  */}
      {showCourceAndCity && (
        <View style={styles.courseAndCityView}>
          <View style={styles.courseView}>
            <Text style={styles.courseTitle}>Курс:</Text>
            <Text style={styles.courseContent}>{item.detail.rate}</Text>
          </View>
          <View style={styles.cityView}>
            <Text style={styles.cityText}>Міжгір'я</Text>
          </View>
        </View>
      )}
      {showDepartmentPoint && (
        <View style={styles.placeView}>
          <Text style={styles.placeTitle}>точка видачі:</Text>
          <Text style={styles.placeContent}>{item.detail.departmentName}</Text>
        </View>
      )}
      {showTime && (
        <View style={styles.timeView}>
          <Text style={styles.timeTitle}>час:</Text>
          <Text style={styles.timeContent}>{`${dateTimeToTimeString(
            dateParse(convertToUTCString(item.system.statusDate)),
          )} ${dateTimeToDateString(
            dateParse(convertToUTCString(item.system.statusDate)),
          )}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderMainView: {
    width: '60%',
    paddingVertical: hp(10),
  },
  orderNumberView: {
    flexDirection: 'row',
    paddingVertical: hp(5),
  },
  orderNumber: {
    fontSize: wp(12),
  },
  orderNumberBold: {
    fontSize: wp(12),
    fontWeight: 'bold',
  },

  exchangeOperationView: {
    flexDirection: 'row',
    paddingVertical: hp(5),
  },
  operationValueText: {
    fontSize: wp(20),
  },
  operationArrow: {
    paddingHorizontal: wp(5),
    fontSize: wp(20),
  },

  orderInfoView: {
    width: '20%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: hp(10),
    // backgroundColor: 'red'
  },
  orderInfoDates: {
    alignItems: 'flex-end',
  },
  orderDate: {
    fontSize: wp(12),
    textAlign: 'right',
  },
  orderStatus: {},

  courseAndCityView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: hp(5),
  },
  courseView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: wp(15),
  },
  courseContent: {
    fontSize: wp(15),
    paddingHorizontal: wp(5),
    fontWeight: 'bold',
  },
  cityView: {},
  cityText: {},

  placeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeTitle: {
    fontSize: wp(15),
  },
  placeContent: {
    fontSize: wp(15),
    paddingHorizontal: wp(5),
    fontWeight: 'bold',
  },

  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeTitle: {
    fontSize: wp(15),
  },
  timeContent: {
    fontSize: wp(15),
    paddingHorizontal: wp(5),
    fontWeight: 'bold',
  },
});
