import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { TypedBaseComponent } from "../../../Common/BaseComponent";
import { DeleteMembers } from "../../provider/Group/DeleteMembers";
// import { navigator } from '../../controllers/Navigator';
// import { NextButtonView } from '../../components/NextButtonView';
import { ContactsChoiceView } from './ContactsChoiceView';
import { store } from "../../provider/Store";
import {CHAT_ICONS} from "../../../constants/icons";

class DeleteMembersView extends TypedBaseComponent<DeleteMembers> {
    constructor(props) {
        super(props);
    }
    render() {
        super.render();
        return (
            <ScrollView>
                <View style={styles.buttonContainerLeft}>
                    <TouchableOpacity style={styles.arrowBack} onPress={async () =>await store().chats.current.onPress(true)}>
                        <Image
                            // source={require('../../assets/img/Icons/arrowBackGray/arrowBack.png')}
                            source={CHAT_ICONS.arrowLeft}
                        />
                    </TouchableOpacity>
                    {
                        this.model.chat !== null && this.model.chat.users !== null &&
                        <Text style={styles.membersText}>
                             {this.model.chat.users.length}
                            {store().chatHeader.pronunciation(this.model.chat.users.length,[' учасник', ' учасника', ' учасників'])}
                        </Text>
                    }
                </View>
                <View >
                    <ContactsChoiceView model={this.model.contactsChoice} key={this.model.contactsChoice.id} />
                </View>
            </ScrollView>
        );
    }
}

export { DeleteMembersView };

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(5),
        paddingHorizontal: wp(10),
        backgroundColor: '#fff',
        flex: 1,
    },
    borderTop: {
        borderTopColor: '#dde',
        borderTopWidth: 1,
        marginBottom: 10
    },
    membersText: {
        color: 'rgba(0, 0, 0, 0.5)',
    },
    buttonContainerLeft: {
        marginRight: hp(20),
        marginTop: hp(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowBack: {
        marginRight: wp(10)
    },
    btnDeleteMembers: {
        position: 'absolute',
        right: wp(20),
        bottom: hp(20),
    }
});
