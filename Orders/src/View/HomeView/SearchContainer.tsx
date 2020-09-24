import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';

export const SearchContainer = ({changeDropDownVisible}) => {
    const [searchText, setSearchText] = useState('')
    const [myTimeout, setMyTimeout] = useState()
    const onChangeText = (text:string) => {
        // setSearchText(text)
        clearTimeout(myTimeout)
        setMyTimeout(
            setTimeout(()=>{
                console.log('request sended', text)
            },2000)
        )
    }
    return (
        <View style={styles.container}>

            <View style={styles.searchInputView}>
                <View style={styles.searchIconView}>
                    <TouchableOpacity 
                        onPress={changeDropDownVisible}
                        activeOpacity={0.9}
                        style={styles.dropdownButton}
                    >
                        <Text>Show</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchTextInputView}>
                    <TextInput 
                        placeholder="Пошук по замовленням"
                        onChangeText={onChangeText}    
                    />
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        // position: 'relative'
    },
    searchInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(20)
    },
    searchIconView: {

    },
    dropdownButton: {

    },
    searchTextInputView: {

    },
})
