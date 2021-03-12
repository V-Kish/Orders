import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {ICONS, DRAWER_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {ChatListView} from '../../View/Chat/ChatListView';
import {useDispatch, useSelector} from 'react-redux';
import {Chat} from '../../functions/Chat';
import {ChatSearch} from '../../View/Chat/ChatSearch';
import {
  paginationMainList,
  searchParam,
} from '../../store/actions/EditUserInfo';
import {
  chatListPagination,
  chatListSearchParamAction,
} from '../../store/actions/Chat';
import {reduxTypes} from '../../Types';
export const ChatListScreen = () => {
  const dispatch = useDispatch();
  // const chatListSearchParamSelector = useSelector(
  //     (state: reduxTypes) => state.chat.searchParam,
  // );
  // console.log('chatListSearchParamSelector',chatListSearchParamSelector)
  useEffect(() => {
    console.log('useEffect');
    Chat.getChatList(dispatch).then();
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
