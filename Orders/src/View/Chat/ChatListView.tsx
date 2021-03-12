import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

import {useDispatch, useSelector} from 'react-redux';
import { ChatListItem} from './ChatListItem';
import {reduxTypes, chatItem} from "../../Types";

export const ChatListView = () => {

  const ListChats = useSelector((state: reduxTypes) => state.chat.Items);
  console.log('ListChats',ListChats)
  return (
    <View style={styles.containers}>
      <ScrollView >
        {ListChats.map((item : chatItem) => (
            <ChatListItem item={item} key={item.id}/>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containers: {
    flex: 1,

  },
});
