import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import { AlertModal } from './AlertModal';
import { ConfirmModal } from './ConfirmModal';
import { FormModal } from './FormModal';
import { ListModal } from './ListModal';
const types = ["ALERT", "CONFIRM", "FORM", "LIST" ]

export const CustomModal = ({
  type = types[0], 
  modalVisible = false, 
  changeModalVisible =() => {}, 
  title = "Alert", 
  content = "",
  inputs = [],
  list = []
}) => {
  let CurrentModal = () => <></>
  switch(type){
      case types[0]://ALERT
        CurrentModal = () => <AlertModal 
            closeModal={changeModalVisible}
            title={title}
            content={content}
        />;
        break
      case types[1]://CONFIRM
        CurrentModal = () => <ConfirmModal 
            closeModal={changeModalVisible}
            confirmAction={changeModalVisible}
            title={title}
            content={content}
        />;
        break
      case types[2]://FORM
        CurrentModal = () => <FormModal 
            closeModal={changeModalVisible}
            confirmAction={changeModalVisible}
            title={title}
            inputs={inputs}
        />;
        break
      case types[3]://FORM
        CurrentModal = () => <ListModal 
            closeModal={changeModalVisible}
            confirmAction={changeModalVisible}
            title={title}
            list={list}
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
    backgroundColor: "rgba(255,255,255,.3)",
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
    borderRadius: 3,
    // maxHeight: '90%'
  },
});
