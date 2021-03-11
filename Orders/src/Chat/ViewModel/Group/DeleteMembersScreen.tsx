import * as React from 'react';
import { StyleSheet, SafeAreaView,View } from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { store } from '../../provider/Store';
import { BaseScreen } from '../../../Common/BaseScreen';
// import { console } from '../../Common/console';
import { DeleteMembersView } from './DeleteMembersView';
import {NextButtonView} from "../../components/NextButtonView";

class DeleteMembersScreen extends BaseScreen {

    constructor(props) {
        super(props);
    }

    async onFocus() {
        await super.onFocus();
        try {
            const chatId = store().chats.selectedChatId.toString();
            const chat = store().chats.get(chatId);
            await store().deleteGroupChatMembers.init(chat);
            const model = store().deleteGroupChatMembers;

            model.modified = true;
            model.contactsChoice.modified = true;
            model.contactsChoice.list.modified = true;
            model.contactsChoice.selected.modified = true;
            model.contactsChoice.forceUpdate();

            store().preloader.visible = false;
        }
        catch (ex) {
            console.log('DeleteMembersScreen.onFoscus -> await store().deleteMembers.init error', ex);
            store().preloader.visible = false;
        }
    }

    async onBlur() {
        await super.onBlur();
    }

    render() {
        return (
            <SafeAreaView style={styles.container} >
                <DeleteMembersView model={store().deleteGroupChatMembers} key={store().deleteGroupChatMembers.id} />
                <View style={styles.btnDeleteMembers}>
                    <NextButtonView model={store().deleteGroupChatMembers.nextButton} key={store().deleteGroupChatMembers.nextButton.id} step={1}/>
                </View>
            </SafeAreaView>
        );
    }
}

export { DeleteMembersScreen };

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(5),
        paddingHorizontal: wp(10),
        backgroundColor: '#fff',
        flex: 1,
    },
    membersText: {
        color: 'rgba(0, 0, 0, 0.5)',
    },
    buttonContainerLeft: {
        marginRight: hp(20),
        marginTop: hp(20),
        flexDirection:'row',
        alignItems:'center',
    },
    arrowBack:{
        marginRight: wp(10)
    },
    btnDeleteMembers:{
        position:'absolute',
        right: wp(20),
        bottom: hp(20),
    }
});
