import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NextButtonView } from './NextButtonView';
import { COLORS } from '../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { TypedBaseComponent } from "../../Common/BaseComponent";
import { ContactsChoiceView } from '../ViewModel/Group/ContactsChoiceView';
import { AddMembers } from '../provider/Group/AddMembers';
import { SearchInputView } from '../ViewModel/Group/SearchInput';
import {navigator} from "../../Core/Navigator";

class AddMembersView extends TypedBaseComponent<AddMembers> {

    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        return (
            <View style={styles.container}>
                <SearchInputView
                    model={this.model.header}
                    key={this.model.header.id}
                    showArrowBack={this.props.showArrowBack}
                    arrowBackFunction={()=>{navigator().toGoBack()}}
                />
                <ContactsChoiceView
                    model={this.model.contactsChoice}
                    key={this.model.contactsChoice.id}
                />
                <View style={styles.buttonContainer}>
                    <NextButtonView model={this.model.nextButton} key={this.model.nextButton.id} step={1}/>
                </View>
            </View>
        );
    }
}

export { AddMembersView };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE.bg,
        // backgroundColor: 'yellow',
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
    membersText: {
        color: 'rgba(0, 0, 0, 0.5)',
        marginBottom: hp(20),
    },
    groupNameInput: {
        fontSize: hp(14),
    },
});
