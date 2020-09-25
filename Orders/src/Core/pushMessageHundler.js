import {navigator} from './Navigator';

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

  checkMessageType: function (remoteMessage) {
    console.log('remoteMessage', remoteMessage);
    if (remoteMessage.data.hasOwnProperty('events')) {
      const parseMessageData = JSON.parse(remoteMessage.data.events);
      const messageEvent = parseMessageData[0];
      switch (messageEvent.eventType) {
        case 'event_loyaltyProg_rateChange':
          if (navigator().getCurrentScreen() === 'Chat') {
            this._updateListOfMessage('rate').then();
          }
          break;
      }
    }
  },

  _updateListOfMessage: async function (type: string) {},
};
