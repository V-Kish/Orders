import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {mockupHeightToDP as hp} from "../../constants/Dimensions";
import {COLORS} from "../../constants/colors";


export const MyMessage = ({item}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textMessage}>{item.message}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '80%',
        paddingRight: hp(20),
        paddingVertical: hp(15),

    },
    textMessage: {
        fontFamily: 'Roboto-Regular',
        fontSize: hp(18),
        color: COLORS.FONT_BLACK,
        textAlign:'right'

    },
});
