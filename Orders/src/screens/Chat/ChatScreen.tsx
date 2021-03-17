import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {DRAWER_ICONS, ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {useDispatch, useSelector} from 'react-redux';
import {orderDataTypes, reduxTypes} from '../../Types';
import {Chat} from '../../functions/Chat';
import {ChatView} from '../../View/Chat/ChatView';
import {chatMessagesPagination} from '../../store/actions/Chat';
import {PreloaderChat} from '../../View/Chat/PreloderChat/PreloderChat';

export const ChatScreen = () => {
  const dispatch = useDispatch();
  const [preloader, setPreloader] = useState(false);
  const selectedItemChat = useSelector(
    (state: reduxTypes) => state.chat.selectedChat,
  );

  console.log(selectedItemChat);

  function goBack() {
    navigator().toGoBack();
  }
  useEffect(() => {
    setPreloader(false);
    Chat.getChatMessages(dispatch, {
      pageIndex: 1,
      pageSize: 20,
      rootId: selectedItemChat.rootId === -1 ?  selectedItemChat.id : selectedItemChat.rootId,
    }).then(
      (succes) => {
        setPreloader(true);
        setTimeout(() => {
          Chat.goToBottom(global.scrollViewRef, false).then();
        }, 0);
      },
      (error) => {
        setPreloader(true);
        setTimeout(() => {
          Chat.goToBottom(global.scrollViewRef, false).then();
        }, 0);
      },
    );
    dispatch(
      chatMessagesPagination({
        pageIndex: 1,
        pageSize: 20,
      }),
    );
  }, [selectedItemChat]);
  return (
    <View style={styles.container}>
      <HeaderView
        icon={ICONS.arrowBackWhite}
        title={selectedItemChat.clientName}
        color={COLORS.HEADER_BLUE}
        ordersSettings={true}
        onPress={goBack}
        rightIcon={ICONS.phoneIcon}
        onPressRight={() =>Chat.goTell(selectedItemChat.clientPhone)}
      />
      <ChatView />
      <PreloaderChat isHide={preloader} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: hp(10),
  },
});
