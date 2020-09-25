import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { CustomModalButtons } from './CustomModalButtons';
import { ModalButton } from './ModalButton';

export const AlertModal = ({title = "", content = "", closeModal = ()=>{}}) => {
  
    return <View style={styles.container}>
            <View style={styles.modalHeaderView}>
                <Text style={styles.modalHeaderText}>{title}</Text>
            </View>
            <View style={styles.modalContentView}>
                <Text style={styles.modalContentText}>{content}</Text>
            </View>
            <CustomModalButtons
                buttonOk={true}
                changeModalVisible={closeModal}
            />
        </View>
  
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-between'
  },
  modalHeaderView: {},
  modalHeaderText: {},
  modalContentView: {},
  modalContentText: {},
  buttonsView: {},
});
