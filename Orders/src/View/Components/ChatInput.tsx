import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {CHAT_COLORS, COLORS} from '../../constants/colors';
import {ICONS} from '../../constants/icons';
import {Chat} from '../../functions/Chat';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from '../../Types';

export const ChatInput = ({setHeight, refScroll}) => {
  const dispatch = useDispatch();
  const selectedItemChat = useSelector(
    (state: reduxTypes) => state.chat.selectedChat,
  );
  const [value, setValue] = useState('');
  const sendMessage = () => {
    if (value === '') {
      return;
    }
    Chat.sendMessages(dispatch, {
      rootId: selectedItemChat.rootId,
      message: value,
    }).then((r) => {
      setTimeout(() => {
        Chat.goToBottom(global.scrollViewRef, true).then();
      }, 0);
    });
    setValue('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Написати повідомлення"
        style={styles.textInput}
        multiline={true}
        onChangeText={(text) => setValue(text)}
        onContentSizeChange={(event) => {
          console.log('event.nativeEvent.', event.nativeEvent);
          setHeight({height: event.nativeEvent.contentSize.height});
        }}
        value={value}
      />
      <TouchableOpacity onPress={sendMessage} style={styles.containerBtn}>
        <Image source={ICONS.sendMessage} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.FONT_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderColor: CHAT_COLORS.BORDER_COLOR,
  },
  textInput: {
    paddingLeft: hp(20),
    width: '90%',
    maxHeight: hp(110),
  },
  containerBtn: {
    flexDirection: 'row',
    paddingRight: hp(20),
    width: '10%',

    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
});
