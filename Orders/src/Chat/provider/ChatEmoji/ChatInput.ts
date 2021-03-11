import { IconButton } from "../IconButton";
import { Base } from "../Base";
import { TextBox } from "../TextBox";
import { store } from '../Store';
import {
    mockupWidthToDP as wp,
    mockupHeightToDP as hp,
} from '../../../constants/Dimensions';
import {CHAT_ICONS, DETAIL_ICONS, ICONS} from "../../../constants/icons";
// import { console } from "../../Common/console";

type chatInputProps = {
    id: string;
    placeholder?: string;
    style?: string;
    text?: string;
    ref?: any;
    onSmilePress: (button: IconButton) => void;
    onKeyboardPress: (button: IconButton) => void;
    onArrowPress: (button: IconButton) => void;
    onClipPress: (button: IconButton) => void;
    onFocus?: (textBox: ChatInput) => void;
    onContentSizeChange: (height: number, delta: number) => void;
    selection?: { start: number, end: number };
}
class ChatInput extends Base {
    private _model: chatInputProps;
    private _buttonSmile: IconButton;
    private _buttonKeyboard: IconButton;
    private _buttonArrow: IconButton;
    private _buttonClip: IconButton;
    private _textBox: TextBox;
    private _inputLines: number;
    private _inputHeight: number;
    private _initialInputHeight: number;
    private _inputDelta: number;
    private _refInputContainer: any;

    constructor(model: chatInputProps) {
        super(model.id)
        this._model = model;
        this.onSmilePress = this.onSmilePress.bind(this);
        this.onKeyboardPress = this.onKeyboardPress.bind(this);
        this.onClip = this.onClip.bind(this);
        this.onArrow = this.onArrow.bind(this);
        this.changeText = this.changeText.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onContentSizeChange = this.onContentSizeChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this._model.text = '';
        this.selection = { start: 0, end: 0 };

        this._inputLines = 1;
        this._inputHeight = 0;
        this._initialInputHeight = 0;
        this._inputDelta = 0;
        this._refInputContainer = null;

        this._buttonSmile = new IconButton({
            id: 'buttonSmile',
            onPress: this.onSmilePress,
            style: 'keyboardButton',
            // icon: require('../../assets/img/Icons/smile/Group.png'),
            // icon: CHAT_ICONS.buttonSmile,
            icon: DETAIL_ICONS.emojiBtn,
            hidden: false
        })
        this._buttonKeyboard = new IconButton({
            id: 'buttonKeyboard',
            onPress: this.onKeyboardPress,
            style: 'keyboardButton',
            // icon: require('../../assets/img/SmileIcon/keyboard/keyboard.png'),
            icon: CHAT_ICONS.keyboard,
            hidden: true
        });
        this._buttonClip = new IconButton({
            id: 'buttonClip',
            onPress: this.onClip,
            style: 'keyboardButton',
            // icon: require('../../assets/img/Icons/papper-clip/Group.png'),
            icon: CHAT_ICONS.paperClip,
            hidden: false
        });
        this._buttonArrow = new IconButton({
            id: 'buttonEnter',
            onPress: this.onArrow,
            style: 'keyboardButton',
            // icon: require('../../assets/img/Icons/send-arrow/Group.png'),
            // icon: CHAT_ICONS.sendArrow,
            icon: DETAIL_ICONS.sendMessage,
            hidden: true
        });
        this._textBox = new TextBox({
            id: 'ChatKeyboard_TextBox',
            onChangeText: this.changeText,
            placeholder: 'Написати повідомлення',
            onFocus: this.onFocus,
            multiline: true,
            maxLength: 1000,
            style: 'keyboardInput',
            onSelectionChange: this.onSelectionChange,
            onContentSizeChange: this.onContentSizeChange
        });
    }

    set refInputContainer(value) {
        this._refInputContainer = value;
    }

    onSmilePress() {
        this._model.onSmilePress(this.buttonSmile);
    }

    onKeyboardPress() {
        this._model.onKeyboardPress(this.buttonKeyboard);
    }

    onClip() {
        store().chats.keyboard.emojiChat.pickFiles();
        // If need  choice Image or Files
        // this._model.onClipPress(this.buttonClip);
    }
    onArrow() {
        this._model.onArrowPress(this.buttonArrow)
    }
    onSelectionChange(nativeEvent) {
        this.selection = nativeEvent.selection;
    }

    onContentSizeChange(event) {
        // console.log('onContentSizeChange', event)
        const height = event.nativeEvent.contentSize.height;
        if(this._initialInputHeight===0){
            this._initialInputHeight = height;
        }
        if (this._inputHeight === 0) {
            this._inputHeight = height+hp(10);
            // this._model.onContentSizeChange(hp(40), 0);
            return;
        }
        // console.log('onContentSizeChange height', height)
        // console.log('onContentSizeChange this._inputHeight', this._inputHeight)
        const lines = this._inputLines + (height > this._inputHeight ? Math.round(height/this._inputHeight) : (height === this._inputHeight) ? 0 : -1);
        // const lines = this._inputLines + (height > this._inputHeight ? 1 : (height === this._inputHeight) ? 0 : -1);
        // // console.log('onContentSizeChange lines', lines)
        if (lines > 2) {
            this._inputHeight = hp(100)
            this._inputLines = 3;
            this._inputDelta = -(this._initialInputHeight - this._inputHeight);
            this._model.onContentSizeChange(this._inputHeight, this._inputDelta);
            return;
        }
        this._inputLines = lines;
        this._inputHeight = height+hp(10);
        this._inputDelta = -(this._initialInputHeight - this._inputHeight);

        this._model.onContentSizeChange(this._inputHeight, this._inputDelta);
    }

    get height() :number {
        return hp(50) + this.inputDelta;
    }
    get inputDelta():number {
        return this._inputDelta;
    }

    get style() {
        return this._model.style;
    }
    get placeholder() {
        return this._model.placeholder;
    }
    get buttonSmile() {
        return this._buttonSmile;
    }
    get buttonKeyboard() {
        return this._buttonKeyboard;
    }
    get buttonArrow() {
        return this._buttonArrow;
    }

    get buttonClip() {
        return this._buttonClip;
    }

    get ref() {
        return this._model.ref;
    }
    set ref(value) {
        if (value !== this._model.ref) {
            this._model.ref = value;
        }
    }
    get selection() {
        return this._model.selection;
    }
    set selection(value) {
        if (value !== this._model.selection) {
            this._model.selection = value;
        }
    }
    get textBox() {
        return this._textBox;
    }
    get initialInputHeight() {
        return this._initialInputHeight;
    }

    inputToDefault() {
        this._inputLines = 1;
        this._inputHeight = 0;
        // this._initialInputHeight = 0;
        this._inputDelta = 0;
    }

    updateHeight() {
        // console.log('updateHeight', this.height);
        // console.log('updateHeight2', this._initialInputHeight);
        if (this._refInputContainer === null) {
            return;
        }
        // const height = this.height>0 ? this.height : hp(10)
        // // console.log('updateHeight3', height)
        this._refInputContainer.setNativeProps({
            style: { height: this.height+hp(10) }
        });
    }
    onFocus() {
        this._model.onFocus(this);
    }

    changeText(Textbox: TextBox, text: string) {
        if (this.textBox.value === '' && store().chats.keyboard.emojiChat.getModalWindowHeight() === 0) {
            this.buttonArrow.hidden = true;
            this.buttonClip.hidden = false;
        } else {
            this.buttonClip.hidden = true;
            this.buttonArrow.hidden = false;
        }
    }

}

export { ChatInput }
