import React from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { COLORS } from '../../constants/colors';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';

export const ModalButton = ({title="", style = 'submitButton', onPress=()=>{}}) => {
    return <TouchableOpacity 
            style={{...styles.container, ...styles[`${style}`]}}
            onPress={onPress}
        >
            <Text style={{...styles.title,...styles[`${style}_title`]}}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: wp(20),
        textTransform: 'uppercase',
        paddingHorizontal: wp(5),
    },
    submitButton: {
    },
    submitButton_title: {
        color: COLORS.STATUS_BLUE
    },
    cancelButton: {},
    cancelButton_title: {},
});