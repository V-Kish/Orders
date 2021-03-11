import {Base} from "./Base";
import {ContactItem} from "./Contacts/ContactItem";
import { store } from "./Store";
import {currentUser} from "../../Core/CurrentUser";

class ChatMembersList extends Base {
    private _contactsItems: Array<ContactItem>;
    private _ownerId: number;

    constructor(id: string, contactsItems: Array<ContactItem>, ownerId) {
        super(id);
        this.onPress = this.onPress.bind(this);
        this._contactsItems = contactsItems.map(contact => ContactItem.clone(contact, this.onPress));
        this._ownerId = ownerId;
    }

    setUsers(contactsItems: Array<ContactItem>) {
        this._contactsItems = contactsItems.map(contact => ContactItem.clone(contact, this.onPress));
    }

    get contactsItems() {
        return this._contactsItems;
    }

    get ownerId(){
        return this._ownerId;
    }

    onPress(contact: ContactItem) {
        if (currentUser().userId.toString() !== contact.id.toString()) {
            store().contacts.createNewChat(contact);
        }
    }
}

export { ChatMembersList };
