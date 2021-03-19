import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  TextInput,
  Platform,
  Button,
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {ICONS, CHAT_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {ButtonView} from './ButtonView';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes, userDataTypes, orderDataTypes} from '../../Types';
import {CustomModal} from '../Modal/CustomModal';
import {SelectDepartmentInput} from './SelectDepartmentInput';
import {
  getOrdersCount,
  selectedItemDep,
} from '../../store/actions/Dictionaries';
import {selectedDepartment} from '../../store/actions/EditUserInfo';
import {UserDataProvider} from '../../DataProvider/UserDataProvider';
import {MethodsRequest} from '../../DataProvider/MethodsRequest';
import {navigator} from '../../Core/Navigator';
import {GetOrderInfo} from '../../functions/GetOrderInfo';
import {AvoidScrollView} from '../Components/AvoidScrollView';
import {dateParse, dateTimeToTimeString, dateTimeToTimeStringDatePick} from '../../helpers/DateParse';
export const OrderUserView = () => {
  const dispatch = useDispatch();

  // Dictionary settings array
  const maxMinutes = useSelector(
      (state: reduxTypes) => state.start.maxMinutes,
  );
  const minMinutes = useSelector(
      (state: reduxTypes) => state.start.minMinutes,
  );
  //

  const [disabledBtn, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');  // date
  // from
  // plus 12 hours
  const [dateFrom, setDateFrom] = useState(new Date(new Date().setHours(0,parseInt(minMinutes[0].value),0)));
  const [showFrom, setShowFrom] = useState(false);
  let minutes = dateFrom.getHours() * 60 + dateFrom.getMinutes();
  //



  const userData: userDataTypes = useSelector(
    (state: reduxTypes) => state.ditUser.editUser,
  );
  const orderData: orderDataTypes = useSelector(
    (state: reduxTypes) => state.dictionaries.orderData,
  );
  const selectedDepartments: Array<any> = useSelector(
    (state: reduxTypes) => state.dictionaries.selectedDepartments,
  );
  const searchParamSelector = useSelector(
    (state: reduxTypes) => state.ditUser.searchParam,
  );
  // modals visible
  const [modalRejectVisible, setModalRejectVisible] = useState(false);
  const [modalSendOnWorkVisible, setModalSendOnWorkVisible] = useState(false);
  const [modalDepartmentVisible, setModalDepartmentVisible] = useState(false);

  // departments list
  const departmentList = useSelector(
    (state: reduxTypes) => state.dictionaries.listDepartments,
  );
  const preparedList = departmentList.map((d) => {
    return {id: d.id, text: d.name};
  });
  let operation = '';
  switch (orderData.detail.operationType) {
    case 'buy':
      operation = 'Продаж (Клієнт купує валюту)';
      break;
    case 'sale':
      operation = 'Купівля (Клієнт продає валюту)';
      break;
    case 'cross':
      operation = `Конвертація (${orderData.detail.currencyCode} => ${orderData.detail.currencyToCode})`;
      break;
  }
  // switch visible modals
  const switchRejectModal = () => {
    setModalRejectVisible(!modalRejectVisible);
  };
  const switchSendOnWorkModal = () => {
    setModalSendOnWorkVisible(!modalSendOnWorkVisible);
  };
  const switchDepartmentModal = () => {
    dispatch(
      selectedDepartment({
        id: selectedDepartments.id,
        text: selectedDepartments.name,
      }),
    );
    setModalDepartmentVisible(!modalDepartmentVisible);
  };

  // confirm modals actions
  const onModalRejectConfirm = async (text) => {
    setModalRejectVisible(!modalRejectVisible);
    const response = await MethodsRequest.changeStatusOrder(
      orderData.system.orderId,
      {orderStatusId: 4, comment: text},
    );
    if (response.statusCode === 200) {
      await GetOrderInfo.getOrders(
        dispatch,
        searchParamSelector.searchText,
        searchParamSelector.status.id,
      );
      navigator().navigate('HomeScreen');
      return;
    }
    Alert.alert(response.statusMessage);
  };

  const onModalSendOnWorkConfirm = async () => {
    setModalSendOnWorkVisible(!modalSendOnWorkVisible);
    const response = await MethodsRequest.changeStatusOrder(
      orderData.system.orderId,
      {orderStatusId: 3, comment: inputValue ? inputValue : '',waitTimeInMinutes:minutes},
    );
    if (response.statusCode === 200) {
      await GetOrderInfo.getOrders(
        dispatch,
        searchParamSelector.searchText,
        searchParamSelector.status.id,
      );
      navigator().navigate('HomeScreen');
      return;
    }
  };

  const onDepartmentConfirm = async (item) => {
    setModalDepartmentVisible(!modalDepartmentVisible);
    const response = await MethodsRequest.changeDepartmentOrder(
      orderData.system.orderId,
      {departmentId: item.id},
    );
    if (response.statusCode === 200) {
      dispatch(selectedItemDep(item.id));
    }
  };

  const getInWorkButtonPress = async () => {
    setDisabled(true);
    const response = await MethodsRequest.changeStatusOrder(
      orderData.system.orderId,
      {orderStatusId: 2, comment: ''},
    );
    if (response.statusCode === 200) {
      await GetOrderInfo.getOrders(
        dispatch,
        searchParamSelector.searchText,
        searchParamSelector.status.id,
      );
      const responseNumbers = await MethodsRequest.getOrdersNumber();
      if (responseNumbers.statusCode === 200) {
        dispatch(getOrdersCount(responseNumbers.result));
      }
      navigator().navigate('HomeScreen');
    }
    setDisabled(false);
  };
  console.log('minutes',minutes);


  const onChangeFrom = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowFrom(Platform.OS === 'ios');
      return;
    }
    const currentDate = selectedDate || date;
    let min =  currentDate.getHours() * 60 + currentDate.getMinutes()
    if (min  < parseInt(minMinutes[0].value)){
      Alert.alert('Увага',`Мінімальна кількість часу в хвилинах для проведення заявки: ${minMinutes[0].value}`);
      setShowFrom(Platform.OS === 'ios');
      return;
    }
    if (min  > parseInt(maxMinutes[0].value)){
      Alert.alert('Увага',`Максимальна кількість часу в хвилинах для проведення заявки: ${maxMinutes[0].value}`);
      setShowFrom(Platform.OS === 'ios');
      return;
    }
    setShowFrom(Platform.OS === 'ios');
    setDateFrom(currentDate);
  };
  const showModeFrom = () => {
    setShowFrom(true);
  };
  return (
    <AvoidScrollView>
      <CustomModal
        type="FORM"
        modalVisible={modalRejectVisible}
        changeModalVisible={switchRejectModal}
        confirmAction={onModalRejectConfirm}
        title="Скасування заявки"
        inputs={[
          {
            text: 'Вкажіть причину скасування',
            placeholder: 'Введіть причину',
          },
        ]}
      />
      <CustomModal
        type="CONFIRM"
        modalVisible={modalSendOnWorkVisible}
        changeModalVisible={switchSendOnWorkModal}
        confirmAction={onModalSendOnWorkConfirm}
        title="Відправити заявку на видачу"
        content={`При відправці заявки на видачу - клієнту буде надіслано сповіщення з інформацією де, як і коли він зможе здійснити операцію. 
        \r\nВи впевнені що заявку потрібно перевести в статус “Очікує”?`}
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
        <TouchableOpacity onPress={() => {
          navigator().navigate('ClientScreen');
        }} style={styles.containers}>
          <Text style={styles.textDefault}>Клієнт: </Text>
          <Text style={styles.userName}>{userData.user.name}</Text>
        </TouchableOpacity>
        <View style={styles.containers}>
          <Text style={styles.textDefault}>Номер карти: </Text>
          <Text style={styles.userCard}>{userData.cards[0]?.number}</Text>
        </View>
        <TouchableOpacity
          style={styles.containers}
          onPress={() => Linking.openURL(`tel:${userData.user.phone}`)}>
          <Text style={styles.textDefault}>Номер телефону: </Text>
          <Image source={CHAT_ICONS.detailsPhone} style={styles.imgPhone} />
          <Text style={styles.userPhone}>{userData.user.phone}</Text>
        </TouchableOpacity>
        <View style={styles.containers}>
          <Text style={styles.textDefault}>Операція обміну: </Text>
          <Text style={styles.operationType}>{operation}</Text>
        </View>
      </View>
      <View style={styles.blockContainer}>
        <View style={styles.containers}>
          <Text style={styles.textDefaultSecond}>До отримання: </Text>
          <Text
            style={
              styles.money
            }>{`${orderData.detail.sum} ${orderData.detail.currencyCode}`}</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefaultSecond}>Курс операції: </Text>
          <Text style={styles.money}>{orderData.detail.rate}</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.textDefaultSecond}>До видачі: </Text>
          <Text
            style={
              styles.money
            }>{`${orderData.detail.sumTo} ${orderData.detail.currencyToCode}`}</Text>
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
          {orderData.system.status === 3 && (
            <>
              <Text style={styles.textDefaultSecond}>Відділення: </Text>
              <Text style={styles.department}>{selectedDepartments.name}</Text>
            </>
          )}
          {orderData.system.status === 2 && (
            <View style={{width: '100%'}}>
              <Text style={styles.textDep}>Відділення отримання</Text>
              <SelectDepartmentInput
                switchDepartmentModal={switchDepartmentModal}
              />
            </View>
          )}
        </View>
      </View>
      {orderData.system.status === 2 && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Термій дії</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.dateBtn, {marginLeft: wp(10)}]}
              onPress={showModeFrom}>
              <Text>{dateTimeToTimeString(dateFrom)}</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={[styles.dateBtn]}>
              <Text>до {dateTimeToTimeStringDatePick(new Date(new Date().getTime() + dateFrom.getTime()))}</Text>
            </TouchableOpacity>
          </View>
          {showFrom && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateFrom}
              mode={'time'}
              is24Hour={false}
              display="default"
              onChange={onChangeFrom}
            />
          )}
        </View>
      )}
      {orderData.system.status === 2 && (
        <View style={styles.wrapInput}>
          <Text style={styles.textOrderComment}>Коментар до заявки:</Text>
          <TextInput
            style={styles.input}
            textAlignVertical={'top'}
            value={inputValue}
            onChangeText={(e) => setInputValue(e)}
            multiline={true}
            placeholder={'Мінімальна кількість символів - 1, максимальна 500'}
          />
        </View>
      )}
      {(orderData.system.status === 5 ||
        orderData.system.status === 4 ||
        orderData.system.status === 3) &&
        orderData.detail.comment !== '' && (
          <View style={styles.comments}>
            <Text style={styles.comnts}>
              <Text style={styles.comntsFont}>Коментар:</Text>{' '}
              {orderData.detail.comment}
            </Text>
          </View>
        )}
      {(orderData.system.status === 5 ||
        orderData.system.status === 4 ||
        orderData.system.status === 3) &&
        orderData.detail.adminComment !== '' && (
          <View style={styles.comments}>
            <Text style={styles.comnts}>
              <Text style={styles.comntsFont}>Коментар від адміна:</Text>{' '}
              {orderData.detail.adminComment}
            </Text>
          </View>
        )}
      <View style={styles.containerButtons}>
        {orderData.system.status !== 5 && orderData.system.status !== 4 && (
          <ButtonView
            title={'Відхилити'}
            color={COLORS.HEADER_RED}
            textColor={'white'}
            onPress={switchRejectModal}
          />
        )}
        <View style={{width: wp(20)}} />
        {orderData.system.status === 1 && (
          <ButtonView
            title={'Взяти в роботу'}
            color={COLORS.BUTTON_LIGHT_GREEN}
            textColor={'white'}
            onPress={getInWorkButtonPress}
            disabled={disabledBtn}
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
    </AvoidScrollView>
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
    flexWrap: "wrap"
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
    fontSize: hp(16),
    fontWeight: 'bold',
  },
  money: {
    fontSize: hp(22),
    fontWeight: 'bold',
  },
  department: {
    fontSize: hp(20),
    flexWrap: "wrap",
    fontWeight: 'bold',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(50),
    marginBottom: hp(20),
  },
  textDep: {
    fontSize: hp(12),
    color: 'gray',
  },
  comments: {
    width: '100%',
    paddingHorizontal: wp(5),
  },
  wrapInput: {
    width: '100%',
    paddingHorizontal: wp(5),
    height: hp(100),
  },
  textOrderComment: {
    fontFamily: 'Roboto-Bold',
    color: COLORS.FONT_BLACK,
    fontSize: hp(18),
    marginBottom: hp(5),
  },
  input: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.FONT_BLACK,
    fontSize: hp(18),
    maxHeight: hp(100),
    minHeight: hp(100),
    borderRadius: 5,
    backgroundColor: COLORS.TEXT_INPUT_BACKGROUND,
  },
  comnts: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.FONT_BLACK,
    fontSize: hp(18),
  },
  comntsFont: {
    fontFamily: 'Roboto-Bold',
  },
  dateBtn: {
    backgroundColor: COLORS.TEXT_INPUT_BACKGROUND,
    paddingHorizontal: hp(15),
    paddingVertical: hp(10),
    borderRadius: 5,
    marginRight: hp(10),
  },
});
