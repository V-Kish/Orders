import * as React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { ContactItemView } from '../../classes/ContactItem';
import { COLORS } from '../../../constants/colors';
import {mockupHeightToDP as hp, mockupWidthToDP as wp} from '../../../constants/Dimensions';
import { ContactItem } from '../../provider/Contacts/ContactItem';
import { ContactsList } from '../../provider/Contacts/SelectedContacts';
// import { AppLog } from '../../Common/AppLog';
import {currentUser} from "../../../Core/CurrentUser";
// import NoFindItems from '../NoFindItems';

class ContactsItemsViewModel extends TypedBaseComponent<ContactsList> {
    private _marker: string;

    constructor(props) {
        super(props);
        this._marker = '';
    }

    wrapLetter(contact: ContactItem) {
        if (this._marker !== contact.name.charAt(0)) {
            this._marker = contact.name.charAt(0).toUpperCase();
            return (
                <View style={styles.wrapContactLetter}>
                    <Text style={styles.contactLetter}>{this._marker}</Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.wrapContactLetter}/>
            );
        }
    }

    render() {
        super.render();
        this._marker = '';
        // console.log('contactID',this.model.id)
        // console.log('contactID',this.model.items.size)
        // console.log('this.model.sortedItems()',this.model.sortedItems())
        if (this.model.items.size === 0 && this.model.id === 'Contacts_ContactsList'
        || this.model.sortedItems().filter(c=>c.id!==currentUser().userId).length===0) {
            return (
                <View style={styles.contactEmpty} key={`${this.model.id}_ListItem_Empty`}>
                    <Text style={styles.text}>Пошук не надав результатів</Text>
                </View>
            )
        }
        return (
            <>
                {this.model.sortedItems().map(contact => {
                    if(contact.id !== currentUser().userId){
                        return (
                            <View style={styles.contactContainer} key={`${this.model.id}_ListItem_${contact.id}`}>
                                {this.wrapLetter(contact)}
                                <ContactItemView
                                    model={contact}
                                    key={`Contacts_${contact.id}_ContactItemView`}
                                    id={`Contacts_${contact.id}_ContactItemView`}
                                    type={'large'}
                                />
                            </View>
                        )
                    }else {
                        return null;
                    }
                })}
            </>
        );
    }
}

export { ContactsItemsViewModel };

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE.bg,
    paddingVertical: hp(20),
  },
  contactContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(17),
    backgroundColor: COLORS.WHITE.bg,
    paddingBottom: hp(15),
    alignItems: 'center',
  },
    contactEmpty:{
        flexDirection: 'row',
        paddingHorizontal: wp(17),
        backgroundColor: COLORS.WHITE.bg,
        paddingBottom: hp(15),
        alignItems: 'center',
        justifyContent:'center'
    },
    text:{
        paddingBottom: hp(20),
        fontFamily: 'Roboto-Light',
        fontSize: hp(14),
    },
  wrapContactLetter: {
    marginRight: wp(20),
    width: hp(18),
    height: hp(48),
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  contactLetter: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: hp(20),
    color: COLORS.BLACK.bg,
    fontFamily: 'Roboto-Thin',
    fontWeight: '500',
  },
});
