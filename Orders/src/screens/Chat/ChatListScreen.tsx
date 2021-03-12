import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {ICONS, DRAWER_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {ChatListView} from '../../View/Chat/ChatListView';
import {useDispatch} from 'react-redux';
import {Chat} from '../../functions/Chat';
export const ChatListScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.warn('useEffect')
    Chat.getChatList(dispatch).then();
  }, []);

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
});
