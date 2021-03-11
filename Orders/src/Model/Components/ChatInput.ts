import {BaseModel} from "../../Common/BaseModel";
import {currentUser} from "../../Core/CurrentUser";
import {loadData, UserDataProvider} from "../../DataProvider/UserDataProvider";
import {baseResponse} from "../../DataTypes/BaseTypes";

type chatInputProps = {
  id: string,
  onMessageSended: (isClearList: boolean) => void;
  onMessageSend?: () => void;
}

class ChatInput extends BaseModel {
  private _model: chatInputProps
  private _item: any
  private _value: string;

  constructor(_model: chatInputProps) {
    super(_model.id);
    this._model = _model
    this._value = ''
    this.onSendMessagePress = this.onSendMessagePress.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  get item() {
    return this._item
  }

  set item(value) {
    this._item = value
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }

  onChangeText(value: string) {
    if (value !== this._value) {
      this._value = value
      this.forceUpdate()
    }
  }

  clearInput(forceUpdate: boolean = true) {
    if (this._value !== '') {
      this._value = ''
      if (forceUpdate) {
        this.forceUpdate()
      }
    }
  }

  async onSendMessagePress() {
    if (this._model.onMessageSend !== undefined){
      this._model.onMessageSend()
      return
    }
    if (this._value === '') {
      return
    }
    // const body = {
    //   osbbHash: currentUser().currentOsbb?.hash,
    //   timelineId: this._item.id,
    //   comment: this._value,
    // }
    this.clearInput()
    console.log('sendMessage body', body)
    // const response = await loadData<baseResponse<osbbComments>>(
    //   UserDataProvider.addTimeLineComment,
    //   body
    // );
    // if (response.statusCode === 200) {
    //   this._model.onMessageSended(false);
    // }
    // console.log('sendMessage response', response)
  }


}

export {ChatInput};
