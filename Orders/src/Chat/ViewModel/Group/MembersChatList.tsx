import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {TypedBaseComponent} from "../../../Common/BaseComponent";
import { store } from '../../provider/Store';
import {ContactItemView} from "../../classes/ContactItem";
import {ChatMembersList} from "../../provider/ChatMembersList";
import {ContactsList} from "../../provider/Contacts/SelectedContacts";
import {ContactItem} from "../../provider/Contacts/ContactItem";

class MembersChatListView extends TypedBaseComponent<ChatMembersList> {
    constructor(props) {
        super(props);
    }
    render() {
        const chat = store().chats.current;
        if (chat === null || chat.users === null){
            return null;
        }
        return (
            this.model.contactsItems.map(contact => <ContactItemView model={contact} key={contact.id} owner={parseInt(contact.id) === this.model.ownerId}/>)
        );
    }
}



class ContactsListView extends TypedBaseComponent<ContactsList> {
    constructor(props) {
        super(props);
    }
    render() {
        const items =  Array.from(this.model.items.values()).map(item => ContactItem.clone(item,()=>{}));
        return (
            items.map(contact => <ContactItemView model={contact} key={contact.id} />)
        );
    }
}
export { MembersChatListView,ContactsListView };
const styles = StyleSheet.create({

});
