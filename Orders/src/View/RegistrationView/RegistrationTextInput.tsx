import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ICONS } from '../../constants/icons';
import { COLORS } from '../../constants/colors';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';

export const RegistrationTextInput = ({title, placeholder = '', value, setValue, secureTextEntry, isError = false}) => {
    const [secure, setSecure] = useState(secureTextEntry)
    const toggleSecure = () => {
        setSecure(!secure)
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputView}>
        <TextInput
            style={
                !isError ? styles.input
                : styles.errorInput
            }
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry===undefined ? false : secure}
        />
        {secureTextEntry!== undefined && (<View style={styles.secureEyeView}>
            <TouchableOpacity
                style={styles.secureEyePress}
                onPress={toggleSecure}
            >
            <Image
                source={
                    secure ? ICONS.eyeHide : ICONS.eyeShow
                }
                style={styles.secureEye}
            />
            </TouchableOpacity>
        </View>)}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container:{
        paddingVertical: hp(10),
        justifyContent: 'center'
    },
    title: {
        fontSize: hp(12),
        color: 'hsl(0,0%,30%)',
    },
    inputView: {
        justifyContent: 'center'
    },
    input: {
        borderBottomColor: '#673AB7',
        borderBottomWidth: 2
    },
    errorInput: {
        borderBottomColor: COLORS.BUTTON_RED,
        borderBottomWidth: 2
    },
    secureEyeView: {
        position: 'absolute',
        zIndex: 9999,
        right: 0,
        // height: '100%'
    },
    secureEyePress: {

    },
    secureEye: {
        width: hp(20),
        height: hp(20)
    }
})
