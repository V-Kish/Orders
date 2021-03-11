import {controllers} from './Controllers';
import {currentUser} from '../Core/CurrentUser';
import {fetchData} from '../Common/fetchData';
import {store} from '../Chat/provider/Store';
import {listChatsProvider} from '../Chat/components/ChatListProvider';
import {CheckResponse} from '../Chat/functions/CheckResponse';
import {navigator} from '../Core/Navigator';
import moment from 'moment';
import {loadData, UserDataProvider} from '../DataProvider/UserDataProvider';
import {baseResponse} from '../DataTypes/BaseTypes';
import {osbbVoteItem} from '../DataTypes/OsbbTimeLine/osbbVotes';
import {TimeLineItemNewsModel} from '../Models/MainStack/TimeLineList/TimeLineItemNewsModel';
import {TimeLineItemVotesModel} from '../Models/MainStack/TimeLineList/TimeLineItemVotesModel';
import {TimeLineItemMessagesModel} from '../Models/MainStack/TimeLineList/TimeLineItemMessagesModel';
import {StatementOfResidentsItemModel} from '../Models/MainStack/StatementOfResidentsList/StatementOfResidentsItemModel';
import {JoinStatementItemModel} from '../Models/JoinStatementModel/JoinStatementItemModel';
import Analytics from '../Models/Analytics/Analytics';

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
      try {
        Analytics.logEvent('NotificationOpened', {
          title: messageEvent.evendData.title
        })
      } catch(e){
        console.log('NotificationOpened analitycs', e)
      }
      switch (messageEvent.eventType) {
        case 'event_osbb_timeLine_newItem':
          this._navigateToTimeLine(messageEvent.evendData).then();
          break;
        case 'event_osbb_timeLine_eventRemind':
          this._navigateToRemind(messageEvent.evendData).then();
          break;
        // { // Зміна статуса заявки мешканців // }
        case 'event_issues_statusChange':
          this._goToStatementScreen(messageEvent.evendData).then();
          break;
        // { // Нова заявка від корисувача // }
        case 'event_issues_new':
          this._goToStatementNewOrderScreen(messageEvent.evendData).then();
          break;
        // { // Голова додає до осбб мешканців }
        case 'event_usersMapping_add':
          navigator().startAppWithBackground = false;
          this._updateMainOsbbList();
          break;
        // { // Сповіщення про новий рахунок  }
        case 'event_osbb_apartmentBilling':
          this._goToMyBalance(messageEvent.evendData);
          break;
        // { // Нова заявка на приєднання  для  голови // }
        case 'event_osbb_membersVerifyNew':
          this._goToJoinStatementScreen(messageEvent.evendData);
          // show modal
          break;
        // { // Зміна статуса ОСББ для мешканця // }
        case 'event_osbbMembersVerify_statusChange':
          this._goToChoseOsbbScreen();
          break;
        // { // Зміна файлів // }
        case 'events_documents_new':
          this._goToOssbDocumentsScreen(messageEvent.evendData);
          break;
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
        case 'event_osbb_verifyStatusChange':
          this._updateMainOsbbList().then();
          break;
        // { // Запланована подія // }
        case 'event_osbb_timeLine_eventRemind':
          if (this.background) {
            return;
          }
          this._showModalReminder(messageEvent.evendData);
          // show modal
          break;
        // { // Зміна статуса заявки мешканців // }
        case 'event_issues_statusChange':
          if (this.background) {
            return;
          }
          this._updateStatementList();
          // show modal
          break;
        // { // Зміна статуса ОСББ для мешканця // }
        case 'event_osbbMembersVerify_statusChange':
          if (this.background) {
            return;
          }
          this._updateMainOsbbList();
          break;
        // { // Голова додає до осбб мешканців }
        case 'event_usersMapping_add':
          if (this.background) {
            return;
          }
          this._updateUsersList();
          this._updateMainOsbbList();
          break;
        // { // Нова заявка для  голови // }
        case 'event_issues_new':
          if (this.background) {
            return;
          }
          this._updateStatementList();
          break;
        // { // Нова заявка на приєднання  для  голови // }
        case 'event_osbb_membersVerifyNew':
          if (this.background) {
            return;
          }
          this._updateJoinStatementList();
          // show modal
          break;
        // { // Баланс оновився // }
        case 'event_balanceChange':
          this._onBalanceChange(messageEvent.evendData);
          // show modal
          break;
        //додано новий запис у стрічку
        case 'event_osbb_timeLine_newItem':
          if (this.background) {
            return;
          }
          this._updateTimeLineList(messageEvent.evendData);
          break;
        //Видалено  запис з стрічки
        case 'event_osbb_timeLine_remove':
          if (this.background) {
            return;
          }
          this._updateTimeLineList(messageEvent.evendData);
          break;
        // Оновити список будинків
        case 'event_osbb_houses_reload':
          if (this.background) {
            return;
          }
          this._updateApartmentsHousesList();
          break;
        // Оновити список приміщення
        case 'event_osbb_apartments_reload':
          if (this.background) {
            return;
          }
          this._updateApartmentsHousesList();
          break;
        // Додавання файлу та документу
        case 'events_documents_new':
          if (this.background) {
            return;
          }
          this._updateFiles();
          break;
        // Показувати або ховати боржинків
        case 'event_osbb_settingsChage':
          if (this.background) {
            return;
          }
          this._isShowDebtors(messageEvent.evendData);
          break;
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
  _updateMainOsbbList: async function () {
    await controllers().confirmOssbController.chooseOssb.osbbList.loadData(
      '',
      true,
    );
  },
  _updateUsersList: async function () {
    if (navigator().getCurrentScreen() === 'OsbbControllScreen') {
      if (
        controllers().osbbAdminController.osbbControllScreen.tabs.getCurrentTabId() ===
        'peopleTab'
      ) {
        await controllers().osbbAdminController.osbbControllScreen.tabs.userMappingSearch(
          '',
        );
      }
    }
  },
  // Оновити список приміщення
  _updateApartmentsHousesList: async function () {
    try {
      controllers().authController.login.getInformationAboutUser();
      if (navigator().getCurrentScreen() === 'OsbbControllScreen') {
        if (
          controllers().osbbAdminController.osbbControllScreen.tabs.getCurrentTabId() ===
          'mainTab'
        ) {
          await controllers().osbbAdminController.osbbControllScreen.tabs.findHouses();
        }
        if (
          controllers().osbbAdminController.osbbControllScreen.tabs.getCurrentTabId() ===
          'keyTab'
        ) {
          await controllers().osbbAdminController.osbbControllScreen.tabs.findApartments();
        }
      }
    } catch (ex) {
      console.log('PUSH _updateApartmentsList', ex);
    }
  },
  // Показувати або ховати Боржників
  _isShowDebtors: async function (evendData) {
    try {
      if (currentUser().currentOsbb?.hash === evendData.osbbHash) {
        await controllers().osbbAdminController.settings.dictionariesInit();
      }
    } catch (ex) {
      console.log('PUSH Message _isShowDebtors', ex);
    }
  },
  // Оновити список файлів
  _updateFiles: async function () {
    try {
      // update files list
      if (navigator().getCurrentScreen() === 'OssbDocumentsScreen') {
        await controllers().userController.osbbDocuments.loadDocuments();
      }
    } catch (ex) {
      console.log('PUSH _updateFiles', ex);
    }
  },
  // Відкрити екран файлів
  _goToOssbDocumentsScreen: async function (evendData) {
    try {
      const isLead = await this._getOsbbAndLead(evendData);
      switch (isLead) {
        case 'Admin':
          // 1) AdminScreen history
          navigator().pushScreenToHistory({
            name: 'OsbbAdminStack',
            params: {
              screen: 'AdminScreen',
              swipeEnabled: true,
            },
          });
          // navigation admin stack
          navigator().navigate('OsbbAdminStack', {
            screen: 'OssbDocumentsScreen',
            // key: new Date().getTime(),
            swipeEnabled: true,
            data: {},
          });
          break;
        case 'User':
          // 1) AdminScreen history
          navigator().pushScreenToHistory({
            name: 'MainStack',
            params: {
              screen: 'HomeScreen',
              swipeEnabled: true,
            },
          });
          // navigation user stack
          navigator().navigate('MainStack', {
            screen: 'OssbDocumentsScreen',
            // key: new Date().getTime(),
            swipeEnabled: true,
            data: {},
          });
          break;
        default:
          // main screen
          await this._goToChoseOsbbScreen();
          break;
      }
    } catch (ex) {
      await this._goToChoseOsbbScreen();
      console.log('PUSH _updateFiles', ex);
    }
  },
  // Заявки мешканців
  _updateStatementList: async function () {
    controllers().updator.loadRequestCounters()
    if (navigator().getCurrentScreen() === 'StatementOfResidentsMainScreen') {
      await controllers().statementOfResidentsController.mainScreen.loadStatementList();
    }
    await controllers().userController.userHome.loadTimeLineList(false, true);
  },
  // Заявки на приєднання для голови
  _updateJoinStatementList: async function () {
    if (navigator().getCurrentScreen() === 'JoinStatementsScreen') {
      await controllers().osbbAdminController.joinStatementModel.loadStatementList();
    }
  },
  // Оновлення стрічки
  _updateTimeLineList: async function (evendData) {
    if (currentUser().currentOsbb === null) {
      return;
    }
    if (evendData.typeId === 1) {
      await controllers().osbbAdminController.newsModel.newsMainPage.loadNewsList(
        true,
      );
    }
    if (evendData.typeId === 2) {
      await controllers().osbbAdminController.messagesModel.messagesMainPage.loadMessagesList(
        true,
      );
    }
    if (evendData.typeId === 3) {
      await controllers().osbbAdminController.votesModel.votesMainPage.loadVotesList(
        true,
      );
    }
    if (currentUser().isAdminOsbb === false) {
      controllers().userController.userHome.loadTimeLineList(false, true);
      if (evendData.typeId === 1) {
        controllers().userController.userNewsModel.loadUserNewsList(true);
      } else if (evendData.typeId === 2) {
        controllers().userController.userEventsModel.loadUserEventsList(true);
      } else if (evendData.typeId === 3) {
        controllers().userController.userVotesModel.loadUserVotesList(true);
      }
    }
  },
  _goToChoseOsbbScreen: async function () {
    try {
      await this._updateMainOsbbList();
    } catch (ex) {
      console.log('push _goToChoseOsbbScreen ex', ex);
    }
    navigator().toConfirmOssbStack();
  },
  _getOsbbAndLead: async function (evendData) {
    try {
      // get osbb
      const getOsbbRepsonse = await loadData<baseResponse<any>>(
        UserDataProvider.getInfoOsbb,
        {osbbHash: evendData.osbbHash},
      );
      if (getOsbbRepsonse.statusCode === 200) {
        // save osbb
        currentUser().saveOsbb(getOsbbRepsonse.data);
        // get osbb lead
        const osbbLeaderResponse = await loadData<baseResponse<any>>(
          UserDataProvider.getOsbbLeader,
          {osbbHash: evendData.osbbHash},
        );
        if (osbbLeaderResponse.statusCode === 200) {
          if (osbbLeaderResponse.data.userHash === currentUser().userHash) {
            // Admin
            currentUser().isAdminOsbb = true;
            return 'Admin';
          } else {
            // user
            currentUser().isAdminOsbb = false;
            return 'User';
          }
        }
        return null;
      }
      return null;
    } catch (ex) {
      return null;
      console.log('PUSH _getOsbbAndLead ex', ex);
    }
  },
  _goToStatementScreen: async function (evendData) {
    const getOsbbRepsonse = await loadData<baseResponse<any>>(
      UserDataProvider.getInfoOsbb,
      {osbbHash: evendData.osbbHash},
    );
    if (getOsbbRepsonse.statusCode === 200) {
      currentUser().saveOsbb(getOsbbRepsonse.data);
      const responseItem = await loadData<baseResponse<any>>(
        UserDataProvider.getOrderData,
        {osbbHash: evendData.osbbHash, issuesId: evendData.issuesId},
      );
      if (responseItem.statusCode === 200) {
        currentUser().isAdminOsbb = false;
        navigator().pushScreenToHistory({
          name: 'StatementOfResidentsStack',
          params: {
            screen: 'StatementOfResidentsMainScreen',
            swipeEnabled: true,
          },
        });
        switch (responseItem.data.issuesStatus) {
          // Взято в роботу
          case 2:
            // disabled :   Button
            controllers().statementOfResidentsController.detailInProgressOrderScreen.isUser = true;
            controllers().statementOfResidentsController.detailInProgressOrderScreen.selectedItem = new StatementOfResidentsItemModel(
              responseItem.data,
            );
            controllers().statementOfResidentsController.detailInProgressOrderScreen.forceUpdate();
            navigator().navigate('StatementOfResidentsStack', {
              screen: 'StatementOfResidentsDetailInProgressOrderScreen',
              swipeEnabled: true,
            });
            break;
          // Виконано,
          case 3:
            // active :   Buttons
            controllers().statementOfResidentsController.detailNewOrderScreen.detailModel.isOrderCancel = true;
            controllers().statementOfResidentsController.detailNewOrderScreen.selectedItem = new StatementOfResidentsItemModel(
              responseItem.data,
            );
            controllers().statementOfResidentsController.detailNewOrderScreen.forceUpdate();
            navigator().navigate('StatementOfResidentsStack', {
              screen: 'StatementOfResidentsDetailNewOrderScreen',
              swipeEnabled: true,
            });
            break;
          // Відхилено,
          case 4:
            controllers().statementOfResidentsController.cancelUserModel.selectedItem = new StatementOfResidentsItemModel(
              responseItem.data,
            );
            controllers().statementOfResidentsController.cancelUserModel.forceUpdate();

            navigator().navigate('StatementOfResidentsStack', {
              screen: 'StatementOfResidentsCancelUserOrderScreen',
              swipeEnabled: true,
            });
            break;
          default:
            navigator().navigate('StatementOfResidentsStack', {
              screen: 'StatementOfResidentsMainScreen',
              swipeEnabled: true,
            });
        }
      }
      store().contactsItems.refresh(true);
      controllers().drawerSwitch.modified = true;
      controllers().drawerSwitch.forceUpdate();
    }
  },
  _goToStatementNewOrderScreen: async function (evendData) {
    const getOsbbRepsonse = await loadData<baseResponse<any>>(
      UserDataProvider.getInfoOsbb,
      {osbbHash: evendData.osbbHash},
    );
    const responseItem = await loadData<baseResponse<any>>(
      UserDataProvider.getOrderData,
      {osbbHash: evendData.osbbHash, issuesId: evendData.issuesId},
    );
    if (getOsbbRepsonse.statusCode === 200) {
      currentUser().saveOsbb(getOsbbRepsonse.data);
      currentUser().isAdminOsbb = true;
      if (responseItem.statusCode === 200) {
        navigator().pushScreenToHistory({
          name: 'StatementOfResidentsStack',
          params: {
            screen: 'StatementOfResidentsMainScreen',
            swipeEnabled: true,
          },
        });
        //responseItem.data
        controllers().statementOfResidentsController.detailNewOrderScreen.selectedItem = new StatementOfResidentsItemModel(
          responseItem.data,
        );
        controllers().statementOfResidentsController.detailNewOrderScreen.forceUpdate();
        navigator().navigate('StatementOfResidentsStack', {
          screen: 'StatementOfResidentsDetailNewOrderScreen',
          swipeEnabled: true,
        });
      } else {
        navigator().navigate('StatementOfResidentsStack', {
          screen: 'StatementOfResidentsMainScreen',
          swipeEnabled: true,
        });
      }
      controllers().statementOfResidentsController.mainScreen.btnAddOrder.isVisible = true;
      store().contactsItems.refresh(true);
      controllers().drawerSwitch.modified = true;
      controllers().drawerSwitch.forceUpdate();
    }
  },
  _goToJoinStatementScreen: async function (eventData) {
    const getOsbbRepsonse = await loadData<baseResponse<any>>(
      UserDataProvider.getInfoOsbb,
      {osbbHash: eventData.osbbHash},
    );
    if (getOsbbRepsonse.statusCode !== 200) {
      return;
    }
    currentUser().saveOsbb(getOsbbRepsonse.data);
    const osbbLeaderResponse = await loadData<baseResponse<any>>(
      UserDataProvider.getOsbbLeader,
      {osbbHash: eventData.osbbHash},
    );
    const memberVerifyInfoItemResponse = await loadData<baseResponse<any>>(
      UserDataProvider.memberVerifyInfoItem,
      {hash: eventData.memberVerifyHash},
    );
    if (osbbLeaderResponse.data.userHash === currentUser().userHash) {
      currentUser().isAdminOsbb = true;
      // 1) AdminScreen
      navigator().pushScreenToHistory({
        name: 'OsbbAdminStack',
        params: {
          screen: 'AdminScreen',
          swipeEnabled: true,
        },
      });
      // 2) JoinStatementsScreen
      navigator().pushScreenToHistory({
        name: 'OsbbAdminStack',
        params: {
          screen: 'JoinStatementsScreen',
          swipeEnabled: true,
        },
      });
      controllers().osbbAdminController.joinStatementDetailModel.selectedItem = new JoinStatementItemModel(
        memberVerifyInfoItemResponse.data,
      );
      console.log(
        'memberVerifyInfoItemResponseeventData selected',
        controllers().osbbAdminController.joinStatementDetailModel.selectedItem,
      );
      navigator().navigate('OsbbAdminStack', {
        screen: 'JoinStatementDetailModel',
        // key: new Date().getTime(),
        swipeEnabled: true,
        data: {},
      });
    }
  },
  _goToMyBalance: async function (eventData) {
    const getOsbbRepsonse = await loadData<baseResponse<any>>(
      UserDataProvider.getInfoOsbb,
      {osbbHash: evendData.osbbHash},
    );
    if (getOsbbRepsonse.statusCode !== 200) {
      return;
    }
    currentUser().saveOsbb(getOsbbRepsonse.data);
    const osbbLeaderResponse = await loadData<baseResponse<any>>(
      UserDataProvider.getOsbbLeader,
      {osbbHash: eventData.osbbHash},
    );
    if (osbbLeaderResponse.data.userHash === currentUser().userHash) {
      // якщо я голова
      currentUser().isAdminOsbb = true;
      // 1) AdminScreen
      navigator().pushScreenToHistory({
        name: 'OsbbAdminStack',
        params: {
          screen: 'AdminScreen',
          swipeEnabled: true,
        },
      });
      // / 2) BillAccountScreen
      navigator().pushScreenToHistory({
        name: 'OsbbAdminStack',
        params: {
          screen: 'BillAccountScreen',
          swipeEnabled: true,
        },
      });
      // 3) AdminPaymentsScreen
      navigator().navigate('OsbbAdminStack', {
        screen: 'AdminPaymentsScreen',
        // key: new Date().getTime(),
        swipeEnabled: true,
        data: {},
      });
    } else {
      currentUser().isAdminOsbb = false;
      // якщо я мешканець
      // history
      // 1) HomeScreen
      navigator().pushScreenToHistory({
        name: 'MainStack',
        params: {
          screen: 'HomeScreen',
          swipeEnabled: true,
        },
      });
      // / 2) UserBalanceScreen
      navigator().pushScreenToHistory({
        name: 'MainStack',
        params: {
          screen: 'UserBalanceScreen',
          swipeEnabled: true,
        },
      });
      // 3)  PaymentsScreen
      navigator().navigate('MainStack', {
        screen: 'PaymentsScreen',
        // key: new Date().getTime(),
        swipeEnabled: true,
        data: {},
      });
    }
  },
  //
  _showModalReminder: function (eventData) {
    controllers().sharedController.reminderAlert.init(
      eventData.title,
      eventData.content,
      eventData.eventDate,
    );
    controllers().sharedController.reminderAlert.open();
  },
  _navigateToRemind: async function (eventData) {
    const osbbLeaderResponse = await loadData<baseResponse<any>>(
      UserDataProvider.getOsbbLeader,
      {osbbHash: eventData.osbbHash},
    );
    if (osbbLeaderResponse.data.userHash === currentUser().userHash) {
      return;
    }
    const getOsbbRepsonse = await loadData<baseResponse<any>>(
      UserDataProvider.getInfoOsbb,
      {osbbHash: eventData.osbbHash},
    );
    if (getOsbbRepsonse.statusCode === 200) {
      currentUser().isAdminOsbb = false;
      navigator().navigate('MainStack', {
        screen: 'HomeScreen',
        // key: new Date().getTime(),
        swipeEnabled: true,
        data: {},
      });
    }
  },
  // timeLine
  async _navigateToTimeLine(eventData) {
    // FETCH first step why am i in this osbb
    try {
      const osbbLeaderResponse = await loadData<baseResponse<any>>(
        UserDataProvider.getOsbbLeader,
        {osbbHash: eventData.osbbHash},
      );
      const getOsbbRepsonse = await loadData<baseResponse<any>>(
        UserDataProvider.getInfoOsbb,
        {osbbHash: eventData.osbbHash},
      );
      // console.log('getOsbbRepsonse', getOsbbRepsonse);
      if (getOsbbRepsonse.statusCode === 200) {
        currentUser().saveOsbb(getOsbbRepsonse.data);
      }
      // console.log('osbbLeaderResponse', osbbLeaderResponse);
      if (osbbLeaderResponse.statusCode === 200) {
        // Якщо osbbLeaderResponse.data.userHash === eventData.osbbHash тоді Голова ОСББ
        if (osbbLeaderResponse.data.userHash === currentUser().userHash) {
          currentUser().isAdminOsbb = true;
          navigator().pushScreenToHistory({
            name: 'OsbbAdminStack',
            params: {
              screen: 'AdminScreen',
              swipeEnabled: true,
            },
          });
          // Новнити
          if (eventData.typeId == 1) {
            // Загрузка айтема
            navigator().pushScreenToHistory({
              name: 'OsbbAdminStack',
              params: {
                screen: 'NewsScreen',
                swipeEnabled: true,
              },
            });
            await this._goToDetailScreen(eventData, 'OsbbAdminStack');
            controllers().drawerSwitch.modified = true;
            controllers().drawerSwitch.forceUpdate();
            return;
          }
          // Події
          if (eventData.typeId == 2) {
            navigator().pushScreenToHistory({
              name: 'OsbbAdminStack',
              params: {
                screen: 'MessagesScreen',
                swipeEnabled: true,
              },
            });
            await this._goToDetailScreen(eventData, 'OsbbAdminStack');
            controllers().drawerSwitch.modified = true;
            controllers().drawerSwitch.forceUpdate();
            return;
          }
          // Опитування
          if (eventData.typeId == 3) {
            navigator().pushScreenToHistory({
              name: 'OsbbAdminStack',
              params: {
                screen: 'VotesScreen',
                swipeEnabled: true,
              },
            });
            await this._goToDetailScreen(eventData, 'OsbbAdminStack');
            controllers().drawerSwitch.modified = true;
            controllers().drawerSwitch.forceUpdate();
            return;
          }
          return;
        } else {
          console.log('osbbLeaderResponse Якщо я мешканець');
          // Якщо я мешканець
          currentUser().isAdminOsbb = false;
          controllers().bottomNavigation.selectedIndex = 3;

          navigator().pushScreenToHistory({
            name: 'MainStack',
            params: {
              screen: 'HomeScreen',
              swipeEnabled: true,
            },
          });
          await this._goToDetailScreen(eventData, 'MainStack');
          // navigator().toMainStack();
          controllers().drawerSwitch.modified = true;
          controllers().navigationController.mainNavigation.forceUpdate();
          controllers().userController.userHome.loadTimeLineList(true);
          controllers().drawerSwitch.chooseDrawer.drawerUser.userName.modified = true
          controllers().drawerSwitch.chooseDrawer.drawerUser.forceUpdate();
          return;
        }
      }
    } catch (e) {
      console.log('_navigateToTimeLine e', e);
    }
  },
  _onBalanceChange(eventData) {
    // якщо ми на цьому осбб
    if (eventData.osbbHash === currentUser().currentOsbb?.hash) {
      // якщо ми на скріні балансу
      if (navigator().getCurrentScreen() === 'UserBalanceScreen') {
        // якщо ми на скріні з балансами але приміщення не вибрано оновляємо список з апартаментами
        controllers().userController.userBalance.checkApartments(true);
        controllers().userController.userBalance.onRefresh();
        // if (
        //   controllers().userController.userBalance.apartmentId ===
        //   eventData.apartmentId
        // ) {
        //   // update user balance screen
        //   controllers().userController.userBalance.onRefresh();
        // } else {
        // }
      }
      // Якщо ми на скріні з платежами
      if (navigator().getCurrentScreen() === 'PaymentsScreen') {
        controllers().userController.userBalance.onRefresh();
        controllers().userController.payments.loadPaymentList();
      }
      // Якщо ми на скріні з плановими платежами
      if (navigator().getCurrentScreen() === 'PlanedPaymentsScreen') {
        controllers().userController.planedPayments.loadData(false);
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

  _userIsOnline: function (eventData) {
    console.log('_userIsOnline', store().contactsItems.get(eventData.userId));
    try {
      if (currentUser().isTokenValid) {
        const contact = store().contactsItems.get(eventData.userId);
        contact.isOnline.update(
          {
            isOnline: true,
            isOnlineDate: moment(new Date()).format('DD.MM.YYYYTHH:MM:ss'),
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
      console.log('_userIsOnline error', e);
    }
  },
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
    console.log('eventData _openChat', eventData);
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
