import { Base } from '../Base';
import { ContactsHeader } from './ContactsHeader';
import { store} from '../Store';
import {ContactItem} from "./ContactItem";
import { ContactsDataProvider } from '../../DataProvider/ContactsDataProvider';
import { ContactsList } from './SelectedContacts';
// import { console } from '../../Common/console';
import { ChatDataProvider } from '../../DataProvider/ChatDataProvider';
import {navigator} from "../../../Core/Navigator";

class Contacts extends Base {

    private _header: ContactsHeader;
    private _list: ContactsList;
    private _timerId: any;
    constructor({ id }: { id: string }) {
        super(id);
        this.onChangeText = this.onChangeText.bind(this);
        this.onPress = this.onPress.bind(this);
        this._header = new ContactsHeader({ id: `${id}_ContactsHeader`, onChangeText: this.onChangeText });
        this._list = new ContactsList({ id: `${id}_ContactsList`, onPress: this.onPress });

    }

    load(): Promise<any> {
        this.list.clear();
        return new Promise((resolve, reject) => {
            ContactsDataProvider.LoadContacts()
                .then(
                    (items) => {
                        this._list.setItems(items.map(item => ContactItem.create(item)));
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                )
                .catch(
                    (error) => {
                        reject(error);
                    }
                );
        });
    }

    onChangeText(term: string) {
        clearTimeout(this._timerId)
        this._timerId = setTimeout(() => {
            this._list.clear();
            ContactsDataProvider.SearchContacts(term)
                .then(
                    (items) => {
                        this._list.setItems(items.map(item => ContactItem.create(item, this.onPress)));
                        this._list.modified = true;
                        this._list.forceUpdate();
                    },
                    (error) => {
                        console.error('Contacts.onChangeText -> ContactsDataProvider.SearchContacts(term) error ->', [error]);
                    }
                )
                .catch(
                    (error) => {
                        console.error('Contacts.onChangeText -> ContactsDataProvider.SearchContacts(term) catch error ->', [error]);
                    }
                );
        }, 200)
    }

    get header() {
        return this._header;
    }

    get list() {
        return this._list;
    }

    async onPress(contact: ContactItem) {
        await this.createNewChat(contact)
        store().chats.remove(`-${contact.id}`);
        store().chats.modified = true
        store().chats.forceUpdate()
    }

    createNewChat(contact: ContactItem) {
        ChatDataProvider.createPrivateChat(contact)
            .then(
                async (response) => {
                    // console.trace('Contacts.createNewChat response', response);
                    try {
                        console.log('newChat response', response.result)
                        response.result.pairUser = { id: contact.id };
                        console.log('storage before', store().chats.storage)
                        await store().chats.addNewChat(response.result);
                        console.log('storage after', store().chats.storage)
                    }
                    catch (ex) {
                        console.error('Contacts.createNewChat -> store().chats.addNewChat -> error', [ex]);
                    }
                    const chatId = parseInt(response.result.GroupId);
                    store().chats.selectedChatId = chatId;
                    // console.log(store().chats.current)
                    // return
                    if(store().chats.current === null){
                        navigator().navigate('ChatListScreen')
                    } else {
                        store().chats.current.onPress()
                    }
                },
                (error) => {
                    console.log('Contacts.createNewChat -> error', [error]);
                    store().preloader.visible = false
                }
            )
            .catch(
                (error) => {
                    store().preloader.visible = false
                    console.error('Contacts.createNewChat -> catch error', [error]);
                }
            );
    }
}

export { Contacts };
