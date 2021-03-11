import { Chats } from './Chats';
import { Chat } from './Chat';
import { Contacts } from './Contacts/Contacts';
import { Preloader } from './Preloader/Preloader';
import { ChatsHeader } from './Headers/ChatsHeader';
import { ChatHeader } from './Headers/ChatHeader';
import { ContactsItems } from './Contacts/ContactsItems';
import { DeleteMembers } from './Group/DeleteMembers';
import { NewGroupChat } from './Group/NewGroupChat';
import { AddMembers } from './Group/AddMembers';
import {ChatSettings} from "./ChatSettings";
import {Settings} from "./Settings/Settings";
// import { SwitchStackNav } from './Navigation/SwitchStackNav';
// import { CheckInternetConnection } from './CheckInternetConnection/CheckInternetConnection';
// import {Splash} from "./Splash";
// import {DrawerControls} from "./Drawer/DrawerControls";
// import { ContactsList } from './Contacts/SelectedContacts';

class Store {
    private _contactsItems: ContactsItems;
    // private _auth: Auth;
    private _chats: Chats;
    // private _authPin: AuthPin;
    // private _createPin: CreatePin;
    // private _changePin: ChangePin;
    // private _changePinPassword: ChangePassword;
    private _preloader: Preloader;
    private _contacts: Contacts;
    private _newGroupChat: NewGroupChat;
    private _addGroupChatMembers: AddMembers;
    private _deleteGroupChatMembers: DeleteMembers;
    // private _changePhoto: ChangePhoto;
    private _chatsHeader: ChatsHeader;
    private _drawerHeader: ChatsHeader;
    private _chatHeader: ChatHeader;
    private _settings: Settings;
    // private _swithStackNav: SwitchStackNav;
    // private _checkInternetConnection: CheckInternetConnection;
    // private _splash: Splash;
    // private _drawerControls: DrawerControls;
    // private _drawerControlsChats: DrawerControls;
    // private _drawerControlsChat: DrawerControls;
    private _unchatedContacts: Contacts;
    private _recyclerViewInverted: boolean;
    private _afterPinCallback:any;
    private _chatSettings: ChatSettings

    constructor() {
        // this._swithStackNav = new SwitchStackNav();

        //storages
        this._contactsItems = new ContactsItems();
        // this._auth = new Auth({ id: 'Auth' });
        this._chats = new Chats();
        // this._authPin = new AuthPin({ id: 'AuthPin' });
        // this._createPin = new CreatePin({ id: 'CreatePin' });
        // this._changePin = new ChangePin({ id: 'ChangePin' });
        // this._changePinPassword = new ChangePassword({ id: 'ChangePassword' });
        this._preloader = new Preloader({ id: 'Preloader' });
        this._contacts = new Contacts({ id: 'Contacts' });
        this._newGroupChat = new NewGroupChat('NewGroupChat');
        this._deleteGroupChatMembers = new DeleteMembers('DeleteMembers', null);
        this._addGroupChatMembers = new AddMembers('AddMembers', null);
        //ChangePhotoScreen
        // this._changePhoto = new ChangePhoto({ id: 'ChangePhoto' });
        //ChatListScreen header
        this._chatsHeader = new ChatsHeader('ChatsHeader');
        //ChatListScreen drawer header
        this._drawerHeader = new ChatsHeader('DrawerHeader');
        //ChatScreen header
        this._chatHeader = new ChatHeader({ id: 'ChatHeader' });
        this._chatSettings = new ChatSettings({id: 'chatSettings'})
        //Settings screen
        this._settings = new Settings({ id: 'Settings' });
        // this._checkInternetConnection = new CheckInternetConnection({ id: 'CheckInternetConnection' });
        // this._splash = new Splash({ id: 'Splash' });
        // this._drawerControlsChats = new DrawerControls({id: 'DrawerControlsChats'})
        // this._drawerControlsChat = new DrawerControls({id: 'DrawerControlsChat'})
        this._unchatedContacts = new Contacts({ id: `__ContactsList`})
        // recycler inverted
        this._recyclerViewInverted = false;
        this._afterPinCallback = null
    }
    // get drawerControlsChats() {
    //     return this._drawerControlsChats;
    // }
    // get drawerControlsChat() {
    //     return this._drawerControlsChat;
    // }
    //
    // get switchStackNav() {
    //     return this._swithStackNav;
    // }

    get contactsItems() {
        return this._contactsItems;
    }

    // get auth() {
    //     return this._auth;
    // }

    get chats() {
        return this._chats;
    }

    // get authPin() {
    //     return this._authPin;
    // }

    // get createPin() {
    //     return this._createPin;
    // }
    //
    // get changePin() {
    //     return this._changePin;
    // }

    get contacts() {
        return this._contacts;
    }

    // get changePinPassword() {
    //     return this._changePinPassword;
    // }

    get preloader() {
        return this._preloader;
    }

    // get unchatedContacts(){
    //     return this._unchatedContacts
    // }

    get recyclerViewInverted(){
        return this._recyclerViewInverted
    }

    addChat(model) {
        const chat = new Chat(model, this.chats);
        this.chats.addOrUpdate(chat);
    }

    getChat(id) {
        return this.chats.get(id);
    }

    removeChat(id) {
        this.chats.remove(id);
    }

    get newGroupChat() {
        return this._newGroupChat;
    }

    get deleteGroupChatMembers() {
        return this._deleteGroupChatMembers;
    }

    get addGroupChatMembers() {
        return this._addGroupChatMembers;
    }

    // get changePhoto() {
    //     return this._changePhoto;
    // }

    get chatsHeader() {
        return this._chatsHeader;
    }

    get drawerHeader() {
        return this._drawerHeader;
    }

    get chatHeader() {
        return this._chatHeader;
    }

    get chatSettings(){
        return this._chatSettings
    }

    // get group() {
    //     return this._group;
    // }

    get settings() {
        return this._settings;
    }
    // get checkInternetConnection() {
    //     return this._checkInternetConnection;
    // }
    // get splash() {
    //     return this._splash;
    // }

    get afterPinCallback(){
        return this._afterPinCallback
    }
    set afterPinCallback(value){
        this._afterPinCallback = value
    }
}

global.__app__ = global.__app__ || {};
global.__app__.store = global.__app__.store || new Store();

export function store(): Store {
    return global.__app__.store;
}
