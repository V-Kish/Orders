import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { CustomModalButtons } from './CustomModalButtons';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { FormInput } from './FormInput';

export const CustomFormInputs = ({
    inputs = []
}) => {

    return <View style={styles.modalContentView}>
            {inputs && inputs.map((input,i)=>{
                return <FormInput key={i} input={input}/>
            })}
        </View>

};

const styles = StyleSheet.create({
modalContentView: {
    paddingHorizontal: wp(10),
    paddingVertical: wp(30),
    },
    modalContentText: {
        fontSize: hp(24),
        lineHeight: 20,
        color: COLORS.STATUS_GRAY_DARK
    },

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
});
