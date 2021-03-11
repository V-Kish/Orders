import {BaseModel} from '../../../Common/BaseModel';

type emptyListMessageType = {
  id: string;
  title: string;
  isVisible?: boolean;
};

class EmptyListMessageModel extends BaseModel {
  static emptySearchListMessage: EmptyListMessageModel = new EmptyListMessageModel(
      {
        id: 'EmptyListMessageModel_ListHousesModel',
        title: 'За введеними Вами даними нічого не знайдено',
      },
  );
  private _messageModel: emptyListMessageType;

  constructor(messageModel: emptyListMessageType) {
    super(`${messageModel.id}`);
    this._messageModel = messageModel;
  }

  get messageName() {
    return this._messageModel.title;
  }
}

export {EmptyListMessageModel};
