import {MultiBase} from "../../../Common/BaseModel";
import {Button} from "../Button";
import {ICONS} from "../../../constants/icons";

type urlerHeader = {
    id: string;
    title?: string;
    onPress?: ()=>void;
}
export class UrlerHeader extends MultiBase {
    private _model: urlerHeader;
    private _title: string;
    private _closeBtn: Button;
    constructor(model: urlerHeader) {
        super(model.id);
        this._model = model;
        this.onPressX = this.onPressX.bind(this);
        this._title = model.title || '';
        this._closeBtn = new Button({
            id: 'string',
            style: 'urlerCloseBtn',
            onPress: this.onPressX,
            icon: ICONS.closeBtnIcon
        })
    }
    get closeBtn(){
        return this._closeBtn
    }
    get title(){
        return this._title
    }
    onPressX(){
        if(typeof this._model.onPress === 'function'){
            this._model.onPress()
        }
    }
}
