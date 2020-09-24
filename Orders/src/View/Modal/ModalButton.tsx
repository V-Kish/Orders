import React from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export const ModalButton = ({title, style = 'submitButton', onPress}) => {
    const handlePress = () => {
        onPress()
    }
    return <TouchableOpacity 
            style={{...styles.container, ...styles[`${style}`]}}
            onPress={handlePress}
        >
            <Text style={{...styles.title,...styles[`${style}_title`]}}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {},
    title: {},
    submitButton: {},
    submitButton_title: {},
    closeButton: {},
    closeButton_title: {},
});