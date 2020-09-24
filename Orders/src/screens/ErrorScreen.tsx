import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {ICONS} from '../constants/icons';
import {COLORS} from '../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../constants/Dimensions';
export const ErrorScreen = () => {
  return (
    <View style={styles.wrap}>
      <HeaderView
        icon={ICONS.headerPeoples}
        title="Вхід до системи"
        color={COLORS.HEADER_RED}
      />
      <View style={styles.containerContent}>
        <View>
          <Image source={ICONS.errorScreenLogo} style={styles.img} />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>
            Нажаль, вам заборонений{'\n'} доступ до цієї прогами.
          </Text>
          <Text style={styles.text}>
            Можливо іншим разом вам{'\n'} повезе трохи більше
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(200),
  },
  img: {
    resizeMode: 'contain',
    width: wp(65),
    height: hp(65),
  },
  containerText: {
    marginHorizontal: hp(50),
  },
  text: {
    fontSize: hp(20),
    textAlign: 'center',
    marginTop: hp(10),
  },
});
