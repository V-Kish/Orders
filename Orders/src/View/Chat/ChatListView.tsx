import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

import {useDispatch, useSelector} from 'react-redux';
import { ChatListItem} from './ChatListItem';
import {reduxTypes, chatItem} from "../../Types";
import {GetOrderInfo} from "../../functions/GetOrderInfo";
import {Chat} from "../../functions/Chat";
import {COLORS} from "../../constants/colors";
import { FloatButton } from '../Components/FloatButon';

export const ChatListView = () => {
    const dispatch = useDispatch();
    const [statePreloader, setStatePreloader] = useState(true);
    const chatListInfo = useSelector((state: reduxTypes) => state.chat.chatListInfo);
    const paginationBody = useSelector((state: reduxTypes) => state.chat.paginationBody);
    const selectedChatUser = useSelector((state: reduxTypes) => state.clients.selectedChatUser);
    const chatListSearchParamSelector = useSelector(
        (state: reduxTypes) => state.chat.searchParam,
    );
    const loadDataMore = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 500;
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        );
    };
    async function loadMorePagination() {
        if (!(chatListInfo.PageIndex * chatListInfo.PageSize < chatListInfo.TotalItems)) {
            return;
        }
         setStatePreloader(false);
        let body = {};
        body.pageIndex = ++paginationBody.pageIndex;
        body.pageSize = paginationBody.pageSize;
        body.clientId = selectedChatUser.id;
        try {
          await  Chat.getChatList(dispatch, chatListSearchParamSelector.searchText,body,true).then();
             setStatePreloader(true);
        } catch (ex) {
             setStatePreloader(true);
        }
    }
  const ListChats = useSelector((state: reduxTypes) => state.chat.Items);
  return (
    <View style={styles.containers}>
      <ScrollView
          onScroll={async ({nativeEvent}) => {
            if (loadDataMore(nativeEvent) && statePreloader ) {
              await loadMorePagination();
            }
          }}
      >
        {ListChats.map((item : chatItem) => (
            <ChatListItem item={item} key={item.id}/>
        ))}
          {!statePreloader && (
              <View style={styles.preloader}>
                  <ActivityIndicator size="large" color={COLORS.HEADER_BLUE} />
              </View>
          )}
      </ScrollView>

    </View>
  );
};
const styles = StyleSheet.create({
  containers: {
    flex: 1,
  },
    preloader: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        height: hp(150),
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});
