import React from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';

import {mockupHeightToDP as hp} from '../constants/Dimensions';

import {navigator} from '../Core/Navigator';
export const OptionsScreen = () => {

  function goBack() {
    navigator().toGoBack();
  }
  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => navigator().navigate('OrderScreen')}>
       <Text>Замовлення на обмін</Text>
     </TouchableOpacity>
      <TouchableOpacity onPress={() => navigator().navigate('ChatListScreen')}>
        <Text>Переписка з клієнтами</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigator().navigate('OrderScreen')}>
        <Text>Клієнти системи</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: hp(10),
  },
});
