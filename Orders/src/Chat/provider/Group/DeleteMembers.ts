import { Base } from "../Base";
import { Chat } from "../Chat";
// import { console } from "../../Common/console";
import { SelectedContacts, ContactsChoice } from "../Contacts/SelectedContacts";
import { NextButton } from "../Contacts/NextButton";
import { ContactsHeader } from "../Contacts/ContactsHeader";
import {ChatDataProvider} from "../../DataProvider/ChatDataProvider";
// import {navigator} from "../../controllers/Navigator";
import {store} from "../Store";
import {ContactItem} from "../Contacts/ContactItem";
import {currentUser} from "../../../Core/CurrentUser";
import {navigator} from "../../../Core/Navigator";

class DeleteMembers extends Base {
    private _chat: Chat;
    private _header: ContactsHeader;
    private _contactsChoice: ContactsChoice;
    private _nextButton: NextButton;

    constructor(id: string, chat: Chat = null) {
        super(id);
        this._chat = chat;
        this.nextButtonPress = this.nextButtonPress.bind(this);
        this._contactsChoice = new ContactsChoice(`${id}_ContactsChoice`);
        this._nextButton = new NextButton({ id: `${id}_NextButton`, onPress: this.nextButtonPress });
    }

    get chat() {
        return this._chat;
    }

    get contactsChoice() {
        return this._contactsChoice;
    }

    get nextButton() {
        return this._nextButton;
    }

    async init(chat: Chat) {
        this._chat = chat;
        this.contactsChoice.selected.clear();
        this.contactsChoice.list.clear();
        try {
            await this.chat.setChatMembers();
            this.chat.users.forEach(contact => contact.removeExtra('disabledDeleteFromSelection'));
            const members = this.chat.users.filter(contact => contact.id !== currentUser().userId).map(contact => ContactItem.clone(contact));
            await this.contactsChoice.setItems(members);
        }
        catch (ex) {
            console.log('DeleteMembers.init error ->', ex);
            throw ex;
        }
    }

    onDeletePress(selectedContacts: SelectedContacts) {
        console.log('selectedContacts', [selectedContacts]);
    }

    async nextButtonPress() {
        await store().preloader.showWithCallback(async () => {
            const members = []
            this.contactsChoice.selected.items.forEach(item => members.push(item.id))
            const responses = [];
            store().preloader.visible = true;
            try {
              await members.map(async (id) => {
                     let response = await ChatDataProvider.deleteUserFromChat(parseInt(this.chat.id), id);
                    if(response.statusCode !== 200){
                        await setTimeout(() => response = ChatDataProvider.deleteUserFromChat(parseInt(this.chat.id), id), 50);
                         if(response.statusCode !== 200){
                             await setTimeout(() => response = ChatDataProvider.deleteUserFromChat(parseInt(this.chat.id), id), 100);
                         }
                    }
                    responses.push({id: id, statusCode: response.statusCode});
                });
                const chat =  store().chats.current;
                await chat.setChatMembers();
                chat.membersCount =  chat.users.length;
                chat.chatMembersList.modified = true;
                chat.chatMembersList.forceUpdate();
                // await chat.onPress(true);
                navigator().toGoBack();
            } catch (ex) {
                console.error('remove new users o chat', ex);
                store().preloader.visible = false;
            }
            const hasErrors = await responses.some(item => item.statusCode !== 200);
            if (hasErrors) {
                await this.init(this.chat);
            }
        });
    }
}

export { DeleteMembers };
