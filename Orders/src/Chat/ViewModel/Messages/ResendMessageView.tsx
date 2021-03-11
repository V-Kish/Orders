import { TypedBaseComponent } from "../../../Common/BaseComponent";
import { ResendMessage, resendMessageType } from "../../provider/Messages/ResendMessage";
import * as React from 'react';
import { StyleSheet, View, Image, Text } from "react-native";
import { COLORS } from '../../../constants/colors';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { IconButtonView } from "../../../View/Components/IconButtonView";
import {store} from "../../provider/Store";
import {CHAT_ICONS, ICONS} from "../../../constants/icons";
class ResendMessageView extends TypedBaseComponent<ResendMessage> {
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        if (this.model.message === null) {
            return null;
        }
        return (
            <View style={styles.wrapResendMessage}>
                <View style={styles.wrapMessage}>
                    <View style={styles.wrapIconArrow}>
                        {this.model.type === resendMessageType.resend && (
                            <Image
                                // source={require('../../assets/img/Icons/resendArrow/arrow.png')}
                                source={CHAT_ICONS.resendArrow}
                                style={styles.resendArrow}
                            />
                        )}
                        {this.model.type === resendMessageType.edit && (
                            <Image
                                // source={require('../../assets/img/editPencil/pencil.jpg')}
                                source={CHAT_ICONS.pencil}
                                style={styles.resendArrow}
                            />
                        )}
                    </View>
                    <View style={styles.wrapMessageText}>
                        {this.model.type === resendMessageType.resend && (
                            <Text style={styles.userNameText}>
                                {this.model.message.userName}
                            </Text>
                        )}
                        {this.model.type === resendMessageType.edit && (
                            <Text style={styles.textEdit}>Редагувати повідомлення</Text>
                        )}
                        <Text style={styles.text} numberOfLines={1}>{this.model.text()}</Text>
                    </View>
                </View>
                <View style={styles.wrapResend}>
                    <IconButtonView model={this.model.closeButton} key={this.model.closeButton.id} />
                </View>
            </View>
        );
    }
}

export { ResendMessageView };

const styles = StyleSheet.create({
    wrapResendMessage: {
       // position: 'absolute',
        paddingVertical: hp(10),
        justifyContent: 'space-between',
        //  paddingHorizontal: hp(10),
        paddingLeft: hp(10),
        flexDirection: 'row',
        //bottom: 0,
        backgroundColor: 'red',
        zIndex: 9999,
        // flex: 1,
        // width: '100%',
        height: store().chats.keyboard.emojiChat.resendMessage.height,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
        //marginTop:-70
    },
    wrapMessage: {
        flexDirection: 'row',
        width: '80%',
    },
    wrapIconArrow: {
        marginRight: hp(10),
        justifyContent: 'center',
    },
    resendArrow: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
    wrapMessageText: {
        width: '90%',
    },
    wrapResend: {
        marginRight: wp(20),
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnClose: {
        width: hp(42),
        height: hp(22),
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: hp(20),
    },
    imageArrowClose: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
    userNameText: {
        color: '#0076BF',
        fontFamily: 'Roboto-Medium',
        fontSize: hp(13),
    },
    textEdit: {
        color: '#0076BF',
        fontFamily: 'Roboto-Medium',
        fontSize: hp(13),
    },
    text: {
        color: 'red',
        fontFamily: 'Roboto-Regular',
        fontSize: hp(10),
    }
});
