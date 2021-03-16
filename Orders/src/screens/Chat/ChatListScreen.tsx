import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {mockupHeightToDP as hp} from '../../constants/Dimensions';
import {navigator} from '../../Core/Navigator';
import {DRAWER_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {ChatListView} from '../../View/Chat/ChatListView';
import {useDispatch, useSelector} from 'react-redux';
import {Chat} from '../../functions/Chat';
import {ChatSearch} from '../../View/Chat/ChatSearch';
import {
  chatListPagination,
  chatListSearchParamAction,
} from '../../store/actions/Chat';
import {PreloaderChat} from '../../View/Chat/PreloderChat/PreloderChat';
import {FloatButton} from '../../View/Components/FloatButon';
import {ModalNewChat} from '../../View/Chat/ModalNewChat/ModalNewChat';
import {reduxTypes} from "../../Types";
import {ClearSelectedChat} from "../../store/actions/Clients";
import {showModalCreateNewChat} from "../../store/actions/AppStart";

export const ChatListScreen = () => {
  const dispatch = useDispatch();
    const selectedChatUser = useSelector((state: reduxTypes) => state.clients.selectedChatUser);
  const [preloader, setPreloader] = useState(false);


  useEffect(() => {
    setPreloader(false);
    let body = {
        pageIndex: 1,
        pageSize: 10,
        isRead: -1,
        clientId: -1,
    }
    Chat.getChatList(dispatch,'',body).then(
      (succes) => {
          console.log('getChatList succes',succes)
          setPreloader(true);
          if (selectedChatUser.id !== -1 && succes.length === 0){
              dispatch(showModalCreateNewChat(true))
          }
      },
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
      if (selectedChatUser.id !== -1 ){
          dispatch(ClearSelectedChat());
      }
    Chat.getChatList(dispatch, text).then();
    dispatch(chatListSearchParamAction({searchText: text}));
  };
  function goBack() {
    navigator().toGoBack();
  }
  const openModalCreateNewChat = () => {
      if (selectedChatUser.id === -1){
          navigator().navigate('CustomersScreen')
          return
      }
      dispatch(showModalCreateNewChat(true))
  };
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
      {/*// Float Button // */}
      <FloatButton clickFn={openModalCreateNewChat} />
      {/*// Modal Create new Chat // */}
      <ModalNewChat  />
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
