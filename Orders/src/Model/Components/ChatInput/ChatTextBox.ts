import {BaseModel} from "../../../Common/BaseModel";

type chatTextBox = {
    id: string;
    onChangeText: (textBox:ChatTextBox)=>void
}
export class ChatTextBox extends BaseModel {
    private _model: chatTextBox;
    private _value: string;
    private _numberOfLines: number;
    constructor(_model: chatTextBox) {
        super(_model.id);
        this._model = _model
        this.onChangeText = this.onChangeText.bind(this)
        this._value = ''
        this._numberOfLines = 1;
    }
    onChangeText(value:string){
        this.value = value
        const lines = value.split("\n").length;
        this._numberOfLines = lines >= 3 ? 3 : lines
        this.forceUpdate()
        this._model.onChangeText(this)
    }
    get numberOfLines(){
        return this._numberOfLines
    }
    get value(){
        return this._value
    }
    set value(value){
        if(this._value !== value){
            this._value = value
            this.forceUpdate()
        }
    }
}
