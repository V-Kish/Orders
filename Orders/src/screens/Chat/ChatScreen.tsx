import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
export const ChatScreen = () => {

  function goBack() {
    navigator().toGoBack();
  }
  return (
    <View style={styles.container}>
     <Text>ChatScreen</Text>
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
