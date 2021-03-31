import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  mockupHeightToDP as hp, mockupWidthToDP as hw,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {COLORS} from '../../constants/colors';
import {Clients} from "../../functions/Clients";
import {useDispatch} from "react-redux";


export const AddNewNotes = ({clientId}) => {
  const  dispatch = useDispatch();
  const [counterText, setCounterText] = useState(0);
  const [textInput, setTextInput] = useState('');


  const onChangeTextInput = (text) => {
    setTextInput(text);
    setCounterText(text.length);
  };
  const clearInput = () => {
    setTextInput('');
    setCounterText(0);
    if (global.refScrollClient !== null){
     setTimeout(()=>{
       global.refScrollClient.scrollToEnd()
     },300)
    }
  };
  const sendForm = () => {
    const body = {
      clientId: clientId,
      comment: textInput,
    };
    if (body.clientId !== -1 && body.comment !== '') {
      Clients.sendNotes(dispatch,body).then()
      clearInput();
    } else {
    }
  };
  return (
    <View>
      <View>
        <Text style={styles.title}>Нова нотатка по клієнту</Text>
      </View>
      <View>
        <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={onChangeTextInput}
          maxLength={150}
          value={textInput}
        />
        <View style={styles.border} />
        <View style={styles.counterWrap}>
          <Text style={styles.counterText}>{counterText} / 150</Text>
        </View>
      </View>
      <View style={[styles.row, styles.containerBtns]}>
        <TouchableOpacity style={styles.wrapCancel} onPress={clearInput}  >
          <Text style={styles.btnText}>СКАСУВАТИ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapAccept} onPress={sendForm}>
          <Text style={styles.btnTextAccept}>ЗБЕРЕГТИ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(16),
    color: COLORS.FONT_GRAY_SILVER,
  },
  counterText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(16),
    color: COLORS.FONT_GRAY_SILVER,
  },
  border: {
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    borderBottomWidth: 2,
  },
  input: {
    maxHeight: hp(120),
  },
  counterWrap: {
    width: '100%',
    alignItems: 'flex-end',
  },
  btnText: {
    fontFamily: 'Roboto-Light',
    fontSize: hp(20),
    textTransform: 'uppercase',
    color: COLORS.FONT_GRAY_SILVER,
  },
  wrapCancel: {
    marginRight: wp(20),
    paddingHorizontal: wp(20),
    paddingVertical: wp(10),
    borderRadius: 5,
  },
  wrapAccept: {
    backgroundColor: COLORS.BUTTON_LIGHT_GREEN,
    paddingHorizontal: wp(20),
    paddingVertical: wp(10),
    borderRadius: 5,
  },
  btnTextAccept: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(20),
    textTransform: 'uppercase',
    color: COLORS.FONT_WHITE,
  },
  containerBtns: {
    marginTop: hp(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
