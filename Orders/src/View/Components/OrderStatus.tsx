import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { COLORS } from '../../constants/colors';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';

export const OrderStatus = ({type}) => {
    let statusText = ''
    switch(type){
        case 'new':
            statusText = 'Нова'
            break;
        case 'accept':
            statusText = 'Прийнято'
            break;
        case 'wait':
            statusText = 'Очікує'
            break;
        case 'reject':
            statusText = 'Відхилено'
            break;
        case 'done':
            statusText = 'Виконано'
            break;
    }
  return <View>
    <Text style={{...styles.statusText, ...styles[`text_${type}`]}}>
      {statusText}
    </Text>
  </View>
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    statusText: {
        fontSize: hp(12),
        paddingHorizontal: hp(10),
        paddingVertical: hp(5),
        borderRadius: 50,
    },
    text_new: {
        color: COLORS.FONT_WHITE,
        backgroundColor: COLORS.BUTTON_GREEN,
    },
    text_accept: {
        color: COLORS.FONT_WHITE,
        backgroundColor: COLORS.HEADER_BLUE,
    },
    text_wait: {
        color: COLORS.FONT_BLACK,
        backgroundColor: COLORS.FONT_YELLOW,
    },
    text_reject: {
        color: COLORS.FONT_BLACK,
        backgroundColor: COLORS.TEXT_REJECT,
    },
    text_done: {
        color: COLORS.FONT_WHITE,
        backgroundColor: COLORS.TEXT_DONE,
    },
})
