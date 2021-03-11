import { Base } from './Base';
import { store } from './Store';
import { MessageHelper } from './Messages/MessageHelper';
import { currentUser } from '../../Core/CurrentUser';
import { ContactIcon } from './ContactIcon';
import { MessageList } from './MessageList';
import {AppSettings} from "../../Common/AppSettings";
// import {AppLog} from "../Common/AppLog";

const RNFS = require('react-native-fs');

type messageProps = {
  isLoading?: boolean;
  isEdited: boolean;
  uFromToken: string;
  uFromDate: string;
  uFromStatus: number;
  uFrom: number;
  status: boolean;
  groupId: number;
  id: string;
  _id: number;
  message: string;
  messageType: number;
  ownerUserFrom: number;
};

class Message extends Base {
  messageType: number;
  public message: any;
  private groupId: number;
  ownerUserFrom: number;
  public chat: MessageList;
  private status: boolean;
  uFrom: number;
  uFromStatus: number;
  uFromDate: string;
  private uFromToken: string;
  isEdited: boolean;
  private _subId: number;
  public isLoading: boolean;
  public isLoaded: boolean;
  private path?: string;
  public contactIcon?: ContactIcon;
  public userName?: string;
  constructor(model: messageProps, chat: MessageList) {
    super(model.id);
    this.chat = chat;
    this.messageInit = model;
    this.onPress = this.onPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.contactIcon = null;
    this.userName = null;
  }

  set messageInit(model: messageProps) {
    if (this.id !== model.id) {
      this._id = model.id;
    }
    //type of message
    this.messageType = model.messageType;
    //message of file messageObj
    this.message = this.isFileMessage
      ? typeof model.message !== 'object'
        ? JSON.parse(model.message)
        : model.message
      : model.message;
    //chatId from where this message was sent
    this.groupId = model.groupId;
    //userId of message owner
    this.ownerUserFrom = model.ownerUserFrom;
    this.status = model.status;
    //userId who sent message
    this.uFrom = model.uFrom;
    //a status which show is the message was successfully sent
    this.uFromStatus = model.uFromStatus;
    //date when the message was sent
    this.uFromDate = model.uFromDate;
    //user-token of message sender
    this.uFromToken = model.uFromToken;
    //is message was edited by owner
    this.isEdited = model.isEdited;
    //id made by the device from which it was sent
    this._subId = model._id || null;
    //a status which show is the file message loading
    this.isLoading = model.isLoading || false;
    //a status which show is the file message loaded
    this.isLoaded = false;
  }

  get subId() {
    return this._subId;
  }

  get isFileMessage() {
    return (
        this.messageType === 5 || this.messageType === 8 || this.messageType === 2 || this.messageType === 3 || this.messageType === 4
    );
  }

  get text() {
    return this.isFileMessage ? this.message.comment : this.message;
  }
  set text(value: string) {
    this.isFileMessage
      ? (this.message.comment = value)
      : (this.message = value);
    this.isEdited = true;
    this.modified = true;
    this.forceUpdate();
  }

  async onPress() {
    if (this.isFileMessage) {
      let path = '';
      if (this.isLoaded) {
        return MessageHelper.openFile(this.path);
      }
      // if (!currentUser().permissions.writeExternalStorage) {
      //   const request = await currentUser().permissions.requestStoragePermission(
      //       currentUser().permissions.permissionTypes.externalStorage,
      //   );
      //   if(!request){
      //     return ;
      //   }
      // }
      this.isLoading = true;
      this.modified = true;
      this.forceUpdate();
      const directory = RNFS.DownloadDirectoryPath + '/osbb/';
      // if (currentUser().permissions.writeExternalStorage) {
      //   await RNFS.mkdir(directory);
      //   const uri = `${AppSettings.chatEndpoint}/${currentUser().userToken}/${this.message.fileHash}/as-image-thumb`;
      //   path = await MessageHelper.downloadFile(uri, this.message.fileNmae);
      //   if (path !== '') {
      //     this.path = path;
      //     this.isLoading = false;
      //     this.isLoaded = true;
      //     MessageHelper.openFile(this.path);
      //     this.modified = true;
      //     this.forceUpdate();
      //   }
      // }
    }
  }

  selfDelete() {
    // const storage = this.chat.storage
    // const currentMessage = storage.find(i=>i.id === this.id)

    // console.log('storage before', storage)
    // console.log('selfDelete cM', currentMessage)
    // if(this.chat.storage[currentMessage - 1].messageType === 200) {
    //   this.chat.storage.splice(currentMessage - 1, 1);
    // }
    // this.chat.storage.splice(currentMessage, 1);
    // console.log('selfDelete storage', this.chat.storage)
    // this.chat.modified = true;
    // this.chat.forceUpdate();
    this.text = "Повідомлення видалено"
    this.messageType = 404
    this.forceUpdate()
  }

  onLongPress() {
    store().chats.messageMenu.show(this);
  }

  static clone(message: Message, chat: MessageList) : Message{
     const newMessage = new Message({
       id: message.id,
       messageType: message.messageType,
       message: message.message,
       groupId: message.groupId,
       ownerUserFrom: message.ownerUserFrom,
       status: message.status,
       uFrom: message.uFrom,
       uFromStatus: message.uFromStatus,
       uFromDate: message.uFromDate,
       uFromToken: message.uFromToken,
       isEdited: message.isEdited,
       _id: message._subId,
    }, chat)
    newMessage.userName = message.userName;
    newMessage.contactIcon = message.contactIcon;
    newMessage.path  = message.path;
    return newMessage;
  }

  update(model, forceUpdate: boolean = true) {
    if (
      this.message !== model.message ||
      (this.id !== model.id && this.subId === model.id) ||
      this.isEdited !== model.isEdited
    ) {
      this.messageInit = model;
      this.modified = true;
      if (forceUpdate) {
        this.forceUpdate();
      }
    }
  }
}

export { Message };
