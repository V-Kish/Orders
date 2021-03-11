import { dateParse } from '../../Common/dateParse';
import { convertToUTCString } from '../../Common/dateParse';
import { MessageListIOS } from './MessageListIOS';
import { Message } from './Message';
import { Base } from './Base';
// import { Users } from './Users';
import { UnreadCount } from './UnreadCount';
import { LastMessage } from './LastMessage';
import { ChatTime } from './ChatTime';
import { ChatName } from './ChatName';
import { ContactIcon } from './ContactIcon';
import { navigator } from '../../Core/Navigator';
import { Chats } from './Chats';
import { store } from './Store';
import { fetchData } from '../../Common/fetchData';
import { currentUser } from '../../Core/CurrentUser';
import {ContactItem} from "./Contacts/ContactItem";
import {ChatMembersList} from "./ChatMembersList";
import {Platform} from "react-native";
import {MessageList} from "./MessageList";
import {ModalDeleteGroup} from "./Drawer/ModalDeleteGroup";
// import { GroupMembers } from './Group/GroupMembers';
// import {ContactsList} from "./Contacts/SelectedContacts";
// import {NewMessageIndicator} from "./Messages/NewMessageIndicator";
// import { ContactIsOnline } from './ContactIsOnline';
// import { AppLog } from '../Common/AppLog';
// import { ContactsItems } from './Contacts/ContactsItems';

type ownerUser = {
    hash: string,
    id: number,
    name: string,
}
type pairUser = ownerUser;

class Chat extends Base {
    name: ChatName;
    chats: Chats;
    lastMessage: LastMessage;
    isPublic: boolean;
    membersCount: number;
    timeStamp: number;
    pageIndex: number;
    users: Array<ContactItem>;
    items: MessageListIOS;
    photo: ContactIcon;
    unreadCount: UnreadCount;
    chatTime: ChatTime;
    private _modalDeleteGroup: ModalDeleteGroup;
    private _chatMembersList: ChatMembersList
    ownerUser: ownerUser;
    pairUser: pairUser;
    private _refOnScrollList: any;
    private _contactItem: any;
    private _isOsbbMainGroup: boolean
    constructor(model, chats) {
        super(model.id.toString());
        // Название чата
        this.name = new ChatName(model);
        // головна група осбб
        this._isOsbbMainGroup = model.isOsbbMainGroup
        // Список сообщений
       // this.items = Platform.OS === 'ios' ? new MessageListIOS(model) : new MessageList(model);
        this.items =new MessageListIOS(model);
        //List of current chat users
        this.users = new Array<ContactItem>();
        //Last uploaded message page from API
        this.pageIndex = 1;
        //Last message written in chat
        this.lastMessage = new LastMessage(model);
        //Date of last update
        this.timeStamp = dateParse(
            convertToUTCString(model.messageDate, global.__timeOffset__),
        ).getTime();
        //Type of chat(public, private)
        this.isPublic = model.isPublic;
        //Unread messages in chat
        this.unreadCount = new UnreadCount(model);
        //Last written message time
        this.chatTime = new ChatTime(model);
        //Chat avatar
        // console.log('store().contactsItems.getOrAdd(model.pairUser.id)',store().contactsItems.getOrAdd(model.pairUser.id))
        // console.log('model.pairUser.id', model.pairUser.id)
        this.photo = !this.isPublic
            ? store().contactsItems.getOrAdd(model.pairUser.id).icon
            : new ContactIcon({
                photo: model.photo,
                name: this.name.name,
                isPublic: true,
                id: this.id,
                contactId: null
            });
        //q-ty of chat members
        this.membersCount = model.membersCount;
        //owner user object
        this.ownerUser = model.ownerUser;
        //pair user
        this.pairUser = model.pairUser;
        //Chats this
        this.chats = chats;
        const shouldToCreate = model.shouldToCreateNewChat === undefined ? false : model.shouldToCreateNewChat
        if(shouldToCreate){
            this._contactItem = model.contactItem
        } else {
            this._contactItem = null
        }
        //Chat onPress
        this.onPress = this.onPress.bind(this);
        this.onPressChat = this.onPressChat.bind(this);
        // Модалка для видалення групи
        this._modalDeleteGroup = new ModalDeleteGroup({
            id: `chat_${model.id}_ModalDeleteGroup`,
            chatId: this.id,
            groupName: this.name.name,
            hidden: false
        });
        this._chatMembersList = new ChatMembersList(`${this.id}_ChatMembersList`, this.users, this.ownerUser.id);
    }

    get isOsbbMainGroup(){
        return this._isOsbbMainGroup
    }
    get chatMembersList() {
        this._chatMembersList.setUsers(this.users);
        return this._chatMembersList;
    }

    get modalDeleteGroup() {
        return this._modalDeleteGroup;
    }

    update(model, forceUpdate = true) {
        if (this.unreadCount.update(model, forceUpdate)) {
            this.modified = true;
        }
        if (this.lastMessage.update(model, forceUpdate)) {
            this.modified = true;
        }
        this.chatTime.update(model);
        if (this.name.update(model, forceUpdate)) {
            this.modified = true;
        }
        if (model.hasOwnProperty('img')) {
            this.img = model.img;
        }
        this.timeStamp = dateParse(
            convertToUTCString(model.messageDate, global.__timeOffset__),
        ).getTime();
    }

    get activeUsers() {
        let count = 0
        this.users.forEach(item => item.contactIcon.isOnline.status ? count++ : null);
        return count;
    }

    get refOnScrollList(){
        return this._refOnScrollList;
    }
    set refOnScrollList(value){
        this._refOnScrollList=value;
    }

    getMessage(id) {
        return this.items.get(id);
    }

    deleteMessage(id) {
        this.items.delete(id)
    }

    deleteUser(id) {
        const findUser = this.users.findIndex(item => item.id == id);
        if(findUser !== -1){
            this.users.splice(findUser, 1);
        }
    }

    addNewMessage(message) {
        // if(store().recyclerViewInverted){
        //     if(Platform.OS==='ios'){
        //         // MessageListIOS.addOrUpdateSeparator(message, this.items.lastMessage.uFromDate, this.items, false);
        //         this.items.add(message);
        //         this.items.iconized().then();
        //         this.forceUpdate()
        //     } else {
        //         this.items.unShift(message)
        //     }
        // } else {
        //     MessageList.addOrUpdateSeparator(message, this.items.lastMessage.uFromDate, this.items, false);
        //     this.items.add(message);
        //     this.items.iconized().then();
        // }
        this.items.add(message);
        this.items.iconized().then();
        this.forceUpdate()
    }

    async onPress(preloaderDisabled: boolean = false) {
        navigator().hideSearch()
        this.chats.selectedChatId = parseInt(this.id);
        this.unreadCount.update({unreadCount:0},true);
        console.log(this.chats.selectedChatId)
        if (preloaderDisabled){
            // if(store().chats.current!==null){
                store().chats.current.items.firstPreloader.hidden = false;
            // }
             // navigator().navigate('ChatScreen', { screen: 'Chat', data: { chatId: this.id }, key });
            navigator().navigate('ChatScreen');
            return;
        }
        await store().preloader.showWithCallback(() => {
            // if(store().chats.current!==null) {
                store().chats.current.items.firstPreloader.hidden = false;
            // }
             // navigator().navigate('ChatScreen', { screen: 'Chat', data: { chatId: this.id }, key });
            navigator().navigate('ChatScreen');
        });
    }

    get contactItemFromFakeContact(){
        return this._contactItem
    }

    async onPressChat() {
        if(this._contactItem!==null){
            await this.shouldToCreateChat(this._contactItem)
        } else {
            await this.onPress();
        }
    }

    async shouldToCreateChat(e: ContactItem){
        const contactItem = e
        await store().contacts.onPress(contactItem);
        // setTimeout(()=>{
        // }, 5000)
    }

    crossScrollingBottom(){
        try{
            this.items.scrollToEnd()
        // if(Platform.OS==='ios'){
        //     this.items.scrollToEnd()
        // } else {
        //     this.items.dataSource.endScroll()
        // }
        } catch(e){
            console.log('endScrollEvent ex', e)
        }
    }

    async setChatMembers(callback = ()=>{}) {
        try {
            const response = await fetchData(
                `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${this.id}/members`,
                'get',
                null,null,null, true
            );
            if (response.result && response.statusCode === 200) {
                this.users = response.result.map(item => {
                    const contactItem = store().contactsItems.createContactItem(item.id);
                    store().contactsItems.getOrAdd(contactItem.id);
                    //contactItem.contactIcon = new ContactIcon({ id: 1 });
                    return contactItem;
                });
                this.membersCount = this.users.length;
                callback()
            }
        } catch (e) {
            throw e;
        }
    }

    async loadChatMembers() {
        const chat = this
        try {
            this.setChatMembers(()=>{
                store().chatHeader.update(chat);
                chat.chatMembersList.forceUpdate();
            });
            // store().chats.drawerContainer.update();
            // store().drawerControlsChat.update();
            if (store().chats.keyboard.emojiChat.resendMessage.out) {
                store().chats.keyboard.emojiChat.resendMessage.out = false;
                store().chats.keyboard.emojiChat.onEditShow();
                store().chats.keyboard.emojiChat.resendMessage.setIn();
            } else {
                store().chats.keyboard.emojiChat.resendMessage.reset();
                store().chats.keyboard.emojiChat.resetTop();
            }
            if (chat.chats.messageMenu.visible) {
                chat.chats.messageMenu.visible = false;
            }
        } catch (e) {
            console.log('start f error', e);
            store().chatHeader.update(chat);
        }
    }
}

export { Chat };
