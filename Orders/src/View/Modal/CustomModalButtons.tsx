import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ModalButton } from './ModalButton';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';

export const CustomModalButtons = ({
    changeModalVisible = () => {},
    buttonOk = false,
    cancelButton = false,
    cancelButtonPress = ()=>{},
    customButton = false, 
    customButtonPress = ()=>{}
}) => {
  
    return <View style={styles.buttonsView}>
            {cancelButton && <ModalButton
                onPress={cancelButtonPress}
                style="cancelButton"
                title="Скасувати"
            />}
            {customButton && <ModalButton
                onPress={customButtonPress}
                style="submitButton"
                title={customButton?.title}
            />}
            {buttonOk && <ModalButton
                onPress={changeModalVisible}
                title="Ок"
            />}
        </View>
  
};

const styles = StyleSheet.create({
    buttonsView: {
        borderTopColor: 'hsl(0,0%,90%)',
        borderTopWidth: 1,
        paddingVertical: hp(20),
        paddingHorizontal: hp(20),
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});
