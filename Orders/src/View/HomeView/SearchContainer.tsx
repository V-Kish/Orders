import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export const SearchContainer = () => {
  const [dropdown, setDropdown] = useState(false)
  return (
    <View style={styles.container}>
        <View style={styles.searchInputView}>
            <View style={styles.searchIconView}>
                <TouchableOpacity 
                    onPress={setDropdown}
                >
                    <Text>Show {dropdown}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchTextInputView}>
                <TextInput placeholder="Пошук по замовленням"/>
            </View>
        </View>
        <View style={dropdown ? styles.dropDown : styles.dropDownShowed}>
            
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {

    }
})
