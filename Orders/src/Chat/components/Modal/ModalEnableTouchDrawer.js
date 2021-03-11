import {
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';

import { useDispatch } from 'react-redux';
import {currentUser} from '../../../Core/CurrentUser';
import {COLORS} from '../../../constants/colors';

export const ModalEnableTouchDrawer = ({ show, changeStateTouch }) => {
  const dispatch = useDispatch();
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={show}>
        <View style={styles.containerBonusCard}>
          <View style={styles.container}>
            <View style={styles.wrapMainIconAndText}>
              <Text style={styles.mainText}>
                Бажаєте використовувати TouchID?
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: hp(15),
                marginBottom: hp(15),
              }}>
              <Image
                style={{ width: hp(50), height: hp(50) }}
                source={require('../../assets/img/TouchIdIcon/touchID.jpg')}
              />
            </View>
            <View style={styles.wrapBtnYesNo}>
              <TouchableOpacity
                style={styles.btnYes}
                onPress={() => {
                  // currentUser().toggleFingerprint(true);
                  // dispatch(showAlertTouchIdPermissionDrawer(false));
                  // changeStateTouch();
                }}>
                <Text style={styles.btnTextYesOrNo}>Так</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // currentUser().toggleFingerprint(false);
                  // dispatch(showAlertTouchIdPermissionDrawer(false));
                  // changeStateTouch()
                }}
                style={styles.btnNo}>
                <Text style={styles.btnTextYesOrNo}>Ні</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBonusCard: {
    paddingHorizontal: wp(21),
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: wp(5),
    width: wp(250),
    paddingHorizontal: hp(10),
    overflow: 'hidden',
  },
  btnCloseAlert: {
    alignItems: 'flex-end',
    marginRight: wp(18),
    marginTop: wp(20),
  },
  btnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(17),
    fontWeight: '400',
  },
  wrapMainIconAndText: {
    alignItems: 'center',
    marginTop: hp(12),
  },
  mainIconLogout: {
    width: wp(43),
    height: hp(43),
    resizeMode: 'contain',
    marginBottom: hp(33),
  },
  mainText: {
    color: '#1e1a16',
    fontFamily: 'Roboto-Regular',
    fontSize: hp(16),
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: hp(25),
  },
  wrapBtnYesNo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //  marginTop: hp(45),
    marginBottom: hp(10),
  },
  btnYes: {
    width: wp(50),
    height: hp(50),
    backgroundColor: COLORS.FONT_BLACK,
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  btnNo: {
    backgroundColor: '#FC532F',
    width: wp(50),
    borderRadius: wp(5),
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  btnTextYesOrNo: {
    color: '#fefefe',
    fontFamily: 'Roboto-Regular',
    fontSize: hp(16),
    fontWeight: '700',
  },
});
