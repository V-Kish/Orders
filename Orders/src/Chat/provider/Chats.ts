import { Chat } from './Chat';
import { Base } from './Base';
import { ChatKeyboard } from './Messages/ChatKeyboard';
import { dateToString } from '../functions/dateToString';
import { dateParse } from '../functions/dateParse';
import { convertToUTCString } from '../functions/convertToUTCString';
import { MessageMenu } from './Messages/MessageMenu';
import { ResendMessage } from './Messages/ResendMessage';
// import {DrawerContainerMessages} from "./Drawer/DrawerContainerMessages";
// import {DrawerContainer} from "./Drawer/DrawerContainer";
// import {MainDrawer} from "./Drawer/MainDrawer";
// import { AppLog } from '../Common/AppLog';
import {currentUser} from "../../Core/CurrentUser";
import {store} from "./Store";
import {LastItemPaddingBottomModel} from "../../Models/navigation/PagedList/LastItemPaddingBottomModel";
// import {ChatMenu} from "./Drawer/ChatMenu";

class Chats extends Base {
    private _storage: Array<Chat>;
    private _selectedChatId: number = null;
    private _keyboard: ChatKeyboard;
    private _messageMenu: MessageMenu;
    // private _drawer: DrawerContainerMessages;
    // private _drawerContainer: DrawerContainer;
    // private _mainDrawer: MainDrawer;
    // private _drawerContainerChats: DrawerContainer;
    scrollViewRef: any;
    constructor() {
        super('Chats');
        this._storage = [];
        this._selectedChatId = null;
        this._keyboard = new ChatKeyboard();
        this._messageMenu = new MessageMenu({ id: 'MessageMenu', visible: false });
        // this._drawer = new DrawerContainerMessages({id: 'DrawerChats'});
        // this._drawerContainer = new DrawerContainer({id: 'ChatMenu'});
        // this._drawerContainerChats = new DrawerContainer({id: 'ChatsMenu'});
        // this._mainDrawer = new MainDrawer();
        this.scrollViewRef = null;
    }
    // get mainDrawer() {
    //     return this._mainDrawer;
    // }
    // get drawer() {
    //     return this._drawer;
    // }
    // get drawerContainer() {
    //     return this._drawerContainer;
    // }
    // get drawerContainerChats() {
    //     return this._drawerContainerChats;
    // }
    get keyboard() {
        return this._keyboard;
    }
    get selectedChatId() {
        return this._selectedChatId;
    }
    set selectedChatId(value) {
        this._selectedChatId = value;
    }

    get storage() {
        return this._storage;
    }

    clearList(){
        this._storage = []
    }

    findIndex(id: string) {
        return this.storage.findIndex(chat => chat.id === id);
    }

    get(id: string) {
        return this.getByIndex(this.findIndex(id.toString()));
    }
    get current() {
        if (this.selectedChatId === null) {
            return null;
        }
        return this.get(this.selectedChatId.toString());
    }
    getByIndex(index) {
        return index >= 0 ? this.storage[index] || null : null;
    }

    findPosition(chat) {
        const len = this.storage.length;
        for (let i = 0; i < len; i++) {
            if (this.storage[i].timeStamp <= chat.timeStamp) {
                return i;
            }
        }
        return len;
    }

    add(model) {
        const chat = new Chat(model, this);
        this.storage.splice(this.findPosition(chat), 0, chat);
        return chat;
    }

    update(model, forceUpdate = true) {
        const chat = this.get(model.id);
        if (chat !== null) {
            chat.update(model, forceUpdate);
        }
        return chat;
    }

    delete(model){
        const find = this.storage.findIndex(item => item.id === model.id )
        if(find !== -1){
            this.storage.splice(find, 1);
        }
    }

    addOrUpdate(model, forceUpdate = true) {
        return this.update(model, forceUpdate) || this.add(model);
    }

    remove(id) {
        let index = this.findIndex(id);
        if (index === -1){
            index = this.findIndex(id.toString());
        }
        if (index !== -1) {
            this.storage.splice(index, 1);
        }
        return index;
    }

    reOrderChats() {
        const len = this.storage.length;
        const sorted = this.storage.sort((a, b) => b.timeStamp - a.timeStamp);
        for (let i = 0; i < len; i++) {
            if (this.storage[i].id !== sorted[i].id) {
                this._storage = sorted;
                return;
            }
        }
    }

    addNewChat(payload) {
        const newChat = {};
        newChat.groupCreateDate = payload.Conversation.Group.date;
        newChat.id = payload.Conversation.Group.id;
        newChat.isEncrypt = payload.Conversation.Group.isEncrypt;
        newChat.isPublic = payload.Conversation.Group.isPublic;
        newChat.name = payload.Conversation.Group.isPublic
            ? payload.Conversation.Group.name
            : payload.Conversation.Members[payload.Conversation.Members.findIndex(user => user.id !== currentUser().userId)].name;
        newChat.photo = payload.Conversation.Group.photo;
        newChat.unreadCount = 0;
        newChat.pairUser = payload.pairUser ? payload.pairUser : null;
        newChat.message = payload.Conversation.LastMessage.message;
        newChat.messageId = payload.Conversation.LastMessage.messageId || payload.Conversation.LastMessage.id || -1;
        newChat.messageType = payload.Conversation.LastMessage.messageType;
        newChat.messageDate = payload.Conversation.LastMessage.date;
        newChat.items = [];
        newChat.users = [];
        newChat.timeStamp = new Date().getTime();
        newChat.membersCount = payload.Conversation.Members.length;
        newChat.ownerId = payload.Conversation.Group.ownerId;
        newChat.ownerUser = {id:payload.Conversation.Group.ownerId};
        newChat.lastMessage = {
            messageId: payload.Conversation.LastMessage.messageId || payload.Conversation.LastMessage.id || -1,
            id: -1,
            message: payload.Conversation.LastMessage.message,
            messageDate: dateToString(
                dateParse(
                    convertToUTCString(
                        payload.Conversation.LastMessage.date,
                        global.__timeOffset__,
                    ),
                ),
            ),
            messageType: payload.Conversation.LastMessage.messageType,
        };
        // AppLog.log('payload newChat', newChat);
        try {
            this.addOrUpdate(newChat, false);
        }
        catch (ex) {
            console.log('addNewChatErr', ex)
            // AppLog.error('addOrUpdate', ex);
        }
        // state.chats[newChat.id] = newChat;
        // const withNewChat = Object.keys(state.chats)
        //   .map(id => state.chats[id])
        //   .sort(function(a, b) {
        //     AppLog.log('withNewChat a', a);
        //     return b.timeStamp - a.timeStamp;
        //   });
    }

    get messageMenu() {
        return this._messageMenu;
    }

    removeUnchatedContacts(chat){
        const findedUnchatedItem = this.storage.filter(c => Math.abs(c.id) == Math.abs(chat.pairUser.id))
        findedUnchatedItem.forEach(item=>{
            if(+item.id < 0){
                this.remove(item.id)
            }
        })
    }

    initUnchatedElements(){
        store().contacts.load().then(
            ()=>{
                const unchatedContacts = Array.from(store().contacts.list.items.values()).map(i=>{
                    const findItem = this.storage.find(chat=> !chat.isPublic && Math.abs(chat.pairUser.id) == Math.abs(i.id))
                    if(findItem===undefined){
                        return i
                    }
                }).filter(i=> i !== undefined)
                // console.log('unchatedContacts', unchatedContacts)
                try{
                    unchatedContacts.forEach(e=>{
                        // console.log('unchatedContacts e', e)
                        if(+e.id!==+currentUser().userId) {
                            const nowDate = new Date()
                            this.addOrUpdate({
                                shouldToCreateNewChat: true,
                                contactItem: e,
                                groupCreateDate: '',
                                id: `-${e.id}`,
                                isEncrypt: false,
                                isPublic: false,
                                name: e.model.name,
                                photo: e.model.photo,
                                unreadCount: 0,
                                pairUser: e.model,
                                membersCount: 2,
                                message: 'Ще ніколи не спілкувались',
                                messageId: 999,
                                messageType: 1,
                                messageDate: `${nowDate.getDate()}.${nowDate.getMonth() + 1}.${nowDate.getFullYear() - 5}T10:10`,
                                items: [],
                                users: [],
                                ownerId: currentUser().userId,
                                ownerUser: {id: currentUser().userId},
                                timeStamp: new Date().getTime(),
                                lastMessage: {
                                    id: -1,
                                    messageId: 999,
                                    message: 'Ще ніколи не спілкувались',
                                    messageDate: dateToString(
                                        dateParse(
                                            convertToUTCString(
                                                '10.10.2019T10:10',
                                                global.__timeOffset__,
                                            ),
                                        ),
                                    ),
                                }
                            }, false)
                            this.forceUpdate()
                        }
                    })
                } catch(e){
                    console.log('unchatedContacts addOrUpdateError', e)
                }
                // console.log('unchatedContacts storage2', this.storage)
            }
        )
    }
}

export { Chats };
