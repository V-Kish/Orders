import {controllers} from './Controllers';
import {currentUser} from '../Core/CurrentUser';
import {fetchData} from '../Common/fetchData';
import {store} from '../Chat/provider/Store';
import {listChatsProvider} from '../Chat/components/ChatListProvider';
import {CheckResponse} from '../Chat/functions/CheckResponse';
import {navigator} from '../Core/Navigator';
import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {baseResponse} from '../DataTypes/BaseTypes';


export const pushMessagesHandler = {
  userToken: null,
  background: null,
  isOpenBackground: false,

  dependencies: function (userToken, background) {
    this.userToken =
      typeof userToken === 'undefined' ? this.userToken : userToken;
    this.background =
      typeof background === 'undefined' ? this.background : background;
  },
  setBackground: function (status) {
    this.background = status;
  },

  setIsOpenBackground: function (bool) {
    this.isOpenBackground = bool;
  },
  checkMessageNotificationOpenedAppType: function (remoteMessage) {
    console.log('parseMessageData 1', remoteMessage);
    if (remoteMessage.data.hasOwnProperty('events')) {
      const parseMessageData = JSON.parse(remoteMessage.data.events);
      console.log('parseMessageData 2', parseMessageData);
      const messageEvent = parseMessageData[0];
      console.log('parseMessageData 3', messageEvent);
      switch (messageEvent.eventType) {
        // case 'event_osbb_timeLine_newItem':
        //   this._navigateToTimeLine(messageEvent.evendData).then();
        //   break;
        default:
          navigator().startAppWithBackground = false;
          break;
      }
    }
    console.log('parseMessageData 4', remoteMessage);
    // chats
    if (remoteMessage.data.hasOwnProperty('sEvent')) {
      const parseMessageData = JSON.parse(remoteMessage.data.sEvent);
      console.log('parseMessageData 5', parseMessageData);
      const messageEvent = parseMessageData[0];
      console.log('parseMessageData 6', messageEvent);
      switch (messageEvent.eventType) {
        case 'event_chat_newMessage':
          this._openChat(messageEvent.evendData);
          break;
        default:
          navigator().startAppWithBackground = false;
          break;
      }
    }
  },
  checkMessageType: function (remoteMessage) {
    console.log('remoteMessage', remoteMessage);
    if (remoteMessage.data.hasOwnProperty('events')) {
      const parseMessageData = JSON.parse(remoteMessage.data.events);
      console.log('remoteMessage parseMessageData', parseMessageData);
      const messageEvent = parseMessageData[0];
      console.log('remoteMessage messageEvent', messageEvent);
      switch (messageEvent.eventType) {
        // case 'event_osbb_verifyStatusChange':
        //   this._updateMainOsbbList().then();
        //   break;
      }
    }
    // CHAT EVENTS
    if (remoteMessage.data.hasOwnProperty('sEvent')) {
      console.log('remoteMessage Chat', remoteMessage);
      const parseMessageData = JSON.parse(remoteMessage.data.sEvent);
      const messageEvent = parseMessageData[0];
      console.log('remoteMessage messageEvent Chat', messageEvent);
      switch (messageEvent.eventType) {
        case 'event_chat_user_leaveChat':
          return this._userLeaveChat(messageEvent.evendData);
        case 'event_user_isOnline':
          return this._userIsOnline(messageEvent.evendData);
        case 'event_chat_newMessage':
          console.log('this.background', !this.background);
          if (!this.background) {
            this._updateMessageList(messageEvent.evendData);
            this._updateNewMessageIndicator(messageEvent.evendData);
          }
          this._updateChatList(messageEvent.evendData);
          break;
        case 'event_chat_NewMemberAdd':
          if (!this.background) {
            this._updateMessageList(messageEvent.evendData);
          }
          this._updateChatList(messageEvent.evendData);
          break;
        case 'event_chat_Create':
          return this._updateChatList(messageEvent.evendData);
        case 'event_chat_user_enterInToChat':
          return this._userEnteredChat(messageEvent.evendData);
        case 'event_chat_removeMessage':
          this._removeMessage(messageEvent.evendData);
          this._updateChatList();
          break;
        case 'event_user_changedAvatar':
          this._updateUserIcon(messageEvent.evendData);
          break;
        case 'event_user_isOffline':
          return this._userIsOffline(messageEvent.evendData);
        case 'event_chat_MemberRemoved':
          this._userRemovedFromChat(messageEvent.evendData);
          this._updateChatList(messageEvent.evendData);
          break;
        case 'event_chat_editMessage':
          if (navigator().getCurrentScreen() === 'Chat') {
            store().chats.keyboard.emojiChat.setEditing();
            this._chat_editMessage(messageEvent.evendData);
          } else if (navigator().getCurrentScreen() === 'Contacts') {
            this._updateChatList();
          }

          break;
        case 'event_chat_Renamed':
          return this._updateChatList(messageEvent.evendData);
        case 'event_chat_Removed':
          this._userDeletedChat(messageEvent.evendData);
          break;
      }
    }
  },

  // CHAT PUSH MESSAGES
  _updateUserIcon(eventData) {
    try {
      store()
        .contacts.list.items.find((user) => user.value.id === eventData.userId)
        .updatePhoto(eventData.hash);
    } catch (e) {}
    try {
      store()
        .chats.storage.find((chat) => chat.pairUser.id == eventData.userId)
        .photo.updatePhoto(eventData.hash);
    } catch (e) {}
  },
  _removeMessage(eventData) {
    store()
      .chats.get(eventData.gropId || eventData.groupId)
      .deleteMessage(eventData.messageId || eventData.messageId);
  },

  _updateChatList: function (eventData) {
    listChatsProvider().Init(
      currentUser().userToken,
      (result) => {
        const chats = store().chats;
        // console.log('_updateChatList result', result);
        result.forEach((item) => {
          chats.addOrUpdate(item, false);
          try {
            chats.removeUnchatedContacts(item);
          } catch (e) {}
        });
        chats.reOrderChats();
        if (navigator().getCurrentScreen() === 'ChatListScreen') {
          chats.reOrderChats();
          chats.modified = true;
          chats.forceUpdate();
        }
      },
      (data) => {},
      true,
    );
  },

  _chat_editMessage: async function (eventData) {
    const groupId = eventData.gropId || eventData.groupId;
    if (store().chats.current === null) {
      return;
    }
    if (groupId.toString() === store().chats.current.id) {
      const chat = store().chats.get(groupId.toString());
      await chat.items.loadOneMessage(eventData.messageId - 1);
    }
  },
  _reloadMessageList: function () {
    // console.log('reloadMessage');
    fetchData(
      `${currentUser().userToken}/${currentUser().currentOsbb?.hash}/chat/${
        this.selectedChatId
      }/messages/load`,
      'post',
      {
        pageSize: this.conversation.length,
        pageIndex: 1,
      },
      null,
      null,
      true,
    )
      .then(
        (resolve) => CheckResponse(resolve),
        (error) => {
          console.log('loadConversation', error);
          throw 500;
        },
      )
      .then(
        (resolve) => {
          // console.log('_reloadMessageList');
          // this.dispatch(preloader(false));
          // if (resolve.result) {
          //   this.dispatch(
          //       LoadConversationDispatch(resolve.result.items.reverse(), -2, 1),
          //       global.pushMessagesHandler._updateChatList,
          //   );
          // }
        },
        (error) => {
          if (error === 500) {
            // this.dispatch(preloader(false));
          }
        },
      );
  },

  // _userIsOnline: function (eventData) {
  //   console.log('_userIsOnline', store().contactsItems.get(eventData.userId));
  //   try {
  //     if (currentUser().isTokenValid) {
  //       const contact = store().contactsItems.get(eventData.userId);
  //       contact.isOnline.update(
  //         {
  //           isOnline: true,
  //           isOnlineDate: moment(new Date()).format('DD.MM.YYYYTHH:MM:ss'),
  //         },
  //         true,
  //       );
  //       if (store().chats.current !== null) {
  //         const find = store().chats.current.users.findIndex(
  //           (current) => current.id === contact.id,
  //         );
  //         if (navigator().getCurrentScreen() === 'ChatScreen' && find !== -1) {
  //           store().chatHeader.modified = true;
  //           store().chatHeader.forceUpdate();
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     console.log('_userIsOnline error', e);
  //   }
  // },
  _goToDetailScreen: async function (eventData, stackScreen) {
    console.log('_goToDetailScreeneventData', eventData);
    const response = await loadData<baseResponse<osbbVoteItem>>(
      UserDataProvider.getTimeLineItem,
      {
        typeId: eventData.typeId,
        isAdmin: true,
        osbbHash: eventData.osbbHash,
        originalId: eventData.originalId,
      },
    );
    if (response.statusCode === 200) {
      if (eventData.typeId === 1) {
        controllers().userController.timeLineDetail.item = new TimeLineItemNewsModel(
          response.data,
        );
      }
      if (eventData.typeId === 2) {
        controllers().userController.timeLineDetail.item = new TimeLineItemMessagesModel(
          response.data,
        );
      }
      if (eventData.typeId === 3) {
        controllers().userController.timeLineDetail.item = new TimeLineItemVotesModel(
          response.data,
        );
      }
      navigator().navigate(stackScreen, {
        screen: 'TimeLineDetailScreen',
        // key: new Date().getTime(),
        swipeEnabled: true,
        data: {},
      });
      controllers().drawerSwitch.modified = true;
      controllers().drawerSwitch.forceUpdate();
    }
  },
  _userIsOffline: function (eventData) {
    console.log('_userIsOffline', store().contactsItems.get(eventData.userId));
    try {
      if (currentUser().isTokenValid) {
        const contact = store().contactsItems.get(eventData.userId);
        contact.isOnline.update(
          {
            isOnline: false,
            isOnlineDate: moment(new Date()).format('DD.MM.YYYYTHH:mm:ss'),
          },
          true,
        );
        if (store().chats.current !== null) {
          const find = store().chats.current.users.findIndex(
            (current) => current.id === contact.id,
          );
          if (navigator().getCurrentScreen() === 'ChatScreen' && find !== -1) {
            store().chatHeader.modified = true;
            store().chatHeader.forceUpdate();
          }
        }
      }
    } catch (e) {
      console.log('_userIsOffline error', e);
    }
  },

  _userEnteredChat: function (eventData) {
    return;
  },

  _userLeaveChat: function (eventData) {
    return;
  },

  _updateNewMessageIndicator(eventData) {
    try {
      const groupId = eventData.gropId || eventData.groupId;
      if (
        groupId === store().chats.selectedChatId &&
        navigator().getCurrentScreen() === 'ChatScreen'
      ) {
        if (store().chats.current.items.newMessageIndicator.lastIndex > 3) {
          store().chats.current.items.newMessageIndicator.iterateNewMessages();
        }
      }
    } catch (e) {
      console.log('_updateNewMessageIndicator error', e);
    }
  },

  _updateMessageList: function (eventData) {
    try {
      const groupId = eventData.gropId || eventData.groupId;

      if (
        groupId === store().chats.selectedChatId &&
        navigator().getCurrentScreen() === 'ChatScreen'
      ) {
        // console.log('_updateMessageList', true);
        store()
          .chats.current.items.loadNewMessages(() => {
            try {
              if (
                store().chats.current.items.newMessageIndicator.lastIndex < 4
              ) {
                store().chats.current.items.newMessageIndicator.clearIndicator();
                store().chats.current.items.dataSource.endScroll();
              }
            } catch (ex) {
              console.log('event_chat_newMessage ex', ex);
            }
            // store()
            // .chats.current.items.iconized()
            // .then();
          })
          .then()
          .catch((ex) => {
            console.error('_updateMessageList catch ->', ex);
          });
      }
    } catch (e) {
      console.log('_updateMessageList error', e);
    }
  },
  _openChat: async function (eventData) {
    // step 1
    try {
      const osbbLeaderResponse = await loadData<baseResponse<any>>(
        UserDataProvider.getOsbbLeader,
        {osbbHash: eventData.osbbHash},
      );
      // step 2
      const getOsbbRepsonse = await loadData<baseResponse<any>>(
        UserDataProvider.getInfoOsbb,
        {osbbHash: eventData.osbbHash},
      );
      console.log('getOsbbRepsonse', getOsbbRepsonse);
      if (getOsbbRepsonse.statusCode !== 200) {
        return;
      }
      currentUser().saveOsbb(getOsbbRepsonse.data);
      if (osbbLeaderResponse.data.userHash === currentUser().userHash) {
        console.log('osbbLeaderResponse mainStack');
        navigator().pushScreenToHistory({
          name: 'OsbbAdminStack',
          params: {
            screen: 'AdminScreen',
            swipeEnabled: true,
          },
        });
        navigator().navigate('OsbbAdminStack', {
          screen: 'ChatListScreen',
          // key: new Date().getTime(),
          swipeEnabled: true,
          data: {},
        });
        currentUser().isAdminOsbb = true;
        controllers().drawerSwitch.modified = true;
        controllers().drawerSwitch.forceUpdate();
      } else {
        currentUser().isAdminOsbb = false;
        controllers().bottomNavigation.selectedIndex = 3;
        navigator().pushScreenToHistory({
          name: 'MainStack',
          params: {
            screen: 'HomeScreen',
            swipeEnabled: true,
          },
        });
        navigator().navigate('MainStack', {
          screen: 'ChatListScreen',
          // key: new Date().getTime(),
          swipeEnabled: true,
          data: {},
        });
        controllers().userController.userHome.loadTimeLineList(true);
        controllers().drawerSwitch.modified = true;
        controllers().drawerSwitch.forceUpdate();
      }
      console.log('_openChatosbbLeaderResponse', osbbLeaderResponse);
    } catch (e) {
      console.log('_openChat e', e);
    }
  },
  _userRemovedFromChat: function (eventData) {
    console.log('_userRemovedFromChat', eventData);
    if (
      eventData.groupId === store().chats.selectedChatId &&
      eventData.removedUserId === currentUser().userId &&
      navigator().getCurrentScreen() === 'ChatScreen'
    ) {
      console.log('_userRemovedFromChat 1 ', eventData);
      store().chats.remove(eventData.groupId);
      console.log('_userRemovedFromChat  1.1 ', store().chats.storage);
      store().chats.reOrderChats();
      store().chats.modified = true;
      store().chats.forceUpdate();
      store().chatSettings.hide();
      navigator().toGoBack();
      //store().preloader.visible = true;
      // navigator().navigate('Chat', {
      //   screen: 'ContactsScreen',
      //   data: {},
      //   key: new Date().getTime(),
      // });
      store().preloader.visible = false;
    }
    if (
      eventData.removedUserId === currentUser().userId &&
      eventData.groupId !== store().chats.selectedChatId
    ) {
      console.log('_userRemovedFromChat 2 ', eventData);
      store().chats.remove(eventData.groupId);
      store().chats.reOrderChats();
      store().chats.modified = true;
      store().chats.forceUpdate();
    }
    if (
      eventData.groupId === store().chats.selectedChatId &&
      eventData.removedUserId !== currentUser().userId
    ) {
      console.log('_userRemovedFromChat 3 ', eventData);
      store().chats.get(eventData.groupId).deleteUser(eventData.removedUserId);
      store().chats.current.chatMembersList.modified = true;
      store().chats.current.chatMembersList.forceUpdate();
      this._updateChatList(eventData.removedUserId);
    }
  },

  _userDeletedChat(eventData) {
    const groupId = eventData.gropId || eventData.groupId;
    if (
      groupId === store().chats.selectedChatId &&
      navigator().getCurrentScreen() === 'ChatScreen'
    ) {
      store().chats.remove(groupId.toString());
      store().chats.selectedChatId = null;
      store().chats.reOrderChats();
      store().chats.modified = true;
      store().chats.forceUpdate();
      store().chatSettings.hide();
      navigator().toGoBack();
      //store().preloader.visible = true;
      // navigator().navigate('ChatListScreen', {
      //   screen: 'ChatListScreen',
      //   data: {},
      //   key: new Date().getTime(),
      // });
    } else {
      store().chats.remove(groupId.toString());
      store().chats.reOrderChats();
      store().chats.modified = true;
      store().chats.forceUpdate();
      store().chats.selectedChatId = null;
      this._updateChatList();
    }
  },

  loadConversation: function (
    chatId,
    conversation,
    body = {
      pageIndex: 1,
      pageSize: 20,
    },
  ) {
    if (typeof chatId !== 'undefined' && chatId !== null) {
      console.log('_updateChatList2');
      let url = `${currentUser().userToken}/${
        currentUser().currentOsbb?.hash
      }/chat/${chatId}/messages/load`;
      let items = conversation;
      if (
        typeof items !== 'undefined' &&
        items.length !== 0 &&
        body.pageIndex === 1
      ) {
        let messageFromId = -1;
        for (let i = items.length - 1; i >= 0; i--) {
          if (items[i].messageType !== 200 && items[i].id > 0) {
            messageFromId = items[i].id;
            break;
          }
        }
        url = `${this.userToken}/${
          currentUser().currentOsbb?.hash
        }/chat/${chatId}/messages//load-from/${messageFromId}`;
        body.messageFromId = messageFromId;
      }
      fetchData(url, 'post', body, null, null, true)
        .then(
          (resolve) => CheckResponse(resolve),
          (error) => console.log('loadConversation', error),
        )
        .then((resolve) => {
          if (resolve.result) {
          } else {
            console.log('loadConversation error');
          }
        });
    }
  },
  loadChatMembers: async function (chatId, callBack) {
    try {
      const response = await fetchData(
        `${this.userToken}/${
          currentUser().currentOsbb?.hash
        }/chat/${chatId}/members`,
        'get',
        null,
        null,
        null,
        true,
      );
      const checked = CheckResponse(response);
      if (checked.hasOwnProperty('result')) {
        // this.dispatch(AddChatUsers(checked.result));
        callBack(checked.result);
      }
    } catch (e) {
      throw e;
    }
  },

  loadMembersInfo: function (data) {
    if (!data) {
      return;
    }
    const usersId = [];
    data.forEach((item) => usersId.push(item));
    usersId.forEach((item) =>
      fetchData(
        `${currentUser().userToken}/${currentUser().currentOsbb?.hash}/user/${
          item.id
        }/isOnline`,
        'get',
        null,
        null,
        null,
        true,
      )
        .then(
          (response) => CheckResponse(response),
          (error) => {
            console.log('loadMembersInfo', error);
            throw 500;
          },
        )
        .then(
          (response) => {
            if (response.hasOwnProperty('result')) {
              // this.dispatch(AddUsersStatus(response.result, item.id));
            }
          },
          (error) => console.log('loadMembersInfo', error),
        ),
    );
  },
};
