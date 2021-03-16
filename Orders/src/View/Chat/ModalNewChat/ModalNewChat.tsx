import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {ICONS} from '../../../constants/icons';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {HeaderView} from '../../HeaderView/HeaderView';
import {Chat} from '../../../functions/Chat';
import {useDispatch, useSelector} from 'react-redux';
import {UserDataProvider} from '../../../DataProvider/UserDataProvider';
import {reduxTypes} from "../../../Types";

export const ModalNewChat = ({isShow = false, fnClose}) => {
  const dispatch = useDispatch();
  // states
  const [inputTheme, setInputTheme] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [errorInputTheme, setErrorInputTheme] = useState({});
  const [errorInputMessage, setErrorInputMessage] = useState({});
  //

  const selectedChatUser = useSelector((state: reduxTypes) => state.clients.selectedChatUser);
  console.warn(selectedChatUser)
  // create new chat
  const createNewChat = async () => {
    if (inputTheme === '') {
      setErrorInputTheme(styles.errorInput);
      return;
    }
    if (inputMessage === '') {
      setErrorInputMessage(styles.errorInput);
      return;
    }

    const body = {
      clientId: selectedChatUser.id,
      theme: inputTheme,
      message: inputMessage,
    };
    console.warn(body);
  return
    const result = await UserDataProvider.createNewChat(body);
    if (result.statusCode === 200){
      Chat.getChatList(dispatch).then();
      fnClose()
      dispatch()
      setInputTheme('');
      setInputMessage('');

    }
  };

  return (
    <Modal
      visible={isShow}
      onRequestClose={() => fnClose()}
      animationType={'slide'}>
      <View style={styles.container}>
        <HeaderView
          icon={ICONS.arrowBackWhite}
          title="Створення нового чату"
          color={COLORS.HEADER_BLUE}
          ordersSettings={true}
          desc={selectedChatUser.userName}
          onPress={() => fnClose()}
        />
        <View style={styles.mainContainer}>
          {/*// Theme // */}
          <View>
            <Text style={styles.defText}>Тема: </Text>
            <TextInput
              style={[styles.input, errorInputTheme]}
              textAlignVertical={'top'}
              value={inputTheme}
              onChangeText={(e) => {
                setInputTheme(e);
                if (errorInputTheme?.borderWidth) {
                  setErrorInputTheme({});
                }
              }}
              multiline={true}
              placeholder={'Тема'}
            />
          </View>
          {/*// message // */}
          <View style={styles.wrapMessage}>
            <Text style={[styles.defText]}>Повідомлення: </Text>
            <TextInput
              style={[styles.input, errorInputMessage]}
              textAlignVertical={'top'}
              value={inputMessage}
              onChangeText={(e) => {
                setInputMessage(e);
                if (errorInputMessage?.borderWidth) {
                  setErrorInputMessage({});
                }
              }}
              multiline={true}
              placeholder={'Повідомлення'}
            />
          </View>
          <View style={styles.wrapBtn}>
            <TouchableOpacity style={styles.btnSend} onPress={createNewChat}>
              <Text style={styles.textBtn}>Надіслати</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapIndicator: {},
  input: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.FONT_BLACK,
    fontSize: hp(18),
    maxHeight: hp(100),
    minHeight: hp(100),
    borderRadius: 5,
    backgroundColor: COLORS.TEXT_INPUT_BACKGROUND,
  },
  mainContainer: {
    paddingHorizontal: wp(20),
    marginTop: hp(30),
  },
  wrapBtn: {
    marginTop: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSend: {
    backgroundColor: COLORS.BUTTON_GREEN,
    paddingHorizontal: wp(20),
    paddingVertical: hp(15),
    borderRadius: 5,
  },
  textBtn: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(20),
    color: COLORS.FONT_WHITE,
  },
  wrapMessage: {
    marginTop: hp(15),
  },
  defText: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp(20),
    color: COLORS.FONT_BLACK,
    marginBottom: hp(5),
  },
  // error
  errorInput: {
    borderWidth: 1,
    borderColor: COLORS.BUTTON_RED,
    borderStyle: 'solid',
  },
});
