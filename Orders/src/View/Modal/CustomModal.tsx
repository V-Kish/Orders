import React, {useState} from 'react';
import {Button, Dimensions, Modal, StyleSheet, View} from 'react-native';
import { AlertModal } from './AlertModal';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
const types = ["ALERT", "CONFIRM", "LIST", "FORM"]

export const CustomModal = ({type, modalVisible, changeModalVisible, title, content,}) => {
  let CurrentModal = () => <></>
  switch(type){
      case types[0]://ALERT
        CurrentModal = () => <AlertModal 
            closeModal={changeModalVisible}
            title={title}
            content={content}
        />;
        break
    default: return null
  }
  return <Modal visible={modalVisible} style={{backgroundColor: 'rgba(255,255,255,.1)'}}>
        <View style={styles.content}>
            <CurrentModal/>
            <Button title="off" onPress={changeModalVisible}/>
        </View>
    </Modal>
  
};

const styles = StyleSheet.create({
  show: {
      position: 'absolute',
      minHeight: Dimensions.get('screen').height,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 999999,
      // backgroundColor: 'rgba(255,255,255,.4)',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
  },
  hidden: {
    display: 'none'
  },

  content: {
    width: '80%',
    // height: '80%',
    backgroundColor: 'white'
  }
});
