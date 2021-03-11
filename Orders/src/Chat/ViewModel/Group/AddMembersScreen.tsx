import * as React from 'react';
import {StyleSheet,SafeAreaView } from 'react-native';
import {
    mockupHeightToDP as hp,
} from '../../../constants/Dimensions';
import { store } from '../../provider/Store';
import { AddMembersView } from "../../components/AddMembers";
import { BaseScreen } from '../../../Common/BaseScreen';
// import { console } from '../../Common/console';

class AddMembersScreen extends BaseScreen {

    constructor(props) {
        super(props);
    }

    async onFocus() {
        await super.onFocus();
        try {
            const chatId = store().chats.selectedChatId.toString();
            const chat = store().chats.get(chatId);
            await store().addGroupChatMembers.init(chat);
            store().addGroupChatMembers.contactsChoice.modified = true;
            store().addGroupChatMembers.contactsChoice.list.modified = true;
            store().addGroupChatMembers.contactsChoice.selected.modified = true;
            store().addGroupChatMembers.contactsChoice.forceUpdate();
            store().preloader.visible = false;
        }
        catch (ex) {
            console.log('AddMembersScreen.onFocus -> await store().addGroupChatMembers.init(chat) -> error', ex);
            store().preloader.visible = false;
        }
    }

    async onBlur() {
        await super.onBlur();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AddMembersView model={store().addGroupChatMembers}
                                key={store().addGroupChatMembers.id}
                                showArrowBack={true}

                />
            </SafeAreaView>
        );
    }
}

export { AddMembersScreen };

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(5),
        //paddingHorizontal: wp(20),
        backgroundColor: '#fff',
        flex: 1,
    },
});
