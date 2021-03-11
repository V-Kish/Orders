import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { CustomModalButtons } from './CustomModalButtons';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
export const ConfirmModal = ({title = "", content = "", closeModal = ()=>{}, confirmAction = () => {}}) => {

    return <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.modalHeaderView}>
                    <Text style={styles.modalHeaderText}>{title}</Text>
                </View>
                <View style={styles.modalContentView}>
                    <Text style={styles.modalContentText}>{content}</Text>
                </View>
            </View>
            <CustomModalButtons
                customButton={{visible: true, title: 'Так'}}
                customButtonPress={confirmAction}
                cancelButton={true}
                cancelButtonPress={closeModal}
            />
        </View>

};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '80%',
    // maxHeight: '90%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    padding: wp(30),
    // flex: 1,
  },
  modalHeaderView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  modalHeaderText: {
      fontSize: wp(20),
      lineHeight: 28,
      paddingBottom: hp(5),
      fontWeight: 'bold'
  },
  modalContentView: {

  },
  modalContentText: {
      fontSize: wp(18),
      lineHeight: 20,
      color: COLORS.STATUS_GRAY_DARK
  },
  buttonsView: {},
});
