import * as React from 'react'
import { ChatInputView } from './ChatInputView';
import { EmojiFieldView } from './EmojiFieldView';
import { Keyboard, SafeAreaView } from 'react-native'
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { EmojiChat } from '../../provider/ChatEmoji/EmojiChat';
import {navigator} from "../../../Core/Navigator";
import {mockupHeightToDP as hp, mockupWidthToDP as wp,} from '../../../constants/Dimensions';

class EmojiChatViewBuckup extends TypedBaseComponent<EmojiChat> {
    private _keyboardDidHideListener: any;
    private _keyboardDidShowListener: any;

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        super.componentDidMount();
        this._keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.model.keyboardDidHide);
        this._keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    }
    _keyboardDidShow = (e) => {
        navigator().keyboardHeight = e.endCoordinates.height;
        this.model.keyboardDidShow()
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this._keyboardDidHideListener.remove();
        this._keyboardDidShowListener.remove();
    }

    render() {
        super.render();
        return (
            <>
                <ChatInputView model={this.model.chatInput} key={'ChatInput'} />
                <EmojiFieldView model={this.model.emojiField} key={'EmojiField'} />
            </>
        )
    }
}

export { EmojiChatViewBuckup }
