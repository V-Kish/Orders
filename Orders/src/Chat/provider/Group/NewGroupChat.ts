import { Base } from "../Base";
// import { console } from "../../Common/console";
import { ContactsChoice } from "../Contacts/SelectedContacts";
import { ContactsHeader } from "../Contacts/ContactsHeader";
import { TextBox } from "../../../Models/Components/TextBox";
import { NextButton } from "../Contacts/NextButton";
import { store } from "../Store";
import { currentUser } from "../../../Core/CurrentUser";
import { ContactsDataProvider } from "../../DataProvider/ContactsDataProvider";
import { ContactItem } from "../Contacts/ContactItem";
import { ChatDataProvider } from "../../DataProvider/ChatDataProvider";
import {ChatMembersList} from "../ChatMembersList";
import {Alert} from 'react-native';
import {navigator} from "../../../Core/Navigator";

class NewGroupChat extends Base {
    private _header: ContactsHeader;
    private _contactsChoice: ContactsChoice;
    private _step: number;
    private _groupNameTextBox: TextBox;
    private _nextButton: NextButton;

    constructor(id: string) {

        super(id);
        this._step = 1;
        this._groupNameTextBox = new TextBox({ id: `${id}_GroupNameTextBox`, placeholder: 'Назва групи', maxLength:35 });
        this.onChangeText = this.onChangeText.bind(this);
        this.nextButtonPress = this.nextButtonPress.bind(this);
        this._header = new ContactsHeader({ id: `${id}_ContactsHeader`, onChangeText: this.onChangeText });
        this._contactsChoice = new ContactsChoice(`${id}_ContactsChoice`);
        this._nextButton = new NextButton({ id: `${id}nextButton`, onPress: this.nextButtonPress });
    }
    get chatMembersList() {
        const members = new ChatMembersList(`${this.id}_ChatMembersList`, Array.from(this._contactsChoice.selected.items.values()));
        members.modified = true;
        return members;
    }
    get nextButton() {
        return this._nextButton;
    }
    get header() {
        return this._header;
    }
    get list() {
        return this._contactsChoice.list;
    }
    get selected() {
        return this._contactsChoice.selected;
    }
    get step() {
        return this._step;
    }
    set step(value) {
        this._step = value;
    }
    get groupNameTextBox() {
        return this._groupNameTextBox;
    }

    get contactsChoice() {
        return this._contactsChoice;
    }

    async nextButtonPress() {
        if (this.step === 1) {
            this.onChangeText('')
            this.step = 2;
            this.modified = true;
            this.forceUpdate();
        }
        else {
            // console.log('trimCheck', this.groupNameTextBox.value.trim())
            // console.log('trimCheck2', this.groupNameTextBox.value.trim().length)
            // return
            if (this.selected.items.size === 0) {
                Alert.alert('Увага!','Спочатку виберіть учасників');
            } else if(this.groupNameTextBox.value===undefined || this.groupNameTextBox.value.length === 0){
                Alert.alert('Увага!','Вкажіть назву групи');
            } else if (this.groupNameTextBox.value.trim().length === 0) {
                Alert.alert('Увага!','Вкажіть назву групи');
            } else if(this.groupNameTextBox.value.trim().length<4){
                Alert.alert('Увага!','Назва групи має містити більше 3-х символів');
            } else {
                await store().preloader.showWithCallback(() => {
                     this.createNewGroup();
                });
            }
        }
    }

    async createNewGroup() {
        const members = [];
        const name = this.groupNameTextBox.value.trim();
        const isEncrypt = true;
        this.selected.items.forEach(item => members.push(item.id));
        try {
            const response = await ChatDataProvider.createGroupChat({ members, name, isEncrypt });
            if (response.statusCode === 200 && response.result) {
                try {
                    await store().chats.addNewChat(response.result)
                } catch (e){
                    console.log('addNewChatErr', e)
                }
                store().chats.selectedChatId = response.result.GroupId;
                this._groupNameTextBox.value = ''
                // console.log('response.result.GroupId',response.result.GroupId)
                // console.log('store().chats.current',store().chats.current)
                //this.step = 1;
                if(store().chats.current === null){
                    navigator().navigate('ChatListScreen')
                } else {
                    await store().chats.current.onPress(true);
                }
            }
            else {
                Alert.alert('Увага!','Не вдалося створити групу, спробуйте ще раз');
            }
        }
        catch (ex) {
            console.log('NewGroupChat.createNewGroup', ex);
        }
    }

    async init() {
        this.list.clear();
        this.selected.clear();
        try {
            let items = await ContactsDataProvider.LoadContacts();
            items = items.filter(item =>  item.id !== currentUser().userId);
            await this.contactsChoice.setItems(items.map(item => ContactItem.create(item)));
        }
        catch (ex) {
            throw ex;
        }
    }

    async onChangeText(term: string) {
        try {
            let items = await ContactsDataProvider.SearchContacts(term);
            items = items.filter(item => !this.selected.items.has(item.id));
            await this.contactsChoice.setItems(items.map(item => ContactItem.create(item)));
            this.contactsChoice.list.modified = true;
            this.contactsChoice.list.forceUpdate();
        }
        catch (ex) {
            console.error('NewGroupChat.onChangeText error ->', [ex]);
        }
    }
}

export { NewGroupChat };
