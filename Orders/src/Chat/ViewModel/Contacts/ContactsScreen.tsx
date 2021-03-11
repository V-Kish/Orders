import * as React from 'react';
import { StyleSheet, SafeAreaView, NativeModules, Alert } from 'react-native';
import { store } from '../../provider/Store';
import { BaseScreen } from '../../../Common/BaseScreen';
import { ContactsView } from './ContactsView';
// import { console } from '../../Common/console';
import {ScrollView} from "react-native-gesture-handler";
import { COLORS } from '../../../constants/colors';
import {
    mockupHeightToDP as hp,
} from '../../../constants/Dimensions';
import { HeaderContacts } from '../../classes/Contacts/Header';

class ContactsScreen extends BaseScreen {

    constructor(props) {
        super(props);
    }
    async onFocus() {
        await super.onFocus();
        store().contacts.load()
            .then(
                () => {
                    store().contacts.list.modified = true;
                    store().contacts.list.forceUpdate();
                    store().preloader.visible = false;
                },
                (error) => {
                    console.error('ContactsScreen.onFocus -> store().contacts.load() error -> ', error);
                    store().preloader.visible = false;
                }
            )
            .catch(
                (error) => {
                    console.error('ContactsScreen.onFocus -> store().contacts.load() catch error -> ', error);
                    store().preloader.visible = false;
                }
            );
    }
    async onBlur() {
        await super.onBlur();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderContacts
                    model={store().contacts.header}
                    key={store().contacts.header.id}
                />
                <ScrollView style={styles.wrapper}>
                    <ContactsView model={store().contacts} key={store().contacts.id} />
                </ScrollView>
           </SafeAreaView>
        );
    }
}

export { ContactsScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE.bg,
    },
    wrapper: {
        flex: 1,
        paddingTop:hp(10),
        backgroundColor:COLORS.WHITE.bg
    }
});
