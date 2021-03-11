import { Base } from "../Base";
import { Chat } from "../Chat";
import { SelectedContacts, ContactsChoice } from "../Contacts/SelectedContacts";
import { NextButton } from "../Contacts/NextButton";
import { ContactsHeader } from "../Contacts/ContactsHeader";
import { ContactsDataProvider } from "../../DataProvider/ContactsDataProvider";
import { ContactItem } from "../Contacts/ContactItem";
import {ChatDataProvider} from "../../DataProvider/ChatDataProvider";
import {currentUser} from "../../../Core/CurrentUser";
import {store} from "../Store";
import {navigator} from '../../../Core/Navigator';

class AddMembers extends Base {
    private _chat: Chat;
    private _header: ContactsHeader;
    private _contactsChoice: ContactsChoice;
    private _nextButton: NextButton;
    private _canRemoveUsers: boolean

    constructor(id: string, chat: Chat = null) {
        super(id);
        this._chat = chat;
        this.nextButtonPress = this.nextButtonPress.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this._header = new ContactsHeader({ id: `${id}_ContactsHeader`, onChangeText: this.onChangeText });
        this._contactsChoice = new ContactsChoice(`${id}_ContactsChoice`);
        this._nextButton = new NextButton({ id: `${id}nextButton`, onPress: this.nextButtonPress });
        this._canRemoveUsers = true
    }

    get contactsChoice() {
        return this._contactsChoice;
    }

    get nextButton() {
        return this._nextButton;
    }

    get header() {
        return this._header;
    }

    get chat() {
        return this._chat;
    }

    async init(chat: Chat) {
        this._chat = chat;
        try {
            await this.chat.setChatMembers();
            this.chat.users.forEach(contact => contact.setExtra('disabledDeleteFromSelection', true));
            await this.contactsChoice.setSelected(this.chat.users);
            let items = await ContactsDataProvider.LoadContacts();
            items = items.filter(item => !this.contactsChoice.selected.items.has(item.id) && item.id !== currentUser().userId);
            await this.contactsChoice.setItems(items.map(item => ContactItem.create(item)));
        }
        catch (ex) {
            throw ex;
        }
    }

    async nextButtonPress() {
        store().addGroupChatMembers.canRemoveUsers = true
        await store().preloader.showWithCallback(async () => {
            const members = [];
            this.contactsChoice.selected.items.forEach(item => members.push(item.id));
            try {
                const response = await ChatDataProvider.addUserToChat(parseInt(this.chat.id), members);
                if (response.statusCode !== 200) {
                    store().preloader.visible = false;
                    return;
                }

                const chat =  store().chats.current;
                await chat.setChatMembers();
                chat.membersCount =  chat.users.length;
                chat.chatMembersList.modified = true;
                chat.chatMembersList.forceUpdate();
                navigator().toGoBack();
                 // await chat.onPress(true);
            }
            catch (ex) {
                store().preloader.visible = false;
                console.error('add new users o chat', ex);
            }
        });
    }

    onAddMembersPress(selectedContacts: SelectedContacts) {
        console.log('selectedContacts', [selectedContacts]);
    }

    async onChangeText(term: string) {
        try {
            let items = await ContactsDataProvider.SearchContacts(term);
            items = items.filter(item => !this.contactsChoice.selected.items.has(item.id));
            this.contactsChoice.setItems(items.map(item => ContactItem.create(item)));
            this.contactsChoice.list.modified = true;
            this.contactsChoice.list.forceUpdate();
        }
        catch (ex) {
            console.error('AddMembers.onChangeText error ->', [ex]);
        }
    }

    get canRemoveUsers(){
        return this._canRemoveUsers
    }

    set canRemoveUsers(value){
        this._canRemoveUsers = value
    }
}

export { AddMembers };
