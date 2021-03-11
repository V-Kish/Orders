import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { mockupHeightToDP as hp } from '../../../constants/Dimensions';
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { ChatKeyboard } from '../../provider/Messages/ChatKeyboard';
import { EmojiChatView } from '../../ViewModel/ChatEmojiView/EmojiChatView';


class KeyboardInputBuckup extends TypedBaseComponent<ChatKeyboard> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        this.model.emojiChat.resetTop();
    }

    render() {
        return (
            <View style={styles.mainContainer} ref={(ref) => { this.model.emojiChat.refOnViewKeyboard = ref; }}>
                <EmojiChatView model={this.model.emojiChat} key={'EmojiChat'} />
            </View>
        )
    }
}

export { KeyboardInputBuckup };

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        // top: navigator().deviceHeight - hightChatInput - hp(60) - hp(80) - hp(10),
        zIndex: 801,
        left: 0,
        right: 0,
    }
});
