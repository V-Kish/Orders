import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { COLORS } from '../../../constants/colors';
import { store } from '../../provider/Store';
import { BaseScreen } from '../../../Common/BaseScreen';
// import { console } from '../../Common/console';
import { NewChatView } from './NewChatView';
import {navigator} from "../../../Core/Navigator";

class NewChatScreen extends BaseScreen {

    constructor(props) {
        super(props);
    }

    async onFocus() {
        await super.onFocus();
        try {
            await store().newGroupChat.init();
            // store().newGroupChat.step = 1;
            // store().newGroupChat.modified = true;
            store().newGroupChat.contactsChoice.modified = true;
            store().newGroupChat.contactsChoice.selected.modified = true;
            store().newGroupChat.contactsChoice.list.modified = true;
            store().newGroupChat.forceUpdate(() => {
                store().preloader.visible = false;
            });
        }
        catch (ex) {
            console.error('NewChatScreen.onFocus error ->', ex);
        }
    }

    async onBlur() {
        await super.onBlur();
        store().newGroupChat.step = 1;
        store().newGroupChat.modified = true;
    }

    render() {
        return (
            <NewChatView
                model={store().newGroupChat}
                key={store().newGroupChat.id}
                showArrowBack={true}
                arrowBackFunction={()=>{
                    navigator().toGoBack()
                }}
            />
        );
    }
}

export { NewChatScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE.bg,
  },
  buttonContainer: {
    position: 'absolute',
    right: wp(20),
    bottom: hp(20),
  },
  groupNameInput: {
    fontSize: hp(14),
  },
  membersText: {
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: hp(20),
  },
  borderTop: {
    marginHorizontal: hp(15),
    borderBottomWidth: hp(1),
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
});
