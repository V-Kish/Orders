import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import { AlertModal } from './AlertModal';
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
  return <Modal visible={modalVisible} transparent={true}>
        <View style={styles.container}>
          <View style={styles.content}>
            <CurrentModal/>
          </View>
        </View>
    </Modal>
  
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: "rgba(255,255,255,.3)"
  },
  content: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
});
