import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../constants/Dimensions';

import {navigator} from '../Core/Navigator';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {ICONS} from '../constants/icons';
import {COLORS} from '../constants/colors';
import {Counter} from '../View/Components/Counter';
export const OptionsScreen = () => {

  let counter = 0;
  return (
    <View style={styles.container}>
      <HeaderView icon={ICONS.logoSmall} title="Робота з клієнтами" />
      <View style={styles.wrapBtn}>
        <TouchableOpacity
          onPress={() => navigator().navigate('HomeScreen')}
          style={[styles.btns, {backgroundColor: COLORS.BUTTON_LIGHT_GREEN}]}>
          <Text style={[styles.textsBtn]}>Замовлення на обмін</Text>
          <Counter counter={counter} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator().navigate('ChatListScreen')}
          style={[styles.btns, {backgroundColor: COLORS.BUTTON_PURPLE}]}>
          <Text style={[styles.textsBtn]}>Переписка з клієнтами</Text>
          <Counter counter={counter} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator().navigate('CustomersScreen')}
          style={[styles.btns, {backgroundColor: COLORS.BUTTON_ORANGE}]}>
          <Text style={[styles.textsBtn]}>Клієнти системи</Text>
        </TouchableOpacity>
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
  wrapBtn: {
    marginTop: hp(100),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btns: {
    marginBottom: hp(50),
    paddingHorizontal: wp(20),
    paddingVertical: hp(20),
    borderRadius: 5,
    width: wp(300),
  },
  textsBtn: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: COLORS.FONT_WHITE,
    textTransform: 'uppercase',
  },
  counter: {
    position: 'absolute',
    top: hp(-25),
    right: hp(-20),
    backgroundColor: 'red',
    borderRadius: 50,
    width: hp(40),
    height: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontFamily: 'Rotobo-Regular',
    fontSize: hp(14),
    color: COLORS.FONT_WHITE,
  },
});
