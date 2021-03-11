import { Base } from "../Base";
import { ContactItem } from "./ContactItem";
import {store} from "../Store";
// import { console } from "../../Common/console";

class SelectedContacts extends Base {
    private _items: Map<string, ContactItem>;
    private _onPress: (contact: ContactItem) => void;

    constructor({ id, onPress }: { id: string, onPress: (contact: ContactItem) => void }) {
        super(id);
        this._items = new Map<string, ContactItem>();
        this.onPress = this.onPress.bind(this);
        this._onPress = onPress;
    }

    get items() {
        return this._items;
    }

    onPress(contact: ContactItem) {
        this._onPress(contact);
    }

    add(contact: ContactItem) {
        var _contact = ContactItem.clone(contact, this.onPress);
        this._items.set(_contact.id, _contact);
    }

    setItems(contacts: Array<ContactItem>) {
        this._items.clear();
        contacts.forEach(contact => this.add(contact));
    }

    delete(id) {
        this._items.delete(id);
    }

    clear() {
        this._items.clear();
    }
}

class ContactsList extends Base {

    private _items: Map<string, ContactItem>;
    private _onPress: (contact: ContactItem) => void;

    constructor({ id, onPress }: { id: string, onPress: (contact: ContactItem) => void }) {
        super(id);
        this._items = new Map<string, ContactItem>();
        this.onPress = this.onPress.bind(this);
        this._onPress = onPress;
    }

    setItems(items: Array<ContactItem>) {
        this._items.clear();
        items.forEach(item => this.add(item));
    }

    get items() {
        return this._items;
    }

    add(contact: ContactItem) {
        var _contact = ContactItem.clone(contact, this.onPress);
        this._items.set(_contact.id, _contact);
    }

    delete(id) {
        this._items.delete(id);
    }

    avaiableUsers(){
        return Array.from(this._items.values()).filter(u=>u._model.status===true)
    }

    sortedItems(){
        return this.avaiableUsers().sort((a,b)=>{
            return a.name > b.name ? 1 : -1
        })
    }

    onPress(contact: ContactItem) {
        this._onPress(contact);
    }

    clear() {
        this._items.clear();
    }
}

class ContactsChoice extends Base {
    private _list: ContactsList;
    private _selected: ContactsList;

    constructor(id: string) {
        super(id);
        this.onSelectPress = this.onSelectPress.bind(this);
        this.onDeletePress = this.onDeletePress.bind(this);
        this._list = new ContactsList({ id: `${id}_ContactsItems`, onPress: this.onSelectPress });
        this._selected = new ContactsList({ id: `${id}_SelectedContacts`, onPress: this.onDeletePress });
    }

    get list() {
        return this._list;
    }

    get selected() {
        return this._selected;
    }

    async setItems(items: Array<ContactItem>) {
        await (async () => {
            this.list.setItems(items.map(item => ContactItem.clone(item)));
        })();
    }

    async setSelected(items: Array<ContactItem>) {
        await (async () => {
            this.selected.setItems(items.map(item => ContactItem.clone(item)));
        })();
    }

    onSelectPress(contact: ContactItem) {
        console.log('onSelectPress contact', [contact]);
        try {
            this.list.delete(contact.id);
            this.list.modified = true;
            this.list.forceUpdate();

            this.selected.add(contact);
            this.selected.modified = true;
            this.selected.forceUpdate();
        }
        catch (ex) {
            console.error('ContactsChoice.onSelectPress -> error', [ex]);
        }
    }

    onDeletePress(contact: ContactItem) {
        if (contact.extra.has('disabledDeleteFromSelection')) {
            return;
        }
        if(!store().addGroupChatMembers.canRemoveUsers){
            return
        }
        try {
            this.selected.delete(contact.id);
            this.selected.modified = true;
            this.selected.forceUpdate();

            this.list.add(contact);
            this.list.modified = true;
            this.list.forceUpdate();
        }
        catch (ex) {
            console.error('ContactsChoice.onDeletePress -> error', [ex]);
        }
    }
}

export { SelectedContacts, ContactsList, ContactsChoice };
