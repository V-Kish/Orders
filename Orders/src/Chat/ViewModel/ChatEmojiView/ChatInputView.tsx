import * as React from 'react'
import { StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native'
import { ChatInput } from '../../provider/ChatEmoji/ChatInput';
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { IconButtonView } from '../IconButtonView';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { TextBox } from '../../classes/TextBox';
import { ResendMessageView } from '../Messages/ResendMessageView';
import { KeyboardFilePreviewView } from '../../classes/KeyboardFilePreviewView';
import { KeyboardFilePickerView } from '../../classes/KeyboardFilePickerView';
import { store } from '../../provider/Store';
import {COLORS} from "../../../constants/colors";

const height = hp(50); //change height in EmojiChatViewBuckup


class ChatInputView extends TypedBaseComponent<ChatInput>{
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        return (
            <View style={styles.container}
            >
                <ResendMessageView
                    model={store().chats.keyboard.emojiChat.resendMessage}
                    key={store().chats.keyboard.emojiChat.resendMessage.id}
                />
                <KeyboardFilePreviewView
                    model={store().chats.keyboard.emojiChat.keyboardFilePreview}
                    key={store().chats.keyboard.emojiChat.keyboardFilePreview.id}
                />
                <KeyboardFilePickerView
                    model={store().chats.keyboard.emojiChat.keyboardFilePicker}
                    key={store().chats.keyboard.emojiChat.keyboardFilePicker.id}
                />
                <View style={styles.inputContainer} ref={(ref) => this.model.refInputContainer = ref}>
                    <View style={styles.inputContainerBox}>
                        <View style={styles.inputMain}>
                            <View style={styles.smileOrKeyboard}>
                                <IconButtonView model={this.model.buttonSmile} key={'buttonSmile'} />
                                <IconButtonView model={this.model.buttonKeyboard} key={'buttonKeyboard'} />
                            </View>
                            <View style={{flex:1}}>
                                <TextBox
                                    model={this.model.textBox}
                                    key={this.model.textBox.id}
                                />
                            </View>

                        </View>
                        <View style={styles.sendButtonContainer}>
                            <IconButtonView model={this.model.buttonArrow} key={'buttonEnter'} />
                            <IconButtonView model={this.model.buttonClip} key={'buttonClip'} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // borderTopWidth: hp(1),
        // borderColor: '#bbb',
    },
    inputContainer: {
        minHeight: hp(40),
        height: height+hp(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
        zIndex: 999,
        backgroundColor: 'red',
        paddingHorizontal: wp(2),
         paddingVertical: hp(5),
        // maxHeight: hp(120),
        overflow: 'hidden',
    },
    inputContainerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    inputMain: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    sendButtonContainer: {
        marginRight: wp(20),
    },
    smileOrKeyboard: {
        marginLeft: wp(5),
    },
});

export { ChatInputView }