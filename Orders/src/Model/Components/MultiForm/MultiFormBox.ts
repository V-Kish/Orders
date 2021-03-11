import { BaseModel } from '../../../Common/BaseModel';

type multiFormBoxModel = {
    id: string;
    editable: boolean;
    onPress: ()=>void;
    style?:string|undefined
};

class MultiFormBox extends BaseModel {
    private _value: string
    private _onPress: ()=>void
    private _editable: boolean
    private _style: string|undefined
    constructor(_model: multiFormBoxModel) {
        super(_model.id);
        this._value = ''
        this.onPress = this.onPress.bind(this)
        this._onPress = _model.onPress
        this._editable = _model.editable!==undefined ? _model.editable : true
        this._style = _model.style ? _model.style : undefined
    }

    get value(){
        return this._value
    }
    set value(value: string){
        this._value = value
        this.forceUpdate()
    }

    get editable(){
        return this._editable
    }

    get style(){
        return this._style
    }

    onPress(){
        this._onPress()
    }
}

export { MultiFormBox };
