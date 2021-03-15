import React from 'react';

import {View, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import {COLORS} from '../../../constants/colors';

export const ModalNewChat = ({isShow = false,fnClose}) => {
  return (
    <Modal visible={isShow} onRequestClose={() =>fnClose()} animationType={"slide"}>
      <View style={styles.container}>
        {/*// Theme // */}
        <View />
        {/*// message // */}
        <View />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: 120,
    width: 120,
  },
  wrapIndicator: {},
});
