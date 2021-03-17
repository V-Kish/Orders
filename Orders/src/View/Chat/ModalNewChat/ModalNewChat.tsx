import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  TextInput, ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {ICONS} from '../../../constants/icons';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {HeaderView} from '../../HeaderView/HeaderView';
import {useDispatch, useSelector} from 'react-redux';
import {UserDataProvider} from '../../../DataProvider/UserDataProvider';
import {reduxTypes} from '../../../Types';
import {ClearSelectedChat, AddNewChat} from '../../../store/actions/Clients';
import {chatListPagination, selectedItemChatAction} from '../../../store/actions/Chat';
import {navigator} from '../../../Core/Navigator';
import { showModalCreateNewChat } from '../../../store/actions/AppStart';
import {Chat} from "../../../functions/Chat";

export const ModalNewChat = () => {
  const dispatch = useDispatch();
  // states
  const [inputTheme, setInputTheme] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [errorInputTheme, setErrorInputTheme] = useState({});
  const [errorInputMessage, setErrorInputMessage] = useState({});
  const [preloaderBtn, setPreloaderBtn] = useState(false);
  // use selector
  const isShow = useSelector((state: reduxTypes) => state.start.showModal);
  const ListChats = useSelector((state: reduxTypes) => state.chat.Items);
console.warn('ListChats',ListChats)
  const selectedChatUser = useSelector(
    (state: reduxTypes) => state.clients.selectedChatUser,
  );
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
    setPreloaderBtn(true);
    const body = {
      clientId: selectedChatUser.id,
      theme: inputTheme,
      message: inputMessage,
    };

    const result = await UserDataProvider.createNewChat(body);

    if (result.statusCode === 200) {
      // const list = await UserDataProvider.getListChats({ pageIndex: 1,
      //   pageSize: 10,
      //   isRead: -1});
    const list = await  Chat.getChatList(dispatch,'',{
        pageIndex: 1,
        pageSize: 10,
        isRead: -1,
        clientId: selectedChatUser.id,
      })
      console.log('listzzzzzz',list)
      const chat = list.Items.filter((item) => (item.rootId === -1 ? item.id : item.rootId) === result.data.id);

      dispatch(showModalCreateNewChat(false));
      dispatch(ClearSelectedChat());
      setInputTheme('');
      setInputMessage('');
      if (chat) {
        dispatch(selectedItemChatAction(chat[0]));
        navigator().navigate('ChatScreen');
      } else {
        navigator().navigate('ChatListScreen');
      }
      setPreloaderBtn(false);
      // Chat.getChatList(dispatch).then();
    }else {
      setPreloaderBtn(false);
    }
  };
const closeModal = () =>{
  dispatch(showModalCreateNewChat(false))
    dispatch(ClearSelectedChat());
  if (ListChats.length === 0){
    navigator().navigate('CustomersScreen')
  }
}
  return (
    <Modal
      visible={isShow}
      onRequestClose={closeModal}
      animationType={'slide'}>
      <View style={styles.container}>
        <HeaderView
          icon={ICONS.arrowBackWhite}
          title="Створення нового чату"
          color={COLORS.HEADER_BLUE}
          ordersSettings={true}
          desc={selectedChatUser.userName}
          onPress={closeModal}
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
              {preloaderBtn && (
                  <ActivityIndicator size="small" color={COLORS.FONT_WHITE} />
              )}
              {!preloaderBtn && (
                  <Text style={styles.textBtn}>Надіслати</Text>
              )}
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
    justifyContent:'center',
    alignItems:'center',
    width:wp(160)
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
