import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody, ChatList, ChatMessagesList, chatMessage} from '../Types';
import {PreloaderMain} from '../store/actions/AppStart';
import {
  ChatListAction,
  ChatListMessagesAction,
  ChatListPaginationAction,
} from '../store/actions/Chat';

class Chat {
  // Список чатів
  static async getChatList(
    dispatch: Dispatch<any>,
    searchText = '',
    Data: ChatList = {
      pageIndex: 1,
      pageSize: 10,
      isRead: -1,
    },
    pagination = false,
  ) {
    // dispatch(PreloaderMain(true));
    // get userToken
    let body: AuthBody = Data;
    body.sQuery = searchText;
    // @ts-ignore
    console.log('body pad', body);
    try {
      const list = await UserDataProvider.getListChats(body);
      console.log('list', list);
      if (list.statusCode === 200) {
        if (pagination) {
          // @ts-ignore
          dispatch(ChatListPaginationAction(list.data));
        } else {
          // @ts-ignore
          dispatch(ChatListAction(list.data));
        }
        return false;
      }
      if (list.statusCode === 403 && list.statusMessage === 'forbidden') {
        // @ts-ignore
        navigator().navigate('ErrorScreen');
        // dispatch(PreloaderMain(false));
        return;
      }
      if (list.statusCode === 403) {
        // alert(list.data.message);
        navigator().navigate('ErrorScreen');
        // dispatch(PreloaderMain(false));
        return;
      }
      if (list.statusCode !== 200) {
        // @ts-ignore
        // alert(list.result.message);
        // dispatch(PreloaderMain(false));
        return false;
      }
    } catch (ex) {
      // dispatch(PreloaderMain(false));
      return;
    }
  }
  // Список повідомлень
  static async getChatMessages(
    dispatch: Dispatch<any>,
    Data: ChatMessagesList = {
      pageIndex: 1,
      pageSize: 10,
      rootId: -1,
    },
  ) {
    let body: ChatMessagesList = Data;
    try {

      const result = await UserDataProvider.getChatMessages(body);
      console.log('rewt list ',result)
      if (result.statusCode === 200) {
        console.log('rewt list ',result)
        // if (pagination){
        //   // @ts-ignore
        //   dispatch(ChatListPaginationAction(list.data));
        // }else {
        //   // @ts-ignore
        //   dispatch(ChatListAction(list.data));
        // }
        dispatch(ChatListMessagesAction(result.data));
        return false;
      }
      if (result.statusCode === 403 && result.statusMessage === 'forbidden') {
        // @ts-ignore
        navigator().navigate('ErrorScreen');
        // dispatch(PreloaderMain(false));
        return;
      }
      if (result.statusCode === 403) {
        // alert(list.data.message);
        navigator().navigate('ErrorScreen');
        // dispatch(PreloaderMain(false));
        return;
      }
      if (result.statusCode !== 200) {
        // @ts-ignore
        // alert(list.result.message);
        // dispatch(PreloaderMain(false));
        return false;
      }
    } catch (ex) {
      // dispatch(PreloaderMain(false));
      return;
    }
  }

  // Create body for fetch
  private static async createFetchBody() {
    try {
      const deviceInfo = await PhoneInfo.getDeviceInfo();
      return JSON.stringify(deviceInfo);
    } catch (error) {}
  }
  // Create body for fetch
  static async sendMessages(
    dispatch: Dispatch<any>,
    Data: chatMessage,
  ) {
    try {
      let body: chatMessage = Data;
      const result = await UserDataProvider.sendMessage(body);
      if (result.statusCode === 200){
        if (body.rootId){
          Chat.getChatMessages(dispatch,{pageSize:20,pageIndex:1,rootId:body.rootId}).then();
        }
      }
    } catch (error) {
      console.log('sendMessages ex error', error);
    }
  }

  static async goToBottom(ref, animation = true) {
    try {
      if (ref.current) {
        ref.current.scrollToEnd({animated: animation});
      }
    } catch (ex) {
      console.log('goToBottom ex', ex);
    }
  }
}
export {Chat};
