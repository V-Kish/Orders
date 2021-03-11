import {BaseModel} from "../../../Common/BaseModel";


export class EmptyModal extends BaseModel {
    private _isVisible: boolean = false;
    constructor(id: string) {
        super(id);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    // видимість модалки
    get isVisible(){return this._isVisible;}
    set isVisible(value){
        if(this._isVisible!==value){
            this._isVisible = value;
            this.forceUpdate();
        }
    }
    // показати модалку визвати функцію онШоу
    show(){this.isVisible = true; this.onShow();}
    // скрити модалку визвати функцію онХайд
    hide(){this.isVisible = false; this.onHide();}
    // змінити видимість модалки визвати онТогл
    toggle(){this.isVisible = !this._isVisible; this.onToggle()}
    //перезаписати в моделі ниже якщо треба
    onShow(){}
    //перезаписати в моделі ниже якщо треба
    onHide(){}
    //перезаписати в моделі ниже якщо треба
    onToggle(){}
}
