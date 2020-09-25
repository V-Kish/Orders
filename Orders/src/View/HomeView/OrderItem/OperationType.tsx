import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/colors'
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../../constants/Dimensions';
import { ICONS } from '../../../constants/icons';

export const OperationType = ({item}) => {
    const type = item.detail.operationType
    let circleText = ''
    let circleImg = false
    let operationText = ''
    let style = type
    switch(type){
        case 'buy':
            circleText = 'П'
            operationText = 'продаж'
            break;
        case 'sale':
            circleText = 'К'
            operationText = 'купівля'
            break;
        case 'cross':
            circleText = 'Кк'
            operationText = 'крос-курс'
            break;
    }
    switch(item.system.type){
        case 'reject':
            circleText = 'В'
            operationText = 'продаж відхилено'
            style = 'reject'
            break;
        case 'done':
            circleImg = true
            circleText = ''
            style = 'done'
            break;
    }
    return <View style={styles.operationTypeView}>
        <View style={{...styles.operationTypeCircle, ...styles[`operationTypeCircle_${style}`]}}>
            {circleText!=='' && <Text style={styles.operationTypeCircleText}>
                {circleText}
            </Text>}
            {circleImg && <Image
                    source={ICONS.done}
                    style={styles.circleImg}
            />}
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
    operationTypeCircle_buy: {
        backgroundColor: COLORS.STATUS_GREEN
    },
    operationTypeCircle_sale: {
        backgroundColor: COLORS.STATUS_RED
    },
    operationTypeCircle_cross: {
        backgroundColor: COLORS.STATUS_YELLOW
    },
    operationTypeCircle_reject: {
        backgroundColor: COLORS.STATUS_GRAY
    },
    operationTypeCircle_done: {
        backgroundColor: COLORS.STATUS_GREEN_WHITE
    },
    operationTypeCircleText: {
         color: 'white',
         fontSize: wp(30),
        fontWeight: '100',
        textAlign: 'center'
    },
    operationTypeCircle: {
         width: wp(60),
         height: wp(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    operationTypeText: {
        fontSize: wp(12),
        paddingVertical: wp(5),
        color: COLORS.STATUS_GRAY_DARK,
        textAlign: 'center'
    },
    circleImg: {
        width: wp(50),
        height: wp(50)
    }
})
