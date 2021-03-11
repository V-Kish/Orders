import { ChatInput } from "./ChatInput";
import { EmojiField } from "./EmojiField";
import {Keyboard, Dimensions, Platform, Alert} from 'react-native'
import { Base } from "../Base";
import Geolocation from "@react-native-community/geolocation";
import { KeyboardFilePreview } from "../Messages/KeyboardFilePreview";
import { ResendMessage, resendMessageType } from "../Messages/ResendMessage";
import { Message } from "../Message";
import { store } from "../Store";
import { messageTemplateObj } from '../../functions/messageTempateObj';
import { currentUser } from "../../../Core/CurrentUser";
import { fetchData } from "../../../Common/fetchData";
// import { console } from '../../Common/console';
import { MessageHelper } from "../Messages/MessageHelper";
import { fileUploader } from '../../functions/fileUploader'
import { KeyboardFilePicker } from "../KeyboardFilePicker";
import { navigator } from '../../../Core/Navigator'
import DeviceInfo from "react-native-device-info";

import {
    mockupHeightToDP as hp,
} from '../../../constants/Dimensions';
import {AppSettings} from "../../../Common/AppSettings";
import DevicesIPhone from "../../../Core/DevicesIPhone/DevicesIPhone";


type emojiChatProps = {
    id: string;
    style?: string;
    emojiFieldVisiable?: boolean;
    ref?: any;
    topIsEmoji?: number;
    navigation?: any;
}
class EmojiChat extends Base {
    private _model: emojiChatProps;
    private _chatInput: ChatInput;
    private _emojiField: EmojiField;
    private _refOnViewKeyboard;
    private lastCoords: { latitude: number; longitude: number };
    public keyboardFilePreview: KeyboardFilePreview;
    public resendMessage: ResendMessage;
    public keyboardFilePicker: KeyboardFilePicker;
    private _keyboardVisible: boolean;
    private _messageListRef: any;
    private _message: string;
    private _mistakeHeight: number | null
    private _fileMessage: any;
    constructor(model: emojiChatProps) {
        super(model.id)
        this._model = model;

        this._keyboardVisible = false;

        this.onSmilePress = this.onSmilePress.bind(this);
        this.onKeyboardPress = this.onKeyboardPress.bind(this);

        this.onInputContentSizeChange = this.onInputContentSizeChange.bind(this);
        this._message = null;
        this._messageListRef = null;

        this.sendMessage = this.sendMessage.bind(this);
        this.openPicker = this.openPicker.bind(this);
        this.pickFiles = this.pickFiles.bind(this);
        this.pickPhoto = this.pickPhoto.bind(this);
        this.send = this.send.bind(this);
        this.resend = this.resend.bind(this);
        this.sendEdited = this.sendEdited.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.onShowFilePreview = this.onShowFilePreview.bind(this);
        this.onExitFilePreview = this.onExitFilePreview.bind(this);
        this.onEditShow = this.onEditShow.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditHide = this.onEditHide.bind(this);
        this.onResend = this.onResend.bind(this);
        this.keyboardDidShow = this.keyboardDidShow.bind(this);
        this.keyboardDidHide = this.keyboardDidHide.bind(this);
        this.setEmoji = this.setEmoji.bind(this);
        this.onChatInputFocus = this.onChatInputFocus.bind(this);
        this.onArrowPress = this.onArrowPress.bind(this);
        this.setEditing=this.setEditing.bind(this);
        this._mistakeHeight = null
        this.lastCoords = {
            latitude: null,
            longitude: null,
        };
        this.keyboardFilePicker = new KeyboardFilePicker({
            pickFiles: this.pickFiles,
            pickPhoto: this.pickPhoto,
            id: 'ChatKeyboard_FilePicker',
            hidden: true,
            onCloseBack: this.closePicker
        });
        this.resendMessage = new ResendMessage({ id: 'Chats_ResendMessage', onExit: this.onEditHide });
        this.keyboardFilePreview = new KeyboardFilePreview({
            id: 'ChatKeyboard_FilePreview',
            hidden: true,
            keyboard: this,
            onShow: this.onShowFilePreview,
            onExit: this.onExitFilePreview,
        });

        this._chatInput = new ChatInput({
            id: 'ChatInput',
            style: 'first',
            onSmilePress: this.onSmilePress,
            onKeyboardPress: this.onKeyboardPress,
            onArrowPress: this.onArrowPress,
            onClipPress: this.openPicker,
            onContentSizeChange: this.onInputContentSizeChange,
            onFocus: this.onChatInputFocus

        });
        this._emojiField = new EmojiField({
            id: 'emojiField',
            emojiButton: '',
            style: 'first',
            onEmojiPress: this.setEmoji
        });
        this._fileMessage = []
    }

    get styles() {
        return this._model.style;
    }

    get emojiFieldVisible() {
        return this._model.emojiFieldVisiable;
    }

    set emojiFieldVisible(value: boolean) {
        this._model.emojiFieldVisiable = value;
    }

    set messageListRef(value: any) {
        this._messageListRef = value;
    }

    get chatInput() {
        return this._chatInput;
    }

    get emojiField() {
        return this._emojiField;
    }

    get keyboardPaddingButton() {
        return navigator().keyboardHeight + this.chatInput.height;
    }

    get ref() {
        return this._model.ref;
    }

    set ref(value) {
        if (value !== this._model.ref) {
            this._model.ref = value;
        }
    }

    get topIsEmoji() {
        return navigator().keyboardHeight - hp(50);
    }

    get scrollViewHeight() {
        const mistake = 0;
        return navigator().deviceHeight - navigator().keyboardHeight - hp(60) - this.chatInput.height - hp(80) - hp(10) - mistake;
    }

    updateScrollViewHeight () {
        if (this._messageListRef !== null){
        try {
            this._messageListRef.setNativeProps({style:{height: this.scrollViewHeight}});
        }catch (error){
            console.log('error updateScrollViewHeight',error)
        }
        }
        if (store().chats.current !== null && !store().chats.current.items.goUp){
            // setTimeout(()=>store().chats.current.items.scrollToEnd(true),10)
        }
    }

    resetScrollViewHeight(){
        if (this._messageListRef !== null){
            try {
                this._messageListRef.setNativeProps({style:{height: navigator().deviceHeight - hp(60) - this.chatInput.height - hp(80) - hp(10)}});
            }catch (error){
                console.log('error updateScrollViewHeight',error)
            }
        }
    }

    set topIsEmoji(value) {
        if (value !== this._model.topIsEmoji) {
            this._model.topIsEmoji = value;
            this.forceUpdate();
        }
    }

    get refOnViewKeyboard() {
        return this._refOnViewKeyboard;
    }

    set refOnViewKeyboard(value) {
        this._refOnViewKeyboard = value;
    }

    get keyboardVisible() {
        return this._keyboardVisible;
    }

    set keyboardVisible(value: boolean) {
        this._keyboardVisible = value;
    }


    setEmoji () {
        try {
            let start = this._chatInput.selection.start;
            let end = this._chatInput.selection.end;

            let leftStr = this._chatInput.textBox.value.substring(0, start);
            let rightStr = this._chatInput.textBox.value.substring(end, this._chatInput.textBox.value.length);
            let lengthOfEmoji = this._emojiField.emojiButton.length;
            let str = leftStr + this._emojiField.emojiButton + rightStr;
            this._chatInput.selection = {start: start + lengthOfEmoji, end: end + lengthOfEmoji};

            this.chatInput.textBox.onChangeText(str);
        } catch(e){
            console.log('error')
        }
    }

    closeEmoji() {
        this.resetTop();
        this.showEmojiButton();
        this.emojiField.update(0);
        this.emojiFieldVisible = false;
    }

    showEmojiButton() {
        this.chatInput.buttonKeyboard.hidden = true;
        this.chatInput.buttonSmile.hidden = false;
    }

    showKeyboardButton() {
        this.chatInput.buttonSmile.hidden = true;
        this.chatInput.buttonKeyboard.hidden = false;
    }

    showSendButton() {
        this.chatInput.buttonClip.hidden = true;
        this.chatInput.buttonArrow.hidden = false;
    }

    showFilePickerButton() {
        this.chatInput.buttonArrow.hidden = true;
        this.chatInput.buttonClip.hidden = false;
    }

    onSmilePress() {
        console.log('onSmilePress', this.keyboardVisible);
        this.emojiFieldVisible = true;

        if (this.keyboardVisible) {
            Keyboard.dismiss();
            this.keyboardVisible = false;
        }
        this.showKeyboardButton();

        this.updateTop();
        this.emojiField.update(navigator().keyboardHeight);

        this.chatInput.textBox.blur();
        this.updateScrollViewHeight();

       /* this.chatInput.textBox.ref.setNativeProps({
            text: this.chatInput.textBox.value,
            selection: this.chatInput.selection
        });*/
    }

    onKeyboardPress() {
        this.showEmojiButton();

        this.emojiFieldVisible = false;
        this.chatInput.textBox.focus()
    }

    onChatInputFocus() {
        this.keyboardVisible = true;
        this.emojiFieldVisible = false;
        this.updateTop();
    }

    onInputContentSizeChange(height: number, delta: number) {
        if (this.chatInput.textBox.ref !== null){
            try {
                this.chatInput.textBox.ref.setNativeProps({
                    style: { height }
                });
                //this.updateScrollViewHeight();//
                this.chatInput.updateHeight();
                this.updateTop();
            }
            catch (ex) {
                console.error('EmoijiChat.onInputContentSizeChange ->', ex);
            }
        }
    }

    inputContentSizeChangeToDefault() {
        this.onInputContentSizeChange(this.chatInput.initialInputHeight, 0);
    }

    getModalWindowHeight(): number {
        if (!this.keyboardFilePicker.hidden) {
            return hp(140);
        }
        if (!this.keyboardFilePreview.hidden) {
            return this.keyboardFilePreview.height;
        }
        if (this.resendMessage.message !== null) {
            return this.resendMessage.height;
        }
        return 0;
    }

    onShowFilePreview() {
        this.updateTop();
    }

    onExitFilePreview() {
        this.updateTop();
        if (this.chatInput.textBox.value === '') {
            this.showFilePickerButton();
        }
    }

    closePicker() {
        this.updateTop();
    }

    openPicker() {
        this.updateTop();
        this.keyboardFilePicker.update(false, true);
    }

    pickFiles() {
        navigator().picker = true;
        this.keyboardFilePicker.pick('files').then(file => {
            if (file) {
                this._fileMessage.push(file[0])
                this.keyboardFilePicker.update(true, true);
                this.keyboardFilePreview.files = file;
                this.showEmojiButton();
                this.showSendButton();
            }
        })
    }

    pickPhoto() {
        navigator().picker = true;
        this.keyboardFilePicker.pick('image').then(file => {
            if (file) {
                this._fileMessage.push(file[0])
                this.keyboardFilePicker.update(true, true);
                this.keyboardFilePreview.files = file;

                this.showEmojiButton();
                this.showSendButton();
            }
        })
    }

    onEditShow() {
        this.updateTop();
    }

    onEditHide() {
        this.updateTop();
    }

    onEdit(message: Message) {
        this.resendMessage.message = message;
        //
        this.chatInput.textBox.value = message.text
        this.resendMessage.type = resendMessageType.edit;
        this.resendMessage.modified = true;
        this.resendMessage.forceUpdate();
        //
        this.showEmojiButton();
        this.showSendButton();
        this.chatInput.textBox.focus();
        this.onEditShow();
    }

    onResend(message: Message) {
        store().contactsItems.refresh().then(() => {
            message.userName = store().contactsItems.storage.get(message.uFrom).name;
            this.resendMessage.message = message;
            this.resendMessage.type = resendMessageType.resend;
            this.resendMessage.modified = true;
            this.resendMessage.forceUpdate();
            this.showEmojiButton();
            this.showSendButton();
        })
    }
    async onArrowPress() {
        this.showFilePickerButton();
        this._message = this._chatInput.textBox.value;
        this._chatInput.textBox.clearFormWithoutBlur();
        this.inputContentSizeChangeToDefault();
        setTimeout(() => { this.send() }, 0)

    }
    send() {
        this.getGeolocation().then();

        if (this.keyboardFilePreview.files.length !== 0) {
            const newMessages = this.createFakeFileMessages();
            this.sendFiles(newMessages).then()
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

    resend(message: Message) {
        store().chats.keyboard.emojiChat.resendMessage.setIn();
        const chat = store().chats.current;
        let startFn = -new Date().getTime();
        const commentValue = this._message;
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
            `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${store().chats.selectedChatId}/messages/add-forward`,
            'post',
            {
                originMessageId: message.id,
                forwardComment: commentValue,
                geo: { ...this.lastCoords },
                _id: startFn,
                _idForward: commentValue.length > 0 ? startFn - 1 : startFn,
            },
            null,null,true
        )
            .then(
                response => {
                    if (response.result || response.forwardResult) {
                        if (response.result) {
                            chat.items.addOrUpdate(response.result, false, true);
                        }
                        if (response.forwardResult) {
                            chat.items.addOrUpdate(response.forwardResult, false, true);
                            chat.lastMessage.update(response.forwardResult, true);
                        }
                        this.resendMessage.onPress();
                        this.showEmojiButton();
                        this.chatInput.textBox.clearForm();
                        chat.items.scrollToEnd();
                    }
                },
                err => console.warn('err', err),
            );
    }
    setEditing(){
        const chat = store().chats.current;
        if(chat.items.yPosition === null || chat.items.yPosition >= chat.items.yValue - 300){
            chat.items.editing=true;
        }
    }
    sendEdited(message: Message) {
        const messageText = this._message;
        const chat = store().chats.current;
        this.setEditing()
        console.log('edited message', message)
        console.log('edit body',{
            originMessageId: message.id,
            newMessage: messageText,
            messageType: message.messageType,
        })
        fetchData(
            `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${store().chats.selectedChatId}/messages/edit`,
            'post',
            {
                originMessageId: message.id,
                newMessage: messageText,
                messageType: message.messageType,
            }, null,null,true
        )
            .then(
                response => {
                    console.log('edit response', response)
                    if (response.result) {
                        chat.items.modified = true;
                        chat.forceUpdate();
                        message.text = messageText;
                        message.modified = true;
                        message.forceUpdate();
                       // this.chatInput.textBox.clearForm();
                       // this.showEmojiButton();
                        this.resendMessage.clear();
                        this.resendMessage.modified = true;
                        this.resendMessage.forceUpdate();
                        this.onEditHide();
                        this.updateScrollViewHeight();
                    }
                },
                err => console.log('err', err),
            );
    }

    newMessage(fileIndex?: number) {
        const textBoxValue = this._message;
        const checkString = textBoxValue.replace(/[\r\n\s]+/g, '');
        const newMessage = messageTemplateObj();
        if (this.keyboardFilePreview.files[fileIndex]) {
            newMessage.message = this.fileMessageObj(fileIndex)
            newMessage.messageType = 1;
            if (fileIndex === 0) {
                newMessage.message.comment = checkString !== '' ? textBoxValue : '';
            }
            newMessage.messageType = MessageHelper.getMessageType(newMessage.message.fileNmae);
            // newMessage.isLoading = true;
            newMessage.isLoading = true;
        } else {
            newMessage.message = checkString !== '' ? textBoxValue : '';
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

    async sendMessage() {
        try {
            const chat = store().chats.current;
            const newMessage = this.newMessage();
            if (newMessage.message === '') {
                this.showEmojiButton();
                return;
            }
            console.log('newMessage',newMessage)
            chat.addNewMessage(newMessage);
            // chat.items.modified = true;
            // chat.forceUpdate();
            this.showEmojiButton();
            chat?.crossScrollingBottom()
            // chat.items.dataSource.endScroll()
            // chat.items.scrollToEnd(true);
            const response = await fetchData(
                `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${
                store().chats.selectedChatId
                }/messages/add`,
                'post',
                {
                    message: newMessage.message,
                    messageType: 1,
                    geo: {
                        ...this.lastCoords
                    },
                    _id: newMessage.id,
                    // _id: newMessage.timeStamp,
                },
                null,null,true
                // newMessage.id,
            );
            console.log('addmessage', response);
            if (response.result) {
                if(Platform.OS==='ios'){
                    chat.items.addOrUpdate(response.result, false, true);
                    chat.lastMessage.update(response.result, true);
                    chat.items.scrollToEnd(true);
                } else {
                    chat.items.update(response.result, true)
                    chat.lastMessage.update(response.result, true);
                    chat.items.dataSource.endScroll()
                }
            }
        }
        catch (ex) {
            console.log('sendMessage -> error', ex);
        }
    }

    createFakeFileMessages() {
        if(Platform.OS === 'ios') {
            const chat = store().chats.current;
            const newMessages = []
            this.keyboardFilePreview.files.forEach((item, index) => {
                const newMessage = this.newMessage(index)
                chat.addNewMessage(newMessage);
                chat.items.modified = true;
                chat.forceUpdate(() => chat.items.scrollToEnd());
                newMessages.push(newMessage);
            });
            chat.items.modified = true;
            chat.forceUpdate(() => chat.items.scrollToEnd());
            this.keyboardFilePreview.removeFile();
            return newMessages;
        } else {
            const chat = store().chats.current;
            const newMessages = []
            this.keyboardFilePreview.files.forEach((item, index) => {
                const newMessage = this.newMessage(index)
                chat.addNewMessage(newMessage);
                newMessages.push(newMessage);
            });
            chat.items.modified = true;
            chat.forceUpdate(() => chat.items.dataSource.endScroll());
            this.keyboardFilePreview.removeFile();
            return newMessages;
        }
    }

/*    async sendFiles(files, fileIndex: number = 0, triesToSent: number = 0) {
        if (fileIndex === files.length) {
            this.keyboardFilePreview.removeFile();
            return;
        }
        const response = await this.sendFile(files[fileIndex]);
        if (response && fileIndex <= files.length - 1) {
            console.log('sendFiles', fileIndex);
            fileIndex++;
            return this.sendFiles(files, fileIndex, 0);
        } else {
            if (triesToSent < 3) {
                triesToSent++;
                return this.sendFiles(files, fileIndex, triesToSent);
            } else {
                fileIndex++;
                return this.sendFiles(files, fileIndex, 0);
            }
        }
    }*/

    async  sendOneFile(file, triesToSent: number = 0) {
        try {
            console.log('sendOneFile', file);
            const response = await this.sendFile(file);
            if (response) {
                console.log('sendFiles');
                return true;
            } else {
                if (triesToSent < 3) {
                    triesToSent++;
                    return this.sendOneFile(file, triesToSent);
                } else {
                    return false;
                }
            }
        } catch (e) {
            if (triesToSent < 3) {
                triesToSent++;
                return this.sendOneFile(file, triesToSent);
            }
            console.log('sendFiles error');
        }
        return false;
    }

    async sendFiles(files) {
        //await files.forEach(file => this.sendOneFile(file));
        for (let i = 0; i < files.length; i++) {
            await this.sendOneFile(files[i]);
        }
        this._fileMessage = []
    }

    async sendFile(newMessage) {
        try {
            const chat = store().chats.current;
            this.chatInput.textBox.clearForm();
            this.showEmojiButton();
            this.keyboardFilePreview.close();
            return this.uploadFileToServer(newMessage)
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
                `${currentUser().userToken}/chat/${store().chats.selectedChatId}/file/add`,
                () => { },
                null,
            )
            if (response.response.result) {
                response.response.result.message.item.isLoading = false;
                chat.items.addOrUpdate(response.response.result.message.item, false);
                chat.lastMessage.update(response.response.result.message.item, true);
                setTimeout(() => chat.items.scrollToEnd(), 100);
            }
            return response.response.statusCode === 200;
        } catch (e) {
            console.log('sendFileError', e)
            return false
        }
    }

    bigFileError(newMessage){
        Alert.alert('Помилка', 'Великий розмір файлу')
        const chat = store().chats.current
        chat.deleteMessage(newMessage.id)
        chat.forceUpdate()
    }

    async uploadFileToServer(newMessage){
        const chat = store().chats.current;
        chat?.crossScrollingBottom()
        const data = new FormData();
        data.append('comment', newMessage.message.comment);
        data.append('chatId', newMessage.groupId);
        data.append('_id', newMessage.id);
        let file = this._fileMessage.find(f=>f.name === newMessage.message.fileNmae);
        if(file!== undefined && file!== null){
            console.log('fileSize', file.size)
            // if(file[0].size>50000){
            //     this.bigFileError(newMessage)
            //     this._fileMessage = null
            //     return false
            // }
            data.append('file', file);
            // this._fileMessage = null
        } else {
            return false
        }
        try{
            const response = await fetch(
                `${AppSettings.chatEndpoint}/${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${store().chats.selectedChatId}/file/add-as-filebase`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'multipart/form-data',
                        'Content-Type': 'multipart/form-data',
                        'access-token': 'F5E4C34D-0D3E-4BC7-8EBD-2D2AC4D626EA',
                        'role-token': '2FCB66F5-D533-4648-BB7A-BABBA23D6F03',
                    },
                    body:data
                },
            );
            console.log('responce', response)
            // if bad responce remove unloaded message
            if(!response.ok){
                // Alert.alert('Помилка', 'Великий розмір файлу')
                // const chat = store().chats.current
                // chat.deleteMessage(newMessage.id)
                // chat.forceUpdate()
                this.bigFileError(newMessage)
                return true
            }
            const json = await response.json();
            if (json.statusCode === 200) {
                json.result.message.item.isLoading = false;
                const lastItem = chat.items.storage.find(e=>e._id == newMessage.id)
                // console.log('responceJson', json)
                // console.log('responceItem', lastItem)
                if(lastItem!==undefined){
                    // chat.items.update(json.result.message.item)
                    lastItem.uFromStatus = 1;
                    // if(lastItem.message===undefined){
                    //     lastItem.message = {}
                    // }
                    console.log('fileId',json.result)
                    lastItem._id = json.result.message.item.id;
                    lastItem.message.fileHash = json.result.file.fileHash;
                    lastItem.isLoading = false;
                    lastItem.modified = true;
                    lastItem.forceUpdate();
                }
                // chat.items.update(json.result.message.item, true)
                // chat.items.update(json.result.message.item, true)
                // chat.items.addOrUnShift(json.result.message.item, true, );
                chat.lastMessage.update(json.result.message.item, true);
                // setTimeout(() => chat.items.scrollToEnd(), 100);
                chat.items.dataSource.endScroll()
            }
            return json.statusCode === 200;
        } catch(e){
            console.log('responce errpr', e)
            return false
        }
    }

    async getGeolocation() {
        await Geolocation.getCurrentPosition(
            ({ coords }) => {
                this.lastCoords = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                };
            },
            error => { },
            { enableHighAccuracy: false },
        );
    }

    get top() {
        //const mistake = this._mistakeHeight !== null ? (this._mistakeHeight>60 ? this._mistakeHeight/2 - 10 : 0) : 0
        // console.log('dimensionHeight mistake',mistake)
         const mistake = 0
        // console.log('dimensionHeight device',navigator().deviceHeight)
        // console.log('dimensionHeight keyboard',navigator().keyboardHeight)
        // console.log('dimensionHeight chatInput',this.chatInput.height)
        // console.log('dimensionHeight modal',this.getModalWindowHeight())
        return navigator().deviceHeight - navigator().keyboardHeight - this.chatInput.height - hp(60) - this.getModalWindowHeight() - hp(80) - mistake - hp(10);
    }

    updateTop() {
        if ( this.refOnViewKeyboard === null){
            return;
        }
        try {
            if (this.emojiFieldVisible || this.keyboardVisible) {
                this.refOnViewKeyboard.setNativeProps({ style: { top: this.top +  (Platform.OS === 'ios' ? currentUser().saveAreaInset.bottom : 0)} });
            }
            else {
                this.refOnViewKeyboard.setNativeProps({ style: { top: navigator().deviceHeight - this.chatInput.height - hp(60) - this.getModalWindowHeight() - hp(80) - hp(10)} });
            }
        }
        catch (ex) {
            console.error('updateTop setNativeProps', ex);
        }
    }

    resetTop() {
        if ( this.refOnViewKeyboard === null){
            return;
        }
        try {//640  //618
            const height = navigator().deviceHeight;
            const d = Dimensions.get('window').height;
            this.refOnViewKeyboard.setNativeProps({ style: { top: navigator().deviceHeight - this.chatInput.height - hp(60)  - this.getModalWindowHeight() - hp(80) - hp(10) } });
        }
        catch (ex) {
            console.log('resetTop setNativeProps', ex);
        }
    }

    keyboardDidShow() {
        this.updateScrollViewHeight();
        this.emojiField.update(navigator().keyboardHeight);

        this.keyboardVisible = true;
        this.emojiFieldVisible = false;
        this.showEmojiButton();
        this.updateTop();
    }

    keyboardDidHide() {

        if (this.emojiFieldVisible) {
            this.updateScrollViewHeight();
        } else {
            this.closeEmoji()
            this.resetScrollViewHeight();
            this.chatInput.textBox.blur();
        }
        this.keyboardVisible = false;
    }

    get mistakeHeight(){
        return this._mistakeHeight
    }
    set mistakeHeight(value){
        this._mistakeHeight = value
    }
}

export { EmojiChat }
