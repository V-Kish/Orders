import {Base} from "./Base";
import DocumentPicker from 'react-native-document-picker';
import {Button} from "../../Models/Components/Button";
import {IconButton} from "../../Models/Components/IconButton";
import {CHAT_ICONS, ICONS} from "../../constants/icons";

type keyboardPickerProps = {
    id: string;
    hidden: boolean;
    pickFiles: () => void;
    pickPhoto: () => void;
    onCloseBack?: () => void;
}

class KeyboardFilePicker extends Base{
    private _model: keyboardPickerProps;
    private readonly pickerTypes: { image: string; files: string };
    public photoButton: Button;
    public closeButton: IconButton;
    public fileButton: Button;
    constructor(model: keyboardPickerProps) {
        super(model.id);
        this._model = model;
        this.onCloseBack = this.onCloseBack.bind(this);
        this.pickerTypes = {
            image: 'images',
            files: 'allFiles',
        };
        this.pick = this.pick.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.photoButton = new Button({
            id: 'KeyboardPicker_PhotoButton',
            title: 'Завантажити фото: до 3х фото',
            onPress: this._model.pickPhoto,
            // icon: require('../assets/img/DocumentPickerViewIcon/ic_camera_alt_black_24px.png'),
            icon: CHAT_ICONS.documentCamera,
            style: 'pickerButton',
        });
        this.fileButton = new Button({
            id: 'KeyboardPicker_FileButton',
            title: 'Завантажити файл: до 3х файлів',
            onPress: this._model.pickFiles,
            // icon: require('../assets/img/DocumentPickerViewIcon/ic_cloud_upload_black_24px.png'),
            icon: CHAT_ICONS.documentPick,
            style: 'pickerButton',
        });
        this.closeButton = new IconButton({
            // icon: require('../assets/img/Icons/close/closeWhite/Shape.png'),
            icon: CHAT_ICONS.closeWhite,
            id: 'KeyboardPicker_CloseButton',
            style: 'pickerCloseButton',
            onPress: this.closePicker,

        })
    }

    get hidden() {
        return this._model.hidden;
    }

    async pick(type: string) {
        try {
            const res = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types[this.pickerTypes[type]]],
            });
            return res;
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                return false;
            } else {
                throw err;
            }
        }
    }
    onCloseBack() {
        this._model.onCloseBack();
    }
    closePicker() {
        this.onCloseBack()
        this.update(true, true);
    }

    update(hidden: boolean, forceUpdate: boolean) {
        if(this.hidden !== hidden){
            this._model.hidden = hidden;
            this.modified = true;
            if(forceUpdate){
                this.forceUpdate();
            }
            return true;
        }
        return  false;
    }
}
export {KeyboardFilePicker};
