import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';

export const OperationType = ({type}) => {
    console.log('type', type)
    let circleText = ''
    let operationText = ''
    switch(type){
        case 'buy':
            circleText = 'К'
            operationText = 'купівля'
            break;
        case 'sell':
            circleText = 'П'
            operationText = 'продаж'
            break;
        case 'cross':
            circleText = 'Кк'
            operationText = 'крос-курс'
            break;
        case 'decline':
            circleText = 'В'
            operationText = 'продаж відхилено'
            break;
    }
    return <View style={styles.operationTypeView}>
        <View style={{...styles.operationTypeCircle, ...styles[`operationTypeCircle_${type}`]}}>
            <Text style={styles.operationTypeCircleText}>
                {circleText}
            </Text>
        </View>
        <Text style={styles.operationTypeText}>
            {operationText}
        </Text>
    </View>
}

const styles = StyleSheet.create({
    container: {

    },
    operationTypeView: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    operationTypeCircle: {
        width: wp(60),
        height: wp(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    operationTypeCircle_buy: {
        backgroundColor: COLORS.STATUS_RED
    },
    operationTypeCircle_sell: {
        backgroundColor: COLORS.STATUS_GREEN
    },
    operationTypeCircle_cross: {
        backgroundColor: COLORS.STATUS_YELLOW
    },
    operationTypeCircle_decline: {
        backgroundColor: COLORS.STATUS_GRAY
    },
    operationTypeCircleText: {
        color: 'white',
        fontSize: wp(30),
        fontWeight: '100'
    },
    operationTypeText: {
        fontSize: wp(12),
        paddingVertical: wp(5),
        color: COLORS.STATUS_GRAY_DARK
    },
})
