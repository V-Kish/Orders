import {mockupHeightToDP as hp} from "../../../constants/Dimensions";
import {COLORS} from "../../../constants/colors";
import {Platform, View} from "react-native";
import React from "react";


export const ModalStatusBar = () => {
    return Platform.OS === 'ios'
        // for IOS
        ? <View style={{ height: hp(25), width: '100%', backgroundColor: COLORS.HEADER_GRAY.bg }} />
        // for Android
        : null
}
