import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ModalButton } from './ModalButton';

export const AlertModal = ({title, content, closeModal}) => {
  
    return <View style={styles.container}>
            <View style={styles.modalHeaderView}>
                <Text style={styles.modalHeaderText}>{title}</Text>
            </View>
            <View style={styles.modalContentView}>
                <Text style={styles.modalContentText}>{content}</Text>
            </View>
            <View style={styles.buttonsView}>
                <ModalButton
                    onPress={closeModal}
                    title="Ок"
                />
            </View>
        </View>
  
};

const styles = StyleSheet.create({
  container: {},
  modalHeaderView: {},
  modalHeaderText: {},
  modalContentView: {},
  modalContentText: {},
  buttonsView: {},
});
