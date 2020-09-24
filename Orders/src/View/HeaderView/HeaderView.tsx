import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { COLORS } from '../../constants/colors';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';

export const HeaderView = ({icon, title, desc, color = COLORS.HEADER_BLUE}) => {
  return (
    <View style={{...styles.container, backgroundColor: color}}>
        <View style={styles.imageView}>
            <Image
                source={icon}
                style={styles.image}
            />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {desc !== undefined && <Text style={styles.desc}>{desc}</Text>}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(90),
        paddingHorizontal: wp(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },
    imageView: {
        justifyContent: 'center'
    },
    image: {

    },
    textContainer: {
        paddingHorizontal: wp(10),
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    desc: {

    },
});
