import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody, ChatList} from '../Types';
import {PreloaderMain} from '../store/actions/AppStart';
import {ChatListAction,ChatListPaginationAction} from '../store/actions/Chat';

class Chat {
  // Список регіонів
  static async getChatList(
    dispatch: Dispatch<any>,
    searchText= '',
    Data: ChatList = {
      pageIndex: 1,
      pageSize: 10,
      isRead: -1,
    },
    pagination = false
  ) {
    // dispatch(PreloaderMain(true));
    // get userToken
    let  body: AuthBody = Data;
    body.sQuery = searchText;
    // @ts-ignore
    console.log('body pad',body)
    try {
      const list = await UserDataProvider.getListChats(body);
      console.log('list',list)
      if (list.statusCode === 200) {
        if (pagination){
          // @ts-ignore
          dispatch(ChatListPaginationAction(list.data));
        }else {
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

  // Create body for fetch
  private static async createFetchBody() {
    try {
      const deviceInfo = await PhoneInfo.getDeviceInfo();
      return JSON.stringify(deviceInfo);
    } catch (error) {}
  }
}
export {Chat};
