import {Base} from "../Base";
import {IconButton} from "../IconButton";
import {MessageHelper} from "../Messages/MessageHelper"
// import {AppLog} from "../../Common/AppLog";
import { EmojiChat } from "../ChatEmoji/EmojiChat";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {CHAT_ICONS, ICONS} from "../../../constants/icons";
type keyboardFilePreview = {
    id: string,
    hidden: boolean,
    file?: file,
    files?: Array<file>,
    fileType?: number, //0 - imageMessage, 1 - fileMessage
    keyboard: EmojiChat,
    onShow?: () => void,
    onExit?:()=>void,
}

type file = {
    name: string,
    size: string,
    type: string,
    uri: string,
    fileType?:number
    id?:number
}

class KeyboardFilePreview extends Base {
    private _model: keyboardFilePreview;
    public removeFileButton: IconButton;
    private _hight: number;
    constructor(model: keyboardFilePreview) {
        super(model.id);
        this._model = model;
        this._model.files = [];
        this._hight = hp(120);
        this.removeFile = this.removeFile.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removeFileButton = new IconButton({
            id: 'KeyboardFilePreview_RemoveButton',
            // icon: require('../../assets/img/Icons/close/closeWhite/Shape.png'),
            icon: CHAT_ICONS.closeWhite,
            onPress: this.removeFile,
            style: 'previewCloseButton',
        });
    }
    onShow() {
        this._model.onShow();
    }
    onExit() {
        this._model.onExit();
    }
    get hidden() {
        return this._model.hidden;
    }

    get file() {
        return this._model.file;
    }
    get files() {
        return this._model.files;
    }
    get fileType() {
        return this._model.fileType;
    }
    get height() {
        return this._hight;
    }
    set file(file: file) {
        this._model.file = file;
        if(MessageHelper.getMessageType(file.name) === 5) {
            this._model.fileType = 0
        }else {
            this._model.fileType = 1
        }
        this.update(false, true)
    }
    set files(files: Array<file>) {
        let newArr:Array<file> = [];
        let i  = 0;
        if (typeof  this._model.files !== 'undefined' && this._model.files.length >= 1){
            this._model.files.forEach(item => {
                i++
                item.id = (i * new Date().getTime());
                newArr.push(item)
            })
        }
        files.forEach(item  => {
            i++
            if (i > 3) {
                return
            }
            let newItem ={
                name: item.name,
                size:  item.size,
                type: item.type,
                uri: item.uri,
                fileType: null,
                id: null,
            }
            if (MessageHelper.getMessageType(item.name) === 5){
                newItem.fileType = 0;
                newItem.id = (i * new Date().getTime());
                newArr.push(newItem)
            }else {
                newItem.fileType = 1;
                newItem.id = (i * new Date().getTime());
                newArr.push(newItem)
            }
        })
        this._model.files = newArr;
        this.modified = true;
        this.forceUpdate();
        this.update(false, true)
    }

    close(){
        this.update(true, true);
    }

    removeFile() {
        this._model.file = null;
        this._model.files = [];
        this.update(true, true);
        this.onExit();
       // this._model.keyboard.messageButton.update( true, true);
       // this._model.keyboard.pickerButton.update(false, true);
    }

    removeItem(item) {
        const index = this.files.map(item => {return item.id}).indexOf(item.id);
        if (index > -1) {
            this.files.splice(index, 1);
            this.modified = true;
            this.forceUpdate();
        }
        if (this.files.length === 0){
            this.removeFile()
        }
    }
    // animation for add file and photo
    setAnimation = (index,LayoutAnimation) => {
        if (this.files.length === 1 && index === 0){
            return
        }
        LayoutAnimation.configureNext({
            duration: 250,
            update: {
                type: LayoutAnimation.Types.easeIn,
                springDamping: 0.7,
            },
        });
        if (index !== 0){
            LayoutAnimation.configureNext({
                duration: 500,
                create: {
                    type: LayoutAnimation.Types.easeIn,
                    property: LayoutAnimation.Properties.scaleXY,
                    springDamping: 0.7,
                },
            });
        }
    };
    update(hidden: boolean, forceUpdate: boolean) {
        if(this.hidden !== hidden){
            this._model.hidden = hidden;
            this.modified = true;
            if (forceUpdate) {
                this.onShow();
                this.forceUpdate();
            }
            return true;
        }
        return  false;
    }

}
export {KeyboardFilePreview};
