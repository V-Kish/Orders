import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {COLORS} from "../../constants/colors";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';

export const MyMessage = ({item}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textUser}>{item.fromUserName}:</Text>
            <Text style={styles.textMessage}>{item.message}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        paddingRight: hp(20),
        paddingVertical: hp(15),
        backgroundColor:COLORS.FONT_WHITE,
        borderRadius:5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 6,
        paddingHorizontal:wp(10),
        marginRight:wp(10),
        marginVertical:hp(10)
    },
    textUser: {
        fontFamily: 'Roboto-Regular',
        fontSize: hp(12),
        color: COLORS.FONT_BLACK,
        textAlign:'right'
    },
    textMessage: {
        fontFamily: 'Roboto-Regular',
        fontSize: hp(18),
        color: COLORS.FONT_BLACK,
        textAlign:'right'
    },
});
