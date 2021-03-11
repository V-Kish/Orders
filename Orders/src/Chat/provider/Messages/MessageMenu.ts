import { Base } from "../Base";
import { IconButton } from "../IconButton";
import { Alert, Clipboard } from "react-native";
import { Message } from '../Message';
import { ResendMessage, resendMessageType } from "./ResendMessage";
import { navigator } from '../../../Core/Navigator';
import { store } from '../Store';
import {fetchData} from "../../../Common/fetchData";
import { currentUser } from "../../../Core/CurrentUser";
// import { console } from '../../Common/console';
import { listChatsProvider } from '../../components/ChatListProvider';
import {CHAT_ICONS, ICONS} from "../../../constants/icons";

class MessageMenu extends Base {
    private _message: Message;
    private _visible?: boolean;
    private _resendButton: IconButton;
    private _closeButton: IconButton;
    private _editButton: IconButton;
    private _copyButton: IconButton;
    private _deleteButton: IconButton;

    constructor({ id, visible = false }: { id: string, visible?: boolean }) {
        super(id);
        this._visible = visible;

        this.onClosePress = this.onClosePress.bind(this);
        this.onResendPress = this.onResendPress.bind(this);
        this.onEditPress = this.onEditPress.bind(this);
        this.onCopyPress = this.onCopyPress.bind(this);
        this.onDeletePress = this.onDeletePress.bind(this);

        this._closeButton = new IconButton({
            id: `${id}_CloseIconButton`,
            // icon: require('../../assets/img/Icons/close/Close.png'),
            icon: CHAT_ICONS.close,
            onPress: this.onClosePress,
            style: 'imageArrowClose'
        });

        this._resendButton = new IconButton({
            id: `${id}_ResendIconButton`,
            // icon: require('../../assets/img/copyIcon/blackIcon/arrowSebd.png'),
            icon: CHAT_ICONS.resend,
            onPress: this.onResendPress,
            style: 'btnRight'
        });

        this._editButton = new IconButton({
            id: `${id}_EditIconButton`,
            // icon: require('../../assets/img/Icons/edit/edit.png'),
            icon: CHAT_ICONS.edit,
            onPress: this.onEditPress,
            style: 'btnIconEdit'
        });

        this._copyButton = new IconButton({
            id: `${id}_CopyIconButton`,
            // icon: require('../../assets/img/copyIcon/blackIcon/copy2.png'),
            icon: CHAT_ICONS.copy,
            onPress: this.onCopyPress,
            style: 'btnRight'
        });

        this._deleteButton = new IconButton({
            id: `${id}_DeleteIconButton`,
            // icon: require('../../assets/img/copyIcon/blackIcon/trash.png'),
            icon: CHAT_ICONS.trash,
            onPress: this.onDeletePress,
            style: 'iconCopy'
        });
    }

    get visible() {
        return this._visible;
    }
    set visible(value) {
        if (!value) {
            this.clear();
        }
        this._visible = value;
        this.modified = true;
        this.forceUpdate();
    }

    show(message: Message) {
        this.message = message;
        this.visible = true;
    }

    onClosePress() {
        this.visible = false;
    }

    onResendPress() {
        store().chats.keyboard.emojiChat.resendMessage.out = true;
        store().chats.keyboard.emojiChat.onResend(this.message)
        this.visible = false;
        // @ts-ignore
        navigator().navigate('ContactsScreen', { action: resendMessageType.resend });
    }

    onEditPress() {
        store().chats.keyboard.emojiChat.onEdit(this.message)
       // store().chats.keyboard.onEdit(this.message);
        this.visible = false;
    }

    onCopyPress() {
        if (this.message === null) {
            return;
        }
        let copy: string = null;
        if (typeof this.message.message === 'string') {
            copy = this.message.message;
        }
        else if (typeof this.message.message === 'object')  {
            copy = this.message.message.comment;
        }
        if (typeof copy !== 'undefined' && copy !== null && copy.length !== 0) {
            Clipboard.setString(copy);
        }
        this.visible = false;
    }

    deleteMessageOnServer(){
        fetchData(
            `${currentUser().userToken}/${currentUser().currentOsbb?.hash}/chat/${store().chats.selectedChatId}/messages/remove/${
                this.message.id
            }`,
            'POST',
            {
                userToken: currentUser().userToken,
                chatId: store().chats.selectedChatId,
                messageId: this.message.id,
            },null,null,true
        ).then(response => {
            console.log('delete responce', response)
            if(response.statusMessage === 'success') {
                this.message.selfDelete();
                this.clear();
                this.onClosePress();
                listChatsProvider().Init(
                    currentUser().userToken,
                    result => {
                        const chats = store().chats;
                        result.forEach(item => {
                            chats.addOrUpdate(item, false);
                        });
                        if (navigator().getCurrentScreen() === 'Contacts') {
                            chats.reOrderChats();
                            chats.modified = true;
                            chats.forceUpdate();
                        }
                    },
                    data => {
                        console.log(
                            'pushMessagesHandler.js -> _updateChatList ->  listChatsProvider().Init error: ',
                            data,
                        );
                    },
                    true,
                );
            }
        })
    }

    onDeletePress() {
        Alert.alert(
            'Увага',
            'Видалити повідомлення ?',
            [
                {
                    text: 'Скасувати', onPress: () => {
                        this.clear();
                        this.onClosePress();
                    }
                    , style: 'cancel'
                },
                {
                    text: 'Так', onPress: () => {
                        this.deleteMessageOnServer();
                    }
                },
            ],
            { cancelable: false }
        );
    }

    clear() {
        this.message = null;
    }

    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }

    get closeButton() {
        return this._closeButton;
    }

    get resendButton() {
        return this._resendButton;
    }

    get editButton() {
        return this._editButton;
    }

    get copyButton() {
        return this._copyButton;
    }

    get deleteButton() {
        return this._deleteButton;
    }
}

export { MessageMenu };
