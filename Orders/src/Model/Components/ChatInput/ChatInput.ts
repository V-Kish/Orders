import {BaseModel} from "../../../Common/BaseModel";
import {TextBox} from "../TextBox";
import {ChatTextBox} from "./ChatTextBox";
import {Dimensions, Keyboard} from "react-native";

type chatInput = {
    id: string;
}
export class ChatInput extends BaseModel {
    private _model: chatInput;
    private _textBox: ChatTextBox;
    private _bottom: number;
    private _keyboardHeight: number;
    private _showEmoji:boolean;
    private _keyboardShowed: boolean;
    constructor(_model: chatInput) {
        super(_model.id);
        this._model = _model;
        this.onChangeText = this.onChangeText.bind(this)
        this.keyboardDidShow = this.keyboardDidShow.bind(this)
        this.keyboardDidHide = this.keyboardDidHide.bind(this)
        this.changeEmojiStatus = this.changeEmojiStatus.bind(this)
        this._textBox = new ChatTextBox({
            id: 'chatInputTextBox',
            onChangeText: this.onChangeText
        })
        this._bottom = 0;
        this._keyboardHeight = Dimensions.get('screen').height*0.5
        this._showEmoji = false;
        this._keyboardShowed = false
    }
    changeEmojiStatus(){
        this._showEmoji = !this.showEmoji
        this.checkEmojiStat()
    }
    checkEmojiStat(){
        this._bottom = this._showEmoji ? this._keyboardHeight : this._keyboardShowed ? this._keyboardHeight : 0;
        if(this._showEmoji){
            Keyboard.dismiss()
        }
        this.forceUpdate()
    }
    onChangeText(box: ChatTextBox){

    }
    get emojiHeight(){
        return this._showEmoji ? this._bottom : 0
    }
    get showEmoji(){
        return this._showEmoji
    }
    get bottom(){
        return this._bottom
    }
    get textBox(){
        return this._textBox
    }

    keyboardDidShow(e: any){
        this._bottom = e.endCoordinates.height
        this._keyboardHeight = this._bottom
        this._keyboardShowed = true;
        this.forceUpdate()
    }

    keyboardDidHide(){
        if(!this._showEmoji) {
            this._bottom = 0
        }
        this._keyboardShowed = false;
        this.forceUpdate()
    }
}
