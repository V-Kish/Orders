import {GetOrderInfo} from '../functions/GetOrderInfo';
import {MethodsRequest} from '../DataProvider/MethodsRequest';
import {getOrdersCount} from '../store/actions/Dictionaries';

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

  checkMessageType: function (remoteMessage, dispatch) {
    console.log('remoteMessage', remoteMessage);
    if (remoteMessage.data.hasOwnProperty('events')) {
      const parseMessageData = JSON.parse(remoteMessage.data.events);
      const messageEvent = parseMessageData[0];
      switch (messageEvent.eventType) {
        case 'event_loyaltyProg_orderCreate':
          this._getOrders(messageEvent.evendData, dispatch).then();
          this._getOrdersCount(messageEvent.evendData, dispatch).then();
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
};