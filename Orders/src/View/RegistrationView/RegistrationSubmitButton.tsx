import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';

export const RegistrationSubmitButton = ({authSubmit}) => {
  const [title, setTitle] = useState('Увійти');
  const [disabled, setDisabled] = useState(false)
  const handlePress = () => {
    setTitle('Авторизація...');
    setDisabled(true)
    authSubmit((newTitle:string)=>{
        setTitle(newTitle)
        setDisabled(false)
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.buttonView} activeOpacity={1} disabled={disabled}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: hp(10)
    },
    buttonView: {
        backgroundColor: 'rgba(33,150,83,1)',
        width: '50%',
        paddingVertical: hp(10),
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});
