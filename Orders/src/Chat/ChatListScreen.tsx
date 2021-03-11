import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
    Text,
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../constants/Dimensions';
import {COLORS} from '../constants/colors';
import {ChatListView} from './classes/ChatList';
import {listChatsProvider} from './components/ChatListProvider';
import {currentUser} from '../Core/CurrentUser';
import {store} from './provider/Store';
import {BaseScreen} from '../Common/BaseScreen';

import {controllers} from '../Controllers/Controllers';

class ChatListScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  get screenName(){
      return 'ChatListScreen'
  }

  async onFocus() {

    try {
        await super.onFocus();
        // controllers().bottomNavigation.btn4.counterModel.counter += 1
        // controllers().bottomNavigation.selectedIndex = 4;
        // controllers().bottomNavigation.forceUpdate();
          await listChatsProvider().Init(
            currentUser().userToken,
            async (result) => {
              controllers().updator.updateFromList(result)
              await store().contactsItems.loadContactsStat();
              await store().contactsItems.refresh(true);
              try {
                result.forEach((item) => {
                  if (item !== null) {
                    store().chats.addOrUpdate(item, false);
                  }
                });
              } catch (ex) {
                console.log('ChatListScreen load ex', ex);
              }
              console.log('chatListResult', result);
              await store().chats.reOrderChats();
              await store().chats.initUnchatedElements();
              store().chats.modified = true;
              store().chats.forceUpdate();
              store().preloader.visible = false;
              if (store().chats.messageMenu.visible) {
                store().chats.messageMenu.visible = false;
              }
            },
            (error) => {
              store().preloader.visible = false;
              store()
                .contactsItems.loadContactsStat()
                .then(() => {});
              console.log(
                'pushMessagesHandler.js -> _updateChatList ->  listChatsProvider().Init error: ',
                error,
              );
            },
            true,
          );
    } catch (e) {
      // console.log('catch error', e)
        try{
          store().preloader.visible = false;
          store()
            .contactsItems.loadContactsStat()
            .then(() => {});
        } catch(e){
            console.log('ex', e)
        }
    }
    }

  // handleBackPress = () => {
  //     navigator().toGoBack();
  //     return false;
  // }

  content() {
    return (
      <SafeAreaView
        style={styles.containerList}
        // onLayout={(event) => {
        //   const height = event.nativeEvent.layout.height;
        //   const width = event.nativeEvent.layout.width;
        //   if (height > navigator().deviceHeight) {
        //     // console.log('screenHeight', Dimensions.get('screen').height)
        //     // console.log('screenHeight2', height)
        //     navigator().deviceHeight = height;
        //     navigator().deviceWidth = width;
        //   }
        // }}
      >
          <Text>LIST CHAT</Text>
        {/*<UserScreenView withBackground={false} padding={false} id={'ChatListScreen'}>*/}
        {/*  <View style={styles.chatListContainer}>*/}
        {/*        <HeaderView*/}
        {/*          model={store().chatsHeader}*/}
        {/*          key={store().chatsHeader.id}*/}
        {/*        />*/}
        {/*        <ChatListView model={store().chats} key={store().chats.id} />*/}
        {/*  </View>*/}
        {/*</UserScreenView>*/}
      </SafeAreaView>
    );
  }
}

export {ChatListScreen};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(5),
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop: hp(15),
    paddingBottom: hp(15),
    // overflow: 'hidden'
    // backgroundColor: COLORS.FONT_WHITE,
  },
  button: {
    position: 'absolute',
    right: wp(20),
    bottom: hp(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  contactContainer: {
    backgroundColor: 'red',
    paddingVertical: hp(20),
  },
  containerList: {
    flex: 1,
    backgroundColor: 'red',
  },
  chatListContainer: {
    flex: 1,
    backgroundColor: COLORS.FONT_WHITE,
    marginBottom: hp(20)
    // backgroundColor: COLORS.RED.bg,
    // height: '80%'
  },
});
