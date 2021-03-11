import * as React from 'react';
import { View, StyleSheet, Text,ScrollView } from "react-native";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { COLORS } from '../../../constants/colors';
import { TypedBaseComponent } from "../../../Common/BaseComponent";
import { NewGroupChat } from '../../provider/Group/NewGroupChat';
import { SearchInputView } from './SearchInput';
import { ContactsChoiceView } from './ContactsChoiceView';
import { NextButtonView } from '../../components/NextButtonView';
import { TextBox } from '../../classes/TextBox';
// import { DrawerSwitchButton } from '../../components/DrawerSwitchButton';
import {ContactsListView} from "./MembersChatList";
// import {console} from "../../Common/console";

class NewChatView extends TypedBaseComponent<NewGroupChat> {

    constructor(props) {
        super(props);
    }
    renderAddMembers() {
        return (
            <View style={styles.container}>
                <SearchInputView
                    model={this.model.header}
                    key={this.model.header.id}
                    showArrowBack={this.props.showArrowBack}
                    arrowBackFunction={this.props.arrowBackFunction}
                />
                <ContactsChoiceView model={this.model.contactsChoice} key={this.model.contactsChoice.id} />
                <View style={styles.buttonContainer}>
                    <NextButtonView model={this.model.nextButton} step={this.model.step} key={this.model.nextButton.id} />
                </View>
            </View>
        );
    }

    renderConfirm() {
        console.log('this.model.chatMembersList',this.model.chatMembersList)
        return (
            <View style={styles.containerSecond}>
                <View style={styles.inputWrap}>
                    <TextBox
                        model={this.model.groupNameTextBox}
                        key={`${this.model.groupNameTextBox.id}`}
                    />
                </View>
                {/*<View style={styles.inputWrapSwitch}>*/}
                    {/*<DrawerSwitchButton text={'Шифрувати повідомлення'} />*/}
                {/*</View>*/}
                <View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.membersText}>{`${this.model.contactsChoice.selected.items.size} учасників`}</Text>
                </View>
                <ScrollView contentContainerStyle={styles.chatUsersContainer}>
                    <ContactsListView
                        model={this.model.contactsChoice.selected}
                        key={this.model.contactsChoice.selected.id}
                    />
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <NextButtonView model={this.model.nextButton} step={this.model.step} key={this.model.nextButton.id} />
                </View>
            </View>
        );
    }

    render() {
        super.render();
        if (this.model.step === 1) {
            return this.renderAddMembers();
        } else {
            return this.renderConfirm();
        }
    }
}

export { NewChatView };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    borderTop: {
        marginHorizontal: hp(15),
        borderBottomWidth: hp(1),
        borderColor: 'rgba(0, 0, 0, 0.12)',
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
        backgroundColor: COLORS.WHITE.bg,
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
    inputWrapSwitch:{
        marginBottom: hp(10),
        paddingBottom: hp(0),
        borderBottomWidth: hp(1),
        borderColor: 'rgba(0, 0, 0, 0.12)',
        paddingTop: hp(15)
    },
    membersText: {
        color: 'rgba(0, 0, 0, 0.5)',
        marginBottom: hp(20),
    },
    groupNameInput: {
        fontSize: hp(14),
    },
});
