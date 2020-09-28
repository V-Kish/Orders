import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { CustomModalButtons } from './CustomModalButtons';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { color } from 'react-native-reanimated';
import { CustomFormInputs } from './CustomFormInputs';
import { ICONS } from '../../constants/icons';

export const FormModal = ({
    title = "",
    content = "",
    closeModal = ()=>{},
    confirmAction = (text) => {},
    inputs = []
    // input example
    // {
    //     text: "Вкажіть причину скасування",
    //     name: "login"
    //     placeholder: "Введіть причину",
    //     onChangeText: (text)=>{
    //         console.log('text',text)
    //     }
    // }
}) => {
    const [inputText,setInputText] = useState('')
    inputs[0].onChangeText = setInputText
    const sendConfirmAction = () =>{
      if(inputText===''){
        return
      }
      confirmAction(inputText)
    }
    return <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.modalHeaderView}>
                    <TouchableOpacity style={styles.modalHeaderImageView} onPress={closeModal}>
                      <Image
                          source={ICONS.close}
                          style={styles.modalHeaderImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.modalHeaderText}>{title}</Text>
                </View>
                <CustomFormInputs inputs={inputs}/>
            </View>
            <CustomModalButtons
                customButton={{visible: true, title: 'Скасувати', style: 'redButton'}}
                customButtonPress={sendConfirmAction}
                cancelButton={true}
                cancelButtonPress={closeModal}
            />
        </View>

};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  content: {
    // padding: hp(30),
    // flex: 1,
  },
  modalHeaderView: {
    width: '100%',
    backgroundColor: COLORS.STATUS_RED,
    padding: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  modalHeaderText: {
    fontSize: wp(20),
    lineHeight: 28,
    paddingBottom: hp(5),
    fontWeight: 'bold',
    color: 'white',
  },
  modalHeaderImageView: {
      paddingRight: wp(5),
      justifyContent: 'center',
      alignItems: 'center'
  },
  modalHeaderImage: {
    width: wp(25),
    height: wp(25)
  },
});
