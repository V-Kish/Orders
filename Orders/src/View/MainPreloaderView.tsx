import React from 'react';
import {View, StyleSheet, Modal, Animated} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../constants/Dimensions';
import {COLORS} from '../constants/colors';
import {useSelector} from 'react-redux';
import {reduxTypes} from '../Types';
import {ICONS} from "../constants/icons";

export const MainPreloaderView = () => {
  const mainPreloader = useSelector(
    (state: reduxTypes) => state.start.mainPreloader,
  );
  return (
    <Modal animationType="fade" transparent={true} visible={mainPreloader}>
      <View style={styles.containerModal}>
        <View style={styles.wrapper}>
          <View style={styles.wrapLogo} />
        </View>
        <View style={styles.wrapperIcon}>
          <Animated.Image
            style={styles.logoLoader}
            source={ICONS.logo}
          />
          <View style={styles.wrapAvtivity} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  wrapper: {
    marginTop: hp(25),
  },
  wrapperIcon: {
    position: 'absolute',
    left: hp(0),
    right: hp(0),
    bottom: hp(0),
    top: hp(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLoader: {
    width: wp(74),
    height: hp(83),
    resizeMode: 'contain',
    // animationName: '$rotate',
  },
  logoLoaderDolar: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(70),
    height: hp(70),
    resizeMode: 'contain',
  },
  wrapAvtivity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(30),
  },
  textCurs: {
    fontFamily: 'Lato-Regular',
    fontSize: hp(22),
    lineHeight: hp(22),
    color: COLORS.FONT_WHITE,
    marginRight: hp(10),
  },
});
