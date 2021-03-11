import * as React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
    ScrollView,
  View,
  Platform,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {MessageListIOS} from './classes/MessageListIOS';
import {MessageList} from './classes/MessageList';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../constants/Dimensions';
import {MessageMenuView} from './ViewModel/Messages/MessageMenuView';
import {store} from './provider/Store';
import {BaseScreen} from '../Common/BaseScreen';
import {KeyboardInput} from './components/ChatInput/KeyboardInput';
import {navigator} from '../Core/Navigator';
import {ChatHeaderView} from './classes/ChatHeaderView';
import {CHAT_ICONS} from '../constants/icons';
import {controllers} from '../Controllers/Controllers';



const height = Dimensions.get('window').height;


class ChatScreen extends BaseScreen {
  private chatRef: any;

  constructor(props) {
    super(props);
    this.chatRef = React.createRef();
  }

  get screenName(){
      return 'ChatScreen';
  }

  async onFocus() {
    await super.onFocus();
    store().preloader.visible = false;
    store().chats.keyboard.emojiChat.keyboardDidHide();
    const chat = store().chats.current;
    if(chat===undefined || chat===null){
      return
    }
    // console.log('CHATID start')
    // await controllers().indicatorController.typingIndicator.connectToChatRoom(chat)
    // console.log('CHATID', chat)

    chat.items.reset();
    chat.items.firstLoad = false;
    // chat.items.newMessageIndicator.clearIndicator();
    // AppLog.log('onFocus2', store().chats.keyboard.emojiChat.resendMessage.out)
    chat.loadChatMembers()
    // AppLog.log('firstload start before');
    chat.items
      .load()
      .then(
        () => {
          // AppLog.log('firstload start');
          // chat.items.storage.forEach(item=>{
          //     console.log('chatMessage', item)
          // })
          chat.items.firstLoad = true;
          chat.items.modified = true;
          chat.items.forceUpdate(() => {
            const emojiChat = store().chats.keyboard.emojiChat;
            emojiChat.resetScrollViewHeight();
            chat.items.scrollToEnd();
            setTimeout(() => {
              // store().preloader.visible = false;
              chat.items.firstPreloader.hide();
              // controllers().preloader.hide();
            }, 200);
            setTimeout(() => {
              chat.items.firstPreloader.hide();
              // controllers().preloader.hide();
              // store().preloader.visible = false;
              // store().chats.current?.items.scrollToEnd()
            }, 300);
          });
        },
        (error) => {
          // controllers().preloader.hide();
          // AppLog.error('ChatScreen focus error => ', error);
          store().preloader.visible = false;
        },
      )
      .catch((error) => {
        // AppLog.error('ChatScreen focus error => ', error);
        store().preloader.visible = false;
      });
  }

    async onBlur(): Promise<void> {
        await super.onBlur();
        // controllers().indicatorController.typingIndicator.onExit()
        // store().chats.current.items.clearData()
        store().chatSettings.hide()
        store().chats.keyboard.emojiChat.keyboardFilePicker.update(true, true);
        store().chats.keyboard.emojiChat.keyboardFilePreview.update(true, true);
        if (!store().chats.keyboard.emojiChat.resendMessage.out) {
            store().chats.keyboard.emojiChat.showEmojiButton();
            store().chats.keyboard.emojiChat.showFilePickerButton();
            store().chats.keyboard.emojiChat.keyboardFilePreview.removeFile()
            store().chats.keyboard.emojiChat.chatInput.textBox.value = '';
            store().chats.keyboard.emojiChat.chatInput.selection = { start: 0, end: 0 };
            store().chats.keyboard.emojiChat.chatInput.inputToDefault();
        }
        const emojiChat = store().chats.keyboard.emojiChat;
        // if (emojiChat.emojiFieldVisible) {
        emojiChat.closeEmoji();
        // emojiChat.resetScrollViewHeight();
        store().chats.keyboard.emojiChat.keyboardDidHide();
        console.log('reseted')
        // }
        // store().chats.keyboard.emojiChat.resetScrollViewHeight()
        // store().chats.keyboard.emojiChat.emojiFieldVisible = false;
        // store().drawerControlsChat.component.closeDrawer();
    }

    handleBackPress = () => {
        // controllers().indicatorController.typingIndicator.onExit()
        store().chatSettings.hide()
        const emojiChat = store().chats.keyboard.emojiChat;
        if (emojiChat.emojiFieldVisible) {
            emojiChat.closeEmoji();
            emojiChat.resetScrollViewHeight();
            return true;
        }
        // if (navigator().getCurrentScreen() === 'ChatScreen'){
        //     navigator().navigate('ChatListScreen');
        //     return true
        // }
        // navigator().toGoBack();
        // return false;
        navigator().toGoBack();
        return true
    }

  // drawerComponent() {
  //     return (
  //         <DrawerContainerView model={store().chats.drawerContainer} key={store().chats.drawerContainer.id} />
  //     );
  // }

    content() {
    return (
      <>
        {/*// <ScreenView withBackground={false} padding={false}>*/}
        {/*<View style={styles.chatContainer}>*/}
        <View style={styles.container}>
            {/*<FakeView model={fakeHeightCC} id={'asdas'} key={'12'}/>*/}

            <View style={styles.header}>
                <ChatHeaderView
                    model={store().chatHeader}
                    key={store().chatHeader.id}
                    id={'ChatHeader'}
                />
            </View>
          <View style={styles.containerChat}>

            <Image
              style={styles.backgroundImg}
              // source={require('../assets/img/backCHAT/bg4.jpg')}>
              source={CHAT_ICONS.background}
            />
            <MessageMenuView
              model={store().chats.messageMenu}
              key={store().chats.messageMenu.id}
            />
            {Platform.OS === 'ios' ? (
              <MessageListIOS
                model={store().chats.current}
                key={store().chats.current.id}
              />
            ) : (
              <MessageList
                model={store().chats.current}
                key={store().chats.current.id}
              />
            )}
            <KeyboardInput
              model={store().chats.keyboard}
              key={store().chats.keyboard.id}
            />
          </View>
        </View>
      </>
    );
  }
}

export {ChatScreen};

const styles = StyleSheet.create({
  overlay: {
    opacity: 0.2,
  },
  containerChat: {
    justifyContent: 'flex-start',
    flex: 1,
    paddingBottom: hp(50),
  },
  container: {
    flex: 1,
  },
  header: {
    height: hp(60),
   // maxHeight: hp(60),
     backgroundColor: '#546CA9',
  },
  wrapScroll: {
   // paddingVertical: hp(22),
       paddingHorizontal: wp(11),
  },
  backgroundImg: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: height,
    position: 'absolute',
  },
  messageListPreloaderBig: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    //backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 10,
  },
  messageListPreloaderSmall: {
    position: 'absolute',
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 10,
  },
  messageListPreloaderText: {
    textAlign: 'center',
    marginTop: hp(15),
    color: 'red'

  },
  components: {
    // marginBottom:hp(50),
  },
  chatContainer: {},
});
