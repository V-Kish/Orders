import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { ContactsChoice } from '../../provider/Contacts/SelectedContacts';
import { SelectedContactsView } from '../../components/ContactGroup';
import { ContactsItemsViewModel } from '../Contacts/ContactsItemsViewModel';

class ContactsChoiceView extends TypedBaseComponent<ContactsChoice> {

    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        return (
            <View style={styles.container}>
                <SelectedContactsView model={this.model.selected} key={this.model.selected.id} />
                <View style={styles.borderTop} />
                <ScrollView>
                    <ContactsItemsViewModel model={this.model.list} key={this.model.list.id} />
                </ScrollView>
            </View>
        );
    }
}

export { ContactsChoiceView };

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'red',
    },
    borderTop: {
        marginHorizontal: hp(15),
        borderBottomWidth: hp(1),
        borderColor: 'rgba(0, 0, 0, 0.12)',
        marginBottom:hp(10)
    },
    buttonContainer: {
        position: 'absolute',
        right: wp(20),
        bottom: hp(20),
    },
    buttonContainerLeft: {
        position: 'absolute',
        left: wp(15),
        bottom: hp(20),
    },
    containerSecond: {
        flex: 1,
        backgroundColor: 'red',
        paddingHorizontal: wp(16),
        paddingTop: hp(15),
    },
    inputWrap: {
        fontSize: hp(14),
        marginBottom: hp(25),
        paddingBottom: hp(0),
        borderBottomWidth: hp(1),
        borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    membersText: {
        color: 'rgba(0, 0, 0, 0.5)',
        marginBottom: hp(20),
    },
    groupNameInput: {
        fontSize: hp(14),
    },
});
