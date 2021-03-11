import {EmptyModal} from "../EmptyModal/EmptyModal";
import {UrlerHeader} from "./UrlerHeader";

type urler = {
    id: string;
    onPress?: ()=>void;
}
export class Urler extends EmptyModal {
    private _model: urler;
    private _webView: any;
    private _link: string;
    private _header: UrlerHeader;
    constructor(_model: urler) {
        super(_model.id);
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this._model = _model;
        this.onPressX = this.onPressX.bind(this)
        this._header = new UrlerHeader({id: `${_model.id}_Urler_urlerHeader`, onPress: this.onPressX})
        this._link = 'https://uat.osbb.work';
    }
    onPressX(){
        this.hide()
        if(typeof this._model.onPress === 'function'){
            this._model.onPress()
        }
    }
    get header(){
        return this._header;
    }

    onNavigationStateChange(event: any){
        console.log('stateChanged', event)
    }

    get webView(){
        return this._webView;
    }
    set webView(ref){
        this._webView = ref;
    }

    get link(){
        return this._link;
    }
    set link(value){
        this._link = value;
    }

}
