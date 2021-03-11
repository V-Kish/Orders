import {Base} from '../Base';
import {messageTemplateObj} from '../../functions/messageTempateObj';
import {currentUser} from '../../../Core/CurrentUser';
import {fetchData} from '../../../Common/fetchData';
import {substring} from '../../functions/sliceString';
import {TextBox} from '../../../Models/Components/TextBox';
import {store} from '../Store';
import {fileUploader} from '../../functions/fileUploader'
import {MessageHelper} from "../Messages/MessageHelper";
import { resendMessageType} from "./ResendMessage";
import {Message} from "../Message";
// import { console } from '../../Common/console';
import Geolocation from "@react-native-community/geolocation";
import { EmojiChat } from '../ChatEmoji/EmojiChat';

class ChatKeyboard extends Base {
    private textMessage: { inputStart: number; message: string };
    private lastCoords: { latitude: number; longitude: number };
    private _emojiChat: EmojiChat;

    constructor() {
        super('ChatKeyboard');
        this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
        this.resetKeyboardView = this.resetKeyboardView.bind(this);
        this.onKeyboardResigned = this.onKeyboardResigned.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.openEmoji = this.openEmoji.bind(this);
/*        this.openPicker = this.openPicker.bind(this);
*/        this.openKeyboard = this.openKeyboard.bind(this);
        //this.onChangeText = this.onChangeText.bind(this);
        this.onFocus = this.onFocus.bind(this);
        /*        this.pickFiles = this.pickFiles.bind(this);
                this.pickPhoto = this.pickPhoto.bind(this);*/
        /*this.send = this.send.bind(this);
        this.resend = this.resend.bind(this);


        this.lastCoords = {
            latitude: null,
            longitude: null,
        };

    }


*/
        this._emojiChat = new EmojiChat({ id: 'emojiChat' })
    }
    get emojiChat() {
        return this._emojiChat;
    }

    openPicker() {
        this.keyboardFilePicker.update(!this.keyboardFilePicker.hidden, true);
    }
    openEmoji() {
        this.resetKeyboardView();
        this.showKeyboardView('KeyboardView')
        this.emojiButton.update(true, false)
        this.keyboardButton.update(false, false)
        this.modified = true;
        this.forceUpdate();
        this.messageTextBox.ref.blur()
        setTimeout(() => store().chats.current.items.scrollToEnd(), 200);
    }

    openKeyboard() {
        this.emojiButton.update(false, false);
        this.keyboardButton.update(true, false);
        this.modified = true;
        this.forceUpdate();
        this.messageTextBox.ref.focus();
        setTimeout(() => store().chats.current.items.scrollToEnd(), 200);
    }

    onFocus() {
        if (!this.keyboardButton.hidden) {
            this.keyboardButton.update(true, true);
            this.emojiButton.update(false, true);
        }
        setTimeout(() => store().chats.current.items.scrollToEnd(), 200);
    }

    onChangeText(textBox: TextBox, text: string) {
        this.messageButton.update(text.length === 0, true);
        this.pickerButton.update(text.length !== 0, true);
    }

    /*pickPhoto() {
        navigator().picker = true;
        this.keyboardFilePicker.pick('image').then(file => {
            if (file) {
                this.keyboardFilePicker.update(true, true);
                this.keyboardFilePreview.files = file
                this.messageButton.update(false, true);
                this.pickerButton.update(true, true);
            }
        })
    }*/

    /*pickFiles() {
        navigator().picker = true;
        this.keyboardFilePicker.pick('files').then(file => {
            if (file) {
                this.keyboardFilePicker.update(true, true);
                this.keyboardFilePreview.files = file
                this.messageButton.update(false, true);
                this.pickerButton.update(true, true);
            }
        })
    }*/

    /*requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.log(err);
      }
    };*/



    async sendMessage() {
        try {
            const chat = store().chats.current;
            const newMessage = this.newMessage();
            chat.addNewMessage(newMessage);
            chat.items.modified = true;
            chat.forceUpdate();
            this.messageTextBox.value = '';
            this.messageButton.update(true, true);
            this.pickerButton.update(false, true);
            chat.items.scrollToEnd();
            console.log('sendMessage', `api-v1/${currentUser().userToken}/chat/${store().chats.selectedChatId}/messages/add`)
            const response = await fetchData(
                `api-v1/${currentUser().userToken}/chat/${
                store().chats.selectedChatId
                }/messages/add`,
                'post',
                {
                    message: newMessage.message,
                    messageType: 1,
                    geo: {
                        ...this.lastCoords
                    },
                    _id: newMessage.timeStamp,
                },
                null,
                newMessage.id,
            );
            console.trace('addmessage', response.result);
            if (response.result) {
                chat.items.addOrUpdate(response.result, false, false);
                chat.lastMessage.update(response.result, true);
                // chat.items.scrollToEnd();
            }
        }
        catch (ex) {
            console.error('sendMessage -> error', ex);
        }
    }

    newMessage(fileIndex?: number) {
        const textBoxValue = this.messageTextBox.value
        const newMessage = messageTemplateObj();
        if (this.keyboardFilePreview.files[fileIndex]) {
            newMessage.message = this.fileMessageObj(fileIndex)
            newMessage.messageType = 1;
            if(fileIndex === 0){
                newMessage.message.comment = textBoxValue;
            }
            newMessage.messageType = MessageHelper.getMessageType(newMessage.message.fileNmae);
            newMessage.isLoading = true;
        } else {
            newMessage.message = textBoxValue;
            newMessage.messageType = 1;
        }
        newMessage.uFrom = currentUser().userId;
        newMessage.groupId = store().chats.selectedChatId;
        newMessage.ownerUserFrom = -1;
        return newMessage;
    }

    fileMessageObj(fileIndex) {
        return {
            fileHash: this.keyboardFilePreview.files[fileIndex].uri,
            mimeType: MessageHelper.getFileExtension(this.keyboardFilePreview.files[fileIndex].name),
            fileNmae: this.keyboardFilePreview.files[fileIndex].name,
            size: +this.keyboardFilePreview.files[fileIndex].size / 1024,
            updated: false,
            comment: '',
        };
    }

    async sendFile(fileIndex) {
        try {
            console.log('fileHash','dasdasdasdas')
            const chat = store().chats.current;
            const newMessage = this.newMessage(fileIndex)
            // chat.addNewMessage(newMessage);
            // chat.items.modified = true;
            // chat.forceUpdate(() =>  chat.items.scrollToEnd());
            this.messageTextBox.value = '';
            this.keyboardFilePreview.close();
            this.messageButton.update(true, true);
            this.pickerButton.update(false, true);
            console.log('fileHash',newMessage.message.fileHash)
            const base64 = await MessageHelper.fileToBase64(newMessage.message.fileHash)
            const body = {
                fileBase64: base64,
                fileName: newMessage.message.fileNmae,
                comment: newMessage.message.comment,
                chatId: newMessage.groupId,
                _id: newMessage.id,
                geo: {
                    ...this.lastCoords
                },
            }
            console.log('sendFile', newMessage);
            const response = await fileUploader(
                JSON.stringify(body),
                `api-v1/${currentUser().userToken}/chat/${store().chats.selectedChatId}/file/add`,
                // `api-v1/${currentUser().userToken}/chat/${store().chats.selectedChatId}/file/add`,
                () => { },
                null,
            )
            if (response.response.result) {
                response.response.result.message.item.isLoading = false;
                chat.items.addOrUpdate(response.response.result.message.item, true);
                chat.lastMessage.update(response.response.result.message.item, true);
                setTimeout(() => chat.items.scrollToEnd(), 100);
            }
            return response.response.statusCode === 200;
        } catch (e) {
            console.log('sendFileError', e)
            return  false
        }
    }

    async sendFiles(fileIndex:number = 0, triesToSent: number = 0) {
        console.log('fileHash','dasdasdasdas')
        if (fileIndex === this.keyboardFilePreview.files.length) {
            this.keyboardFilePreview.removeFile();
            return;
        }
        const response = await this.sendFile(fileIndex);
        if (response && fileIndex <= this.keyboardFilePreview.files.length) {
            console.log('sendFiles', fileIndex);
            fileIndex++;
            return this.sendFiles(fileIndex, 0);
        } else {
            if(triesToSent < 3){
                triesToSent++;
                return this.sendFiles(fileIndex, triesToSent);
            }else {
                fileIndex++;
                return this.sendFiles(fileIndex, 0);
            }
        }
    }

    send() {
        this.getGeolocation().then();
        if (this.keyboardFilePreview.files.length !== 0) {
            this.sendFiles().then()
        } else {
            if (this.resendMessage.message !== null) {
                if (this.resendMessage.type === resendMessageType.edit) {
                    this.sendEdited(this.resendMessage.message)
                } else {
                    this.resend(this.resendMessage.message)
                }
            } else {
                this.sendMessage().then()
            }
        }
    }

    onResend(message: Message) {
        store().contactsItems.refresh().then(() => {
            message.userName = store().contactsItems.storage.get(message.uFrom).name;
            this.resendMessage.message = message;
            this.resendMessage.type = resendMessageType.resend;
            this.resendMessage.modified = true;
            this.resendMessage.forceUpdate();
            this.pickerButton.update(true, true)
            this.messageButton.update(false, true)
        })
    }

    onEdit(message: Message) {
        this.resendMessage.message = message;
        this.messageTextBox.value = message.text
        this.resendMessage.type = resendMessageType.edit;
        this.resendMessage.modified = true;
        this.resendMessage.forceUpdate();
        this.pickerButton.update(true, true)
        this.messageButton.update(false, true)
    }

    sendEdited(message: Message) {
        fetchData(
            `api-v1/${currentUser().userToken}/chat/${store().chats.selectedChatId}/messages/edit`,
            'post',
            {
                originMessageId: message.id,
                newMessage: this.messageTextBox.value,
                messageType: message.messageType,
            },
        )
            .then(
                response => {
                    if (response.result) {
                        const chat = store().chats.current;
                        chat.items.modified = true;
                        chat.forceUpdate();
                        message.text = this.messageTextBox.value;
                        this.messageTextBox.value = '';
                        this.messageButton.update(true, true)
                        this.pickerButton.update(false, true)
                        this.resendMessage.clear();
                        this.resendMessage.modified = true;
                        this.resendMessage.forceUpdate();
                        chat.items.scrollToEnd();
                    }
                },
                err => console.log('err', err),
            );
    }

    resend(message: Message) {
        store().chats.keyboard.resendMessage.setIn();
        const chat = store().chats.current;
        let startFn = -new Date().getTime();
        const commentValue = this.messageTextBox.value
        if (commentValue.length > 0) {
            const commentMessage = messageTemplateObj();
            commentMessage.message = commentValue;
            commentMessage.messageType = 1;
            commentMessage.uFrom = currentUser().userId;
            commentMessage.id = startFn;
            chat.addNewMessage(commentMessage);
        }
        const forwardMessage = messageTemplateObj();
        forwardMessage.message = message.message;
        forwardMessage.messageType = message.messageType;
        forwardMessage.uFrom = currentUser().userId;
        forwardMessage.id = commentValue.length > 0 ? startFn - 1 : startFn;
        forwardMessage.ownerUserFrom = message.ownerUserFrom !== -1 ? message.ownerUserFrom : message.uFrom
        chat.addNewMessage(forwardMessage);
        chat.items.modified = true;
        chat.forceUpdate();
        chat.items.scrollToEnd();
        fetchData(
            `api-v1/${currentUser().userToken}/chat/${store().chats.selectedChatId}/messages/add-forward`,
            'post',
            {
                originMessageId: message.id,
                forwardComment: commentValue,
                geo: { ...this.lastCoords },
                _id: startFn,
                _idForward: commentValue.length > 0 ? startFn - 1 : startFn,
            },
        )
            .then(
                response => {
                    if (response.result || response.forwardResult) {
                        this.messageTextBox.value = '';
                        if (response.result) {
                            chat.items.addOrUpdate(response.result, false, true);
                        }
                        if (response.forwardResult) {
                            chat.items.addOrUpdate(response.forwardResult, false, true);
                            chat.lastMessage.update(response.forwardResult, true);
                        }
                        this.resendMessage.onPress();
                        this.pickerButton.update(false, true)
                        this.messageButton.update(true, true)
                        chat.items.scrollToEnd();
                    }
                },
                err => console.warn('err', err),
            );
    }

    onKeyboardItemSelected(keyboardId, params) {
        const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(
            params,
        )}`;
        this.receivedKeyboardData = receivedKeyboardData;
    }

    onKeyboardResigned() {
        this.resetKeyboardView();
    }

    resetKeyboardView() {
        this.customKeyboard = {};
        this.modified = true;
        this.forceUpdate();
    }

    dismiss(){
       // KeyboardUtils.dismiss();
    }

    showKeyboardView(component) {
        this.customKeyboard = {
            component: component,
            initialProps: {
                onClick: item => {
                    let result = '';
                    let inputStart = 0;
                    if (this.messageTextBox.ref._lastNativeSelection) {
                        if (this.textMessage.inputStart === 0) {
                            inputStart =
                                this.messageTextBox.ref._lastNativeSelection.start !== 0
                                    ? this.messageTextBox.ref._lastNativeSelection.start
                                    : 2;
                        } else {
                            inputStart = this.textMessage.inputStart + 1;
                        }
                        if (this.messageTextBox.value.length >= 0) {
                            if (
                                inputStart === 0 ||
                                typeof inputStart !== 'number' ||
                                isNaN(inputStart)
                            ) {
                                this.textMessage.message.length === 0
                                    ? (inputStart = 2)
                                    : (inputStart = this.messageTextBox.value.length);
                            }
                        }
                        const part1 = substring(
                            this.messageTextBox.value,
                            0,
                            inputStart,
                        );
                        const part2 = item;
                        const part3 = substring(
                            this.messageTextBox.value,
                            inputStart,
                        );
                        result = [
                            part1,
                            part2,
                            part3,
                        ].join('');
                    } else {
                        result = this.messageTextBox.value + item;
                    }

                    this.textMessage.inputStart = inputStart;
                    this.messageTextBox.value = result;
                    this.pickerButton.update(true, true);
                    this.messageButton.update(false, true);

                },
            },
        };
        this.customKeyboard.initialProps.onClick = this.customKeyboard.initialProps.onClick.bind(this);
    }

    async getGeolocation() {
        await Geolocation.getCurrentPosition(
            ({ coords }) => {
                this.lastCoords = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                };
            },
            error => {},
            { enableHighAccuracy: false },
        );
    }

    async sendCallSystemMessage(message, type){

        const types = [
            {type: 10, key: 'successCall'},
            {type: 11, key: 'missedCall'},
            {type: 12, key: 'failedCall'}
        ]
        console.log('sendMessage', `api-v1/${currentUser().userToken}/chat/${store().chats.selectedChatId}/messages/add`)
        const response = await fetchData(
            `api-v1/${currentUser().userToken}/chat/${
            store().chats.selectedChatId
            }/messages/add`,
            'post',
            {
                message: message,
                messageType: type,
                geo: {
                    ...this.lastCoords
                },
                _id: -new Date().getTime(),
            },
            null,
            -new Date().getTime(),
        );
        if (response.result) {
            const chat = store().chats.current;
            if(chat !== null){
                // if(store().recyclerViewInverted){
                //     chat.items.addOrUnShift(response.result, false, false);
                // } else {
                //     chat.items.addOrUpdate(response.result, false, true);
                // }
                // chat.addNewMessage(response.result)
                // chat.items.addOrUnShift(response.result, false, false);
                console.log('systemCallMessage', response.result)
                // chat.items.addOrUnShift(response.result, false, true);
                // chat.lastMessage.update(response.result, true);
                // chat.items.dataSource.endScroll()
            }
        }
    }
}

export { ChatKeyboard };
