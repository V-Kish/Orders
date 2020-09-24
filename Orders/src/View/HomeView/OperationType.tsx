import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
        // width: 
    },
    operationTypeCircle_buy: {
        backgroundColor: 'red'
    },
    operationTypeCircleText: {},
    operationTypeText: {},
})
