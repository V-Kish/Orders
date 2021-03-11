import * as React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { MessageMenu } from '../../provider/Messages/MessageMenu';
import { IconButtonView } from '../IconButtonView';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { COLORS } from '../../../constants/colors';
import { currentUser } from '../../../Core/CurrentUser';

class MessageMenuView extends TypedBaseComponent<MessageMenu> {
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        if (!this.model.visible) {
            return null;
        }
        return (
            <View style={styles.containerModal}>
                <View>
                    <IconButtonView model={this.model.closeButton} key={this.model.closeButton.id} />
                </View>
                <View style={styles.containerArrowRight}>
                    {this.model.message.uFrom === currentUser().userId && this.model.message.ownerUserFrom === -1
                        && <IconButtonView model={this.model.editButton} key={this.model.editButton.id} />}
                    {!this.model.message.isFileMessage &&
                        <IconButtonView model={this.model.copyButton} key={this.model.copyButton.id} />
                    }
                    {this.model.message.ownerUserFrom === -1 &&
                        <IconButtonView model={this.model.resendButton} key={this.model.resendButton.id} />
                    }
                    {this.model.message.uFrom === currentUser().userId &&
                        <IconButtonView model={this.model.deleteButton} key={this.model.deleteButton.id} />}
                </View>
            </View>
        );
    }
}

export { MessageMenuView };

const styles = StyleSheet.create({
    containerModal: {
        position: 'absolute',
        zIndex: 999999,
        width: '100%',
        top: 0,
        paddingHorizontal: hp(17),
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(10),
    },
    imageArrowClose: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
    containerArrowRight: {
        flexDirection: 'row',
    },
    btnIconEdit: {
        marginRight: hp(25),
        width: hp(25),
    },
    iconEdit: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
    btnRight: {
        marginRight: hp(25),
    },
    iconCopy: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
});
