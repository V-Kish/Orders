import { Base } from '../Base';
import { ContactIcon } from '../ContactIcon';
import { ContactIsOnline } from '../ContactIsOnline';
// import {store} from "../Store";
// import {navigator} from "../../controllers/Navigator";

type contactItemType = {
  id: string;
  hash: string;
  name: string;
  status: boolean;
  photo: string;
  onPress: () => void;
  isOsbbLeader?: boolean
};

class ContactItem extends Base {
    private _model: contactItemType;
    private _onPress: (contact: ContactItem) => void;
    private _contactIcon: ContactIcon;
    private _extra: Map<string, any>;

    constructor(model: any, onPress?: (contact: ContactItem) => void) {
        super(model.id);
        this._onPress = onPress;
        this._model = {
            id: model.id,
            hash: model.hash,
            name: model.name,
            status: model.status,
            photo: model.photo,
            onPress: model.onPress,
            isOsbbLeader: model.isOsbbLeader
        };
        this._extra = new Map<string, any>();
        this.onPress = this.onPress.bind(this);
        this._contactIcon = new ContactIcon(model);

    }

    static clone(contact: ContactItem, onPress?: (contact: ContactItem) => void): ContactItem {
        const clone = new ContactItem(
            {
                id: contact.id,
                hash: contact.model.hash,
                name: contact.model.name,
                status: contact.model.status,
                photo: contact.model.photo,
                onPress: contact.model.onPress,
                isOsbbLeader: contact.model.isOsbbLeader,
            },
            onPress
        );
        clone.extra = contact.extra;
        clone.contactIcon = contact.contactIcon
        return clone;
    }

    static create(contact: RawContactItem, onPress?: (contact: ContactItem) => void) {
        const contactItem = new ContactItem (
            {
                id: contact.id,
                hash: contact.hash,
                name: contact.name,
                status: contact.status,
                photo: contact.photo,
                isOsbbLeader: contact.isOsbbLeader,
            },
            onPress
        );
        contactItem.contactIcon = contact.icon;
        contactItem.contactIcon.isOnline = contact.isOnline;
        return contactItem;
    }

    get name(): string {
        return this._model.name;
    }

    get id(): string {
        return this._model.id;
    }

    get model() {
        return this._model;
    }

    onPress() {
        this._onPress(this);
    }

    update(model: any): boolean {
        return false;
    }

    updatePhoto(hash){
        this._model.photo = hash;
        this.modified = true;
        this.forceUpdate();
    }

    get contactIcon() {
        // console.log('IconIconIcon', this._contactIcon)
        return this._contactIcon;
    }
    set contactIcon(value){
        this._contactIcon = value;
    }

    get extra() {
        return this._extra;
    }

    set extra(value: Map<string, any>) {
        this._extra = value;
    }

    setExtra(key: string, value: any) {
        this.extra.set(key, value);
    }

    removeExtra(key: string) {
        this.extra.delete(key);
    }

    get isOsbbLeader(){
        return this._model.isOsbbLeader
    }
}

type rawContactItemProps = {
    id: number;
    hash: string;
    name: string;
    status: boolean;
    photo: string;
    isOsbbLeader?: boolean
};

class RawContactItem {
    private _id: number;
    private _hash: string;
    private _name: string;
    private _status: boolean;
    private _photo: string;
    private _isOnline: ContactIsOnline;
    private _icon: ContactIcon;
    private _isOsbbLeader: boolean;

    constructor(model: rawContactItemProps) {
        this._id = model.id;
        this._hash = model.hash;
        this._name = model.name;
        this._status = model.status;
        this._photo = model.photo;
        this._isOsbbLeader = model.isOsbbLeader || false
        this._isOnline = new ContactIsOnline({ id: model.id, status: false});
        this._icon = new ContactIcon({
            id: this.id,
            isPublic: false,
            name: this.name,
            photo: this.photo,
            contactId: this.id,
            isOnline: this.isOnline,
        })
        this.icon.isOnline = this.isOnline;
    }

    set(model: rawContactItemProps) {
        this._hash = model.hash;
        this._name = model.name;
        this._photo = model.photo;
        this._status = model.status;
        this._icon.update(model)
    }

    get id() {
        return this._id;
    }

    get hash() {
        return this._hash;
    }

    get name() {
        return this._name;
    }

    get status() {
        return this._status;
    }

    get photo() {
        return this._photo;
    }
    set photo(value) {
        this._photo = value;
    }

    get icon(){
        return this._icon;
    }

    get isOnline() {
        return this._isOnline;
    }
    set isOnline(value) {
        this._isOnline = value;
    }

    get isOsbbLeader(){
        return this._isOsbbLeader
    }
}

export { RawContactItem, rawContactItemProps, ContactItem, contactItemType };
