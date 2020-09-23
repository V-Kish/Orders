import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export const RegistrationSubmitButton = ({authSubmit}) => {
  const [title, setTitle] = useState('Увійти');
  const handlePress = () => {
    setTitle('Авторизація...');
    authSubmit();
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
