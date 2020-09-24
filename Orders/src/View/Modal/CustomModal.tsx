import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import { AlertModal } from './AlertModal';

const types = ["ALERT", "CONFIRM", "LIST", "FORM"]

export const CustomModal = ({type, showModal, afterClose = ()=>{}, title, content}) => {
  const [visible, setVisible] = useState(showModal)
  const closeModal = () => {
      setVisible(false)
  }
  let CurrentModal = () => <></>
  switch(type){
      case types[0]://ALERT
        CurrentModal = () => <AlertModal 
            closeModal={closeModal}
            title={title}
            content={content}
        />;
        break
    default: return null
  }
  return <Modal>
        <View style={styles.container}>
            <CurrentModal/>
        </View>
  </Modal>
  
};

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      top:0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 999999,
      backgroundColor: 'red'
  },
});
