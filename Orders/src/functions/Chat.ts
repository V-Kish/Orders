import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody, ChatList} from '../Types';
import {PreloaderMain} from '../store/actions/AppStart';
import {ChatListAction} from '../store/actions/Chat';

class Chat {
  // Список регіонів
  static async getChatList(
    dispatch: Dispatch<any>,
    Data: ChatList = {
      pageIndex: 1,
      PageSize: 10,
      sQuery: '',
      isRead: -1,
    },
  ) {
    // dispatch(PreloaderMain(true));
    // get userToken
    const body: AuthBody = Data;
    // @ts-ignore
    body.deviceInfo = await this.createFetchBody();
    try {
      const list = await UserDataProvider.getListChats(body);
      console.log('list',list)
      if (list.statusCode === 200) {
        // @ts-ignore
        dispatch(ChatListAction(list.data));
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
