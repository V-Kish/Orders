import { Base } from "../Base";
import {TextBox} from "../TextBox";
import {Button} from "../../../Models/Components/Button";
import {store} from "../Store";
class RenameChat extends Base {
    private readonly _renameChatName: TextBox;
    private _step: boolean;
    private _buttonChangeState: Button;
    private _onSave: (text: string) => void;

    constructor(id: string, onSave: (text: string) => void) {
        super(id);
        this._onSave = onSave;
        this._step = true;
        this.buttonChangeStatePress = this.buttonChangeStatePress.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onEndEditing = this.onEndEditing.bind(this);
        this.onSave = this.onSave.bind(this)
        this._renameChatName = new TextBox({ id: `${id}_RenameChatName`, style:'contactInput',autoFocus:true,value: ``,placeholder:'',maxLength: 35 , onFocus:this.onFocus, onBlur: this.onBlur,onEndEditing:this.onEndEditing});
        this._buttonChangeState = new Button({ id: `${id}_DeleteButton`, onPress: this.buttonChangeStatePress });
    }
    buttonChangeStatePress() {
        this.update(false);
    }
    onBlur(textBox: TextBox) {
        this.onSave(textBox.value);
        this.update(true);
    }
    onFocus() {
    }
    onEndEditing(textBox: TextBox) {
        this.onSave(textBox.value)
    }
    onSave(textBox:string){
        this._onSave(textBox)
    }
    update(step:boolean) {
        if (this.step !== step){
            this.step = step;
            this.modified = true;
            this.forceUpdate();
        }
    }
    get renameChatName() {
        return this._renameChatName;
    }
    get step(){
        return this._step;
    }
    set step(value:boolean){
        this._step = value;
    }
}

export { RenameChat };
