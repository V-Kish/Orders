import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { CustomModalButtons } from './CustomModalButtons';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { TextInput } from 'react-native-gesture-handler';

export const FormInput = ({
    input = {text: '', placeholder: '', onChangeText: ()=>{}, error: false}
}) => {
  
    return <View style={styles.formInputView}>
            <Text style={styles.formInputTitle}>{input.text}</Text>
            <TextInput
                placeholder={input.placeholder}
                onChangeText={input.onChangeText}
                style={!input.error ? styles.formInput : {...styles.formInput,...styles.error}}
            />
        </View>
  
};

const styles = StyleSheet.create({
  formInputView: {

  },
  formInputTitle: {
    fontSize: hp(18),
    color: COLORS.STATUS_GRAY_DARK
  },
  formInput: {
    borderBottomColor: COLORS.BACKGROUND_GRAY,
    borderBottomWidth: 2
  },
  error: {
    borderBottomColor: COLORS.BACKGROUND_GRAY,
  }
});
