import {GetOrderInfo} from '../functions/GetOrderInfo';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {getOrdersCount} from '../store/actions/Dictionaries';
import {navigator} from '../Core/Navigator';
import {Chat} from '../functions/Chat';
import {
  chatListPagination,
  selectedItemChatAction,
} from '../store/actions/Chat';
import {UserDataProvider} from "../DataProvider/UserDataProvider";

export const pushMessagesHandler = {
  userToken: null,
  selectedChatId: null,
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

  checkMessageType: function (remoteMessage, dispatch, data) {
    if (remoteMessage.data.hasOwnProperty('events')) {
      const parseMessageData = JSON.parse(remoteMessage.data.events);
      const messageEvent = parseMessageData[0];
      switch (messageEvent.eventType) {
        case 'event_loyaltyProg_orderCreate':
          this._getOrders(messageEvent.evendData, dispatch).then();
          this._getOrdersCount(messageEvent.evendData, dispatch).then();
          break;
        case 'event_loyaltyProg_messageAdd':
          console.log('this.isOpenBackground', this.isOpenBackground);
          if (this.isOpenBackground) {
            this._openChat(messageEvent.evendData, dispatch, data).then();
          } else {
            this._updateChat(messageEvent.evendData, dispatch).then();
          }
          break;
      }
    }
  },

  _getOrders: async function (evendData, dispatch) {
    await GetOrderInfo.getOrders(dispatch);
  },
  _getOrdersCount: async function (evendData, dispatch) {
    const response = await MethodsRequest.getOrdersNumber();
    if (response.statusCode === 200) {
      dispatch(getOrdersCount(response.result));
    }
  },
  _updateChat: async function (evendData, dispatch) {
    console.log('evendData _updateChat', evendData);
    console.log(
      'evendData navigator().getCurrentScreen()',
      navigator().getCurrentScreen(),
    );
    if (navigator().getCurrentScreen() === 'ChatScreen') {
      Chat.getChatMessages(dispatch, {
        pageSize: 20,
        pageIndex: 1,
        rootId: evendData.rootId,
      }).then();
    }
    if (navigator().getCurrentScreen() === 'ChatListScreen') {
      Chat.getChatList(dispatch).then();
    }
  },
  _openChat: async function (evendData, dispatch) {
    const list = await UserDataProvider.getListChats({ pageIndex: 1,
      pageSize: 10,
      isRead: -1});
    dispatch(
      chatListPagination({
        pageIndex: 1,
        pageSize: 10,
        isRead: -1,
      }),
    );
    console.log('evendData _openChat list', list);
    const chat = list.data.Items.filter(
      (item) =>
        (item.rootId === -1 ? item.id : item.rootId) === evendData.rootId,
    );
    console.log('evendData _openChat chat', chat);
    if (chat) {
      dispatch(selectedItemChatAction(chat[0]));
      navigator().navigate('ChatScreen');
    } else {
      navigator().navigate('ChatListScreen');
    }
  },
};
