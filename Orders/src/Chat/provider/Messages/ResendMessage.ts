import { Base } from "../Base";
import { IconButton } from "../../../Models/Components/IconButton";
import { Message } from '../Message';
// import { store } from '../../provider/Store';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {CHAT_ICONS, ICONS} from "../../../constants/icons";
enum resendMessageType {
    none = 0,
    resend = 1,
    edit = 2
}
type resendMessageProps = {
    id: string;
    onExit?: () => void
}
class ResendMessage extends Base {
    private _model: resendMessageProps;
    private _closeButton: IconButton;
    private _message: Message;
    private _type: resendMessageType;
    private _in: boolean;
    private _out: boolean;
    private _height: number;
    constructor(model: resendMessageProps) {
        super(model.id);
        this._model = model;
        this._height = hp(50);
        this._message = null;
        this._type = resendMessageType.none;

        this.onPress = this.onPress.bind(this);

        this._closeButton = new IconButton({
            id: `${model.id}_CloseIconButton`,
            // icon: require('../../assets/img/Icons/close/Close.png'),
            icon: CHAT_ICONS.close,
            onPress: this.onPress,
            style: 'btnClose'
        });
        this._in = false;
        this._out = false;
    }


    text() {
        if (this.message === null) {
            return '';
        }
        if (this.message.isFileMessage) {
            return this.message.message.fileName || this.message.message.fileNmae;
        }
        return this.message.message;
    }

    clear() {
        this.message = null;
        this.type = resendMessageType.none;
    }

    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }

    get out() {
        return this._out;
    }

    set out(value) {
        this._out = value;
    }
    get height() {
        return this._height;
    }
    setIn() {
        if(!this._in){
            this._in = true;
        }else {
            this._in = false;
            this.reset();
        }
    }


    reset() {
        this.out = false;
        this._in = false;
        const needUpdate = this.message !== null
        this.clear();
        if(needUpdate){
            this.modified = true;
            this.forceUpdate();
        }
    }
    onExit() {
        this._model.onExit();
    }
    onPress() {
        this.clear();
        this.modified = true;
        this.forceUpdate();
        this.onExit();
    }

    get closeButton() {
        return this._closeButton;
    }
}

export { ResendMessage, resendMessageType };
