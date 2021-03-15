import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from '../../Types';
import {Message} from './Message';
import {ChatInput} from '../Components/ChatInput';
import {Chat} from '../../functions/Chat';
import {Separator} from './Separator';
import ScrollView from '../../View/Chat/ScrollAndroid/NativeScrollView';
import { PreloaderPaginationChat } from './PreloderChat/PreloderPaginationChat';

export const ChatView = () => {
  const dispatch = useDispatch();
  const [statePreloader, setStatePreloader] = useState(true);
  const listMessages = useSelector(
    (state: reduxTypes) => state.chat.listMessages,
  );
  const chatListMessagesInfo = useSelector(
    (state: reduxTypes) => state.chat.chatListMessagesInfo,
  );
  const paginationBodyMessage = useSelector(
    (state: reduxTypes) => state.chat.paginationBodyMessage,
  );
  const selectedItemChat = useSelector(
    (state: reduxTypes) => state.chat.selectedChat,
  );
  const [height, setHeight] = useState({height: 0});
  let ref = React.useRef(null);
  useEffect(() => {
    setTimeout(() => {
      Chat.goToBottom(ref, false).then();
    }, 500);
  }, []);
  const loadDataMore = ({layoutMeasurement, contentOffset, contentSize}) => {
    if (contentOffset.y === 0) {
      return true;
    }
  };

  async function loadMorePagination() {
    if (
      !(
        chatListMessagesInfo.PageIndex * chatListMessagesInfo.PageSize <
        chatListMessagesInfo.TotalItems
      )
    ) {
      return;
    }
    setStatePreloader(false);
    let body = {};
    body.pageIndex = ++paginationBodyMessage.pageIndex;
    body.pageSize = paginationBodyMessage.pageSize;
    try {
      await Chat.getChatMessages(
        dispatch,
        {
          pageSize: body.pageSize,
          pageIndex: body.pageIndex,
          rootId: selectedItemChat.rootId,
        },
        true,
      ).then();
      setStatePreloader(true);
    } catch (ex) {
      setStatePreloader(true);
    }
  }

  return (
    <View style={styles.containers}>
      <ScrollView
        key={`${selectedItemChat.rootId}_chat`}
        forwardedRef={(refSc) => {
          // console.log('render ScrollView refSc', refSc);
          ref = refSc;
          global.scrollViewRef = refSc;
        }}
        onScroll={async ({nativeEvent}) => {
          console.log('nativeEvent',nativeEvent)
          if (loadDataMore(nativeEvent) && statePreloader) {
            await loadMorePagination();
          }
        }}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}>
        {listMessages.map((item) => (
          <View key={item.id}>
            <Separator date={item.date} key={`${item.id} + ${item.date}`} />
            <Message item={item} key={item.id} />
          </View>
        ))}
        <View style={{height: height.height}} />
      </ScrollView>
      <ChatInput setHeight={setHeight} refScroll={ref} />
      <PreloaderPaginationChat isHide={statePreloader}/>
    </View>
  );
};
const styles = StyleSheet.create({
  containers: {
    flex: 1,
  },
});
