import {fetchData} from '../../Common/fetchData';
import moment from 'moment';
import {currentUser} from '../../Core/CurrentUser';

class ListChatsProvider {
  constructor() {
    //Івент на успішне завантаження
    this.onLoad = null;
    ///івент на помилку завантаження
    this.onError = null;
    ///ідентифікатор користувача
    this.userToken = null;
    ///Дані про чати, список актувальних чатів
    this.DataSet = null;
    ///Дата останнього оновлення чату
    this.LastUpdateDateTime = moment();
  }
  ///іеіціалізуємо завантаження даних
  Init(
    ///ідентифікатор користувача, який просить дані
    userToken,
    ///фунція, яку потрібно виконати, коли дані вдалося завантажити
    onLoad,
    ///функція, яка буде виконанная, коли не вдалося завантажити дані
    onError,
    //флажок примусового завантаження даних
    //якшо він == тру -> тоді дані будут завантаженні з серверу примусово
    needReload,
  ) {
    //якшо цей папаметер не передався, примусово ставимо = фальш, і пробуємо віддати вже існуючий датасет
    if (typeof needReload === 'undefined') {
      needReload = false;
    }
    ///якшо датасет не заповнений, робимо запит на сервер
    if (this.DataSet == null) {
      needReload = true;
    }
    ///Перевіяємо коли було останнє оновлення з серверу
    if (!needReload) {
      ///поточний час
      var current = moment();
      ///Різниця між останнім оновленням в секундах
      var diffInSeconds = current.diff(this.LastUpdateDateTime, 'seconds');
      ///якшо останній раз ми забирали дані більше чим 30 сек. тому - примусово робимо це ще раз
      if (diffInSeconds >= 60) {
        needReload = true;
      }
    }

    this.onLoad = null;
    this.onError = null;
    this.userToken = userToken;

    if (typeof onLoad === 'function') {
      this.onLoad = onLoad;
    }

    if (typeof onError === 'function') {
      this.onError = onError;
    }

    if (typeof this.userToken !== 'undefined' && this.userToken != null) {
      if (needReload) {
        ///піздуємо на сервер
        this.Download();
      } else {
        if (this.onLoad != null) {
          ///вертаємо дата сет
          this.onLoad(this.DataSet);
        }
      }
    }
  }
  ///отримати дані з серверу
  Download() {
    var self = this;
    if (currentUser().currentOsbb === null) {
      return;
    }
    console.log(
      'uri',
      `${self.userToken}/${currentUser().currentOsbb.hash}/chat/all`,
    );
    fetchData(
      `${self.userToken}/${currentUser().currentOsbb.hash}/chat/all`,
      'post',
      {
        pageIndex: 1,
        pageSize: 100000,
      },
      null,
      null,
      true,
    ).then(
      (response) => {
        if (response.statusCode === 200) {
          if (self.onLoad != null) {
            this.LastUpdateDateTime = moment();
            this.DataSet = response.result;
            self.onLoad(response.result);
          }
        } else {
          if (self.onError != null) {
            self.onError(response.result);
          }
        }
      },
      (error) => {
        console.log('ListChatsProvider error onError', error);
      },
    );
  }
}

global.__app__ = global.__app__ || {};
global.__app__.listChatsProvider =
  global.__app__.listChatsProvider || new ListChatsProvider();
///робочий екземпляр об'єкту ListChatsProvider,
// звертатися через:  listChatsProvider().Публічний метод(....
export function listChatsProvider() {
  return global.__app__.listChatsProvider;
}
