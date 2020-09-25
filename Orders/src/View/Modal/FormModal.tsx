import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { CustomModalButtons } from './CustomModalButtons';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { color } from 'react-native-reanimated';
import { CustomFormInputs } from './CustomFormInputs';

export const FormModal = ({
    title = "", 
    content = "", 
    closeModal = ()=>{}, 
    confirmAction = () => {}, 
    inputs = []
    // input example
    // {
    //     text: "Вкажіть причину скасування",
    //     placeholder: "Введіть причину",
    //     onChangeText: (text)=>{
    //         console.log('text',text)
    //     }
    // }
}) => {
  
    return <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.modalHeaderView}>
                    <TouchableOpacity style={styles.modalHeaderImageView} onPress={closeModal}>
                        <Text>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalHeaderText}>{title}</Text>
                </View>
                <CustomFormInputs inputs={inputs}/>
            </View>
            <CustomModalButtons
                customButton={{visible: true, title: 'Скасувати', style: 'redButton'}}
                customButtonPress={confirmAction}
                cancelButton={true}
                cancelButtonPress={closeModal}
            />
        </View>
  
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  content: {
    // padding: hp(30),
    // flex: 1,
  },
  modalHeaderView: {
    width: '100%',
    backgroundColor: COLORS.STATUS_RED,
    padding: hp(20),
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalHeaderText: {
      fontSize: hp(32),
      lineHeight: 28,
      paddingBottom: hp(5),
      fontWeight: 'bold',
      color: 'white',
  },
  modalHeaderImageView: {
      paddingRight: wp(5),
  }
});
