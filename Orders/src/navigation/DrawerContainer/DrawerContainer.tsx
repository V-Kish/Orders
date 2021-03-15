import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';

import {COLORS} from '../../constants/colors';
import {ICONS} from '../../constants/icons';
export const DrawerContainer = () => {
  return (
    <View style={styles.container}>
      {/*<View style={styles.wrapLogo}>*/}
      {/*  <Image source={ICONS.logoSmall} style={styles.imgLogo} />*/}
      {/*</View>*/}
      <View style={styles.wrapBtn}>
        <TouchableOpacity
          onPress={() => {
            navigator().closeDrawer();
            navigator().navigate('HomeScreen');
          }}
          style={[styles.btns, {backgroundColor: COLORS.BUTTON_LIGHT_GREEN}]}>
          <Text style={[styles.textsBtn]}>Замовлення на обмін</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigator().closeDrawer();
            navigator().navigate('ChatListScreen');
          }}
          style={[styles.btns, {backgroundColor: COLORS.BUTTON_PURPLE}]}>
          <Text style={[styles.textsBtn]}>Переписка з клієнтами</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigator().closeDrawer();
            navigator().navigate('CustomersScreen');
          }}
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
  wrapLogo: {
      marginTop:hp(25),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    resizeMode: 'contain',
    width: hp(50),
    height: hp(50),
  },
});
