import * as React from 'react';
import { View, StyleSheet, Text } from "react-native";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { COLORS } from '../../../constants/colors';
import { TypedBaseComponent } from "../../../Common/BaseComponent";
import {store} from "../../provider/Store";
import { TextBox } from '../../classes/TextBox';
import {RenameChat} from "../../provider/Group/RenameChat";
import {TouchableOpacity} from "react-native-gesture-handler";
import {currentUser} from "../../../Core/CurrentUser";

class RenameChatView extends TypedBaseComponent<RenameChat> {

    constructor(props) {
        super(props);
    }

    renderChatName() {
        const chat = store().chats.current;
        if (chat === null) {
            return null;
        }
        return (
            <View style={styles.nameWrap}>
            <TouchableOpacity onPress={chat.ownerUser.id === currentUser().userId ?this.model.buttonChangeStatePress.bind(this.model) : null}>
                <Text style={styles.contactTextBox} numberOfLines={1}>{chat.name.name}</Text>
            </TouchableOpacity>
            </View>
        );
    }

    renderRenameChatName() {
        const chat = store().chats.current;
        if (chat === null) {
            return null;
        }
        return (
            <View style={styles.textBoxWrap}>
                <TextBox
                    model={this.model.renameChatName}
                    key={this.model.renameChatName.id}
                    placeholder={chat.name.name}
                    defaultValue={chat.name.name}
                    selectionColor={'white'}
                />
            </View>

        );
    }

    render() {
        super.render();
        if (this.model.step === true) {
            return this.renderChatName();
        } else {
            return this.renderRenameChatName();
        }
    }
}

export { RenameChatView };

const styles = StyleSheet.create({
    textBoxWrap:{
        height:hp(50),
        justifyContent:'center'
    },
    nameWrap:{
        height:hp(50),
        justifyContent:'center',
        // paddingLeft:hp(4)
    },
    contactTextBox: {
        alignItems: 'center',
        //paddingLeft: wp(15),
        fontFamily: 'Roboto',
        fontSize: hp(22),
        lineHeight:hp(30),
        fontWeight: '800',
        color: 'red',
        textAlign: 'center'
    },
    membersText: {
        fontFamily: 'Roboto-Regular',
        fontSize: hp(10),
        fontWeight: 'bold',
        color: '#BBC4DD',
    },
});
