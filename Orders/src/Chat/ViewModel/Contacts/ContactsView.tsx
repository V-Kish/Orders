import * as React from 'react';
import { TypedBaseComponent } from "../../../Common/BaseComponent";
import { Contacts } from "../../provider/Contacts/Contacts";
import { ContactsItemsViewModel } from './ContactsItemsViewModel';
// import {AppLog} from "../../Common/AppLog";

class ContactsView extends TypedBaseComponent<Contacts> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <ContactsItemsViewModel model={this.model.list} key={this.model.list.id} />
            </>
        );
    }
}

export { ContactsView };
