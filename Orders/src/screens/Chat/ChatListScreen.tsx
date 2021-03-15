import React, {useEffect, useState} from 'react';
import {View, StyleSheet } from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import { DRAWER_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {ChatListView} from '../../View/Chat/ChatListView';
import {useDispatch} from 'react-redux';
import {Chat} from '../../functions/Chat';
import {ChatSearch} from '../../View/Chat/ChatSearch';
import {
  chatListPagination,
  chatListSearchParamAction,
} from '../../store/actions/Chat';
import {PreloaderChat} from "../../View/Chat/PreloderChat/PreloderChat";
export const ChatListScreen = () => {
  const dispatch = useDispatch();
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    setPreloader(false);
    Chat.getChatList(dispatch).then(
      (succes) => setPreloader(true),
      (error) => setPreloader(true),
    );
    dispatch(
      chatListPagination({
        pageIndex: 1,
        pageSize: 10,
        isRead: -1,
      }),
    );
  }, []);
  const handleTextChange = (text: string) => {
    Chat.getChatList(dispatch, text).then();
    dispatch(chatListSearchParamAction({searchText: text}));
  };
  function goBack() {
    navigator().toGoBack();
  }
  console.warn(preloader)
  return (
    <View style={styles.container}>
      <HeaderView
        icon={DRAWER_ICONS.burger}
        title="Чати та листування"
        color={COLORS.HEADER_BLUE}
        ordersSettings={true}
        onPress={() => navigator().openDrawer()}
      />
      <View style={styles.containerChat}>
        <ChatSearch changeCurrentText={handleTextChange} />
      </View>
      <ChatListView />
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
  containerChat: {
    height: hp(60),
    marginBottom: hp(5),
    paddingHorizontal: hp(10),
  },
});
