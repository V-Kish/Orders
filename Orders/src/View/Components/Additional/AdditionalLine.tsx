import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ICONS} from "../../../constants/icons";
import {PAYMENT_STYLE} from "../../../constants/styles";
import React, {useState} from "react";
import {mockupWidthToDP as wp, mockupHeightToDP as hp} from "../../../constants/Dimensions";
import {COLORS} from "../../../constants/colors";
import {stringFormatSpaces} from "../../../Common/stringHelper";

type types = 'primary'|'success'|'error'|'warning'
const getIconByType = (type: types) => {
    return ICONS[type]
}
const getColorByType = (type: types) => {
    return COLORS[type.toUpperCase()]
}

const getAlign = (align) => {
    switch (align){
        case 'top': return {bottom:'60%'}
        case 'bottom': return {top: '100%'}
    }
}
export const AdditionalLine = ({type='primary',textType = 'default', title, value, description, alignInfo='top', index= 1000}) => {
    const [inforation, setInformation] = useState(false)
    const ALIGN = {}
    return <View style={[styles.additional, {zIndex: index}]}>
        <View style={styles.additionalTitleBox}>
            {/*<TouchableOpacity*/}
            {/*    style={styles.additionalImgBox}*/}
            {/*    onPress={()=>{setInformation(!inforation)}}*/}
            {/*>*/}
            {/*    <Image*/}
            {/*        source={getIconByType(type)}*/}
            {/*        style={styles.additionalImg}*/}
            {/*    />*/}
            {/*    <View style={inforation ? [styles.descriptionBox, getAlign(alignInfo)] : styles.hidden}>*/}
            {/*        <View style={[styles.descriptionBoxContainer, {*/}
            {/*            backgroundColor: getColorByType(type).bg,*/}
            {/*            borderColor: getColorByType(type).border,*/}
            {/*        }]}>*/}
            {/*            <Text style={[styles.descriptionText,{*/}
            {/*                color: getColorByType(type).text*/}
            {/*            }]}>{description}</Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</TouchableOpacity>*/}
            <Text style={styles.additionalTitle}>
                {title}
            </Text>
        </View>
        <View style={styles.additionalSum}>
            <Text style={[PAYMENT_STYLE.paymentSumm, styles.paymentSumm, textType!=='default' ? {color:getColorByType(textType).text}:{}]}>{stringFormatSpaces(value)}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    additional: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 999999,
        paddingVertical: hp(2),
        // width: '100%',
    },
    additionalTitleBox: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '70%',
        justifyContent: 'space-between',
    },
    additionalImg: {
        width: wp(15),
        height: wp(15),
    },
    additionalImgBox: {
        marginRight: wp(3),
        zIndex: 999999,
        // backgroundColor: COLORS.BLUE.bg,
    },
    additionalTitle: {
        fontFamily: 'Roboto',
        fontSize: wp(16),
        color: COLORS.FONT_GRAY,
    },
    descriptionBox: {
        position: "absolute",
        // bottom:'60%',
        left: wp(10),
        // width: '100%',
        minWidth: wp(250),
        // height: hp(100),
        zIndex: 999999,
    },
    descriptionBoxContainer: {
        backgroundColor: COLORS.PRIMARY.bg,
        // backgroundColor: 'red',
        borderRadius: 5,
        borderWidth:1,
        borderColor: COLORS.PRIMARY.border,
        padding: wp(10)
    },
    hidden: {
        overflow: "hidden",
        width:0,
        height: 0,
    },
    descriptionText: {
        fontFamily: 'Roboto',
        fontSize: wp(15),
        color: COLORS.PRIMARY.text,
        textAlign: 'left'
    },
    paymentSumm: {
        fontSize: wp(18)
    }
})
