import * as React from 'react'
import { ChatInputView } from './ChatInputView';
import { EmojiFieldView } from './EmojiFieldView';
import {Keyboard, Platform, SafeAreaView} from 'react-native'
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { EmojiChat } from '../../provider/ChatEmoji/EmojiChat';
import {navigator} from "../../../Core/Navigator";
import {mockupHeightToDP as hp, mockupWidthToDP as wp,} from '../../../constants/Dimensions';
import {currentUser} from "../../../Core/CurrentUser";

class EmojiChatView extends TypedBaseComponent<EmojiChat> {
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
        //console.warn(e.endCoordinates.height)
        console.warn(navigator().deviceHeight)
        navigator().keyboardHeight = e.endCoordinates.height;
        this.model.keyboardDidShow()
        // global.fakeHeight.heigt = 2;
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

export { EmojiChatView }
