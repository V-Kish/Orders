import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView,Text} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

import {useDispatch, useSelector} from 'react-redux';
import { ChatListItem} from './ChatListItem';
import {reduxTypes} from "../../Types";
import { Message } from './Message';
import { ChatInput } from '../Components/ChatInput';
import {Chat} from "../../functions/Chat";
import { Separator } from './Separator';



export const ChatView = () => {
    const dispatch = useDispatch();
    const listMessages = useSelector((state: reduxTypes) => state.chat.listMessages);
    const [height,setHeight] = useState({height:0});
    const ref = React.useRef(null);
    useEffect(()=>{
        setTimeout(()=>{
            Chat.goToBottom(ref,true).then()
        },100)
    },[])
  return (
    <View style={styles.containers}>
      <ScrollView ref={ref}>
        {listMessages.map((item ) => (
            <View key={item.id}>
                <Separator date={item.date} key={`${item.id} + ${item.date}`}/>
                <Message item={item} key={item.id}/>
            </View>
        ))}
        <View style={{height: height.height}} />
      </ScrollView>
        <ChatInput  setHeight={setHeight} refScroll={ref} />
    </View>
  );
};
const styles = StyleSheet.create({
  containers: {
    flex: 1,
  },
});
