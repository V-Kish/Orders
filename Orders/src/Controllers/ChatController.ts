import {UserDetailModel} from '../Model/ChatStack/UserDetailModel';

class ChatController {
  private _userDetailModel: UserDetailModel;
  constructor() {
    this._userDetailModel = new UserDetailModel({id: 'userDetailModel'});
  }

  get userDetailModel() {
    return this._userDetailModel;
  }
}

export {ChatController};
