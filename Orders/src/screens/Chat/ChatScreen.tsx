import React, {useEffect} from 'react';
import {View, StyleSheet,Text} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {DRAWER_ICONS, ICONS} from "../../constants/icons";
import {COLORS} from "../../constants/colors";
import {HeaderView} from "../../View/HeaderView/HeaderView";
import {useDispatch, useSelector} from "react-redux";
import {orderDataTypes, reduxTypes} from "../../Types";
import {Chat} from "../../functions/Chat";
import { ChatView } from '../../View/Chat/ChatView';
export const ChatScreen = () => {
const dispatch = useDispatch();
  const selectedItemChat = useSelector((state: reduxTypes) => state.chat.selectedChat);
  function goBack() {
    navigator().toGoBack();
  }
  console.warn(selectedItemChat)
  useEffect(()=>{
    Chat.getChatMessages(dispatch,{pageIndex:1,pageSize:20,rootId:selectedItemChat.rootId}).then();
  },[])
  return (
    <View style={styles.container}>
      <HeaderView
          icon={ICONS.arrowBackWhite}
          title={selectedItemChat.clientName}
          color={COLORS.HEADER_BLUE}
          ordersSettings={true}
          onPress={goBack}
          rightIcon={ICONS.callWhite}
          onPressRight={goBack}
      />
      <ChatView />
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
