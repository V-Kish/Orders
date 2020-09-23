import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authorization} from '../../functions/Authorization';
import {navigator} from "../../Core/Navigator";
import { TextInput } from 'react-native-gesture-handler';

export const RegistrationTextInput = ({title, value, setValue}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container:{

    },
    title: {

    },
    input: {

    }
})
