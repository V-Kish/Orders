import React, { useState } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {ButtonView} from './ButtonView';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes, userDataTypes, orderDataTypes} from '../../Types';
import { CustomModal } from '../Modal/CustomModal';
import { SelectDepartmentInput } from './SelectDepartmentInput'
import { selectedItemDep } from '../../store/actions/Dictionaries';
import { selectedDepartment } from '../../store/actions/EditUserInfo';
export const OrderUserView = () => {
  const dispatch = useDispatch()
  const userData: userDataTypes = useSelector(
    (state: reduxTypes) => state.ditUser.editUser,
  );
  const orderData: orderDataTypes = useSelector(
    (state: reduxTypes) => state.dictionaries.orderData,
  );
  const selectedDepartments: Array<any> = useSelector(
      (state: reduxTypes) => state.dictionaries.selectedDepartments,
  );
  
  // modals visible
  const [modalRejectVisible, setModalRejectVisible] = useState(false)
  const [modalSendOnWorkVisible, setModalSendOnWorkVisible] = useState(false)
  const [modalDepartmentVisible, setModalDepartmentVisible] = useState(false)

  // departments list 
  const departmentList = useSelector(
    (state: reduxTypes) => state.dictionaries.listDepartments,
  );
  const preparedList = departmentList.map(d=>{
      return {id: d.id, text: d.name}
  })
  // switch visible modals
  const switchRejectModal = () => {
    setModalRejectVisible(!modalRejectVisible)
  }
  const switchSendOnWorkModal = () => {
    setModalSendOnWorkVisible(!modalSendOnWorkVisible)
  }
  const switchDepartmentModal = () => {
    dispatch(selectedDepartment({id: selectedDepartments.id, text: selectedDepartments.name}))
    setModalDepartmentVisible(!modalDepartmentVisible)
  }

  // confirm modals actions
  const onModalRejectConfirm = (text) =>{
    setModalRejectVisible(!modalRejectVisible)
    console.log('reject confirm', text)
  }

  const onModalSendOnWorkConfirm = () =>{
    setModalSendOnWorkVisible(!modalSendOnWorkVisible)
    console.log('send on work confirm')
  }

  const onDepartmentConfirm = (item) =>{
    setModalDepartmentVisible(!modalDepartmentVisible)
    console.log('selected', item)
    dispatch(selectedItemDep(item.id))
  }
  
  const getInWorkButtonPress = () => {
    console.log('getOnWork press')
  }
  
  return (
    <View>
      <CustomModal
        type="FORM"
        modalVisible={modalRejectVisible}
        changeModalVisible={switchRejectModal}
        confirmAction={onModalRejectConfirm}
        title="Скасування заявки"
        inputs={[
          {
              text: "Вкажіть причину скасування",
              placeholder: "Введіть причину",
          }
        ]}
      />
      <CustomModal 
        type="CONFIRM"
        modalVisible={modalSendOnWorkVisible}
        changeModalVisible={switchSendOnWorkModal}
        confirmAction={onModalSendOnWorkConfirm}
        title="Відправити заявку на видачу"
        content={`При відправці заявки на видачу - клієнту буде надіслано сповіщення з інформацією де, 
        як і коли він зможе здійснити операцію. \r\n
        Ви впевнені що заявку потрібно перевести в статус “Видача”?`}
      />
      <CustomModal 
        type="LIST"
        modalVisible={modalDepartmentVisible}
        changeModalVisible={switchDepartmentModal}
        confirmAction={onDepartmentConfirm}
        title="Зміна відділення видачі"
        list={preparedList}
      />
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
          <Text style={styles.money}>{`${orderData.detail.sum} ${orderData.detail.currencyCode}`}</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefaultSecond}>Курс операції: </Text>
          <Text style={styles.money}>{orderData.detail.rate}</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefaultSecond}>До видачі: </Text>
          <Text style={styles.money}>{`${orderData.detail.sumTo} ${orderData.detail.currencyToCode}`}</Text>
        </View>
      </View>
      <View style={styles.lastBlock}>
        <View style={styles.containers}>
          {orderData.system.status === 1 && (
            <>
              <Text style={styles.textDefaultSecond}>Відділення: </Text>
              <Text style={styles.department}>{selectedDepartments.name}</Text>
            </>
          )}
          {orderData.system.status === 2 && (
            <SelectDepartmentInput
              switchDepartmentModal={switchDepartmentModal}
            />
          )}
          {orderData.system.status === 3 && (
            <SelectDepartmentInput
              switchDepartmentModal={switchDepartmentModal}
            />
          )}
        </View>
      </View>
      <View style={styles.containerButtons}>
        <ButtonView
          title={'Відхилити'}
          color={COLORS.HEADER_RED}
          textColor={'white'}
          onPress={switchRejectModal}
        />
        <View style={{width: wp(20)}} />
        {orderData.system.status === 1 && (
          <ButtonView
            title={'Взяти в роботу'}
            color={COLORS.BUTTON_LIGHT_GREEN}
            textColor={'white'}
            onPress={getInWorkButtonPress}
          />
        )}
        {orderData.system.status === 2 && (
          <ButtonView
            title={'Відправити на видачу'}
            color={COLORS.BUTTON_BUY_SALE_YELLOW}
            textColor={'black'}
            onPress={switchSendOnWorkModal}
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
