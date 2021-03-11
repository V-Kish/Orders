import {Base} from "../Base";
import {store} from "../Store";


export class GoBottomModel extends Base{
    private _isVisible:boolean
    private _counter:number|string
    constructor(model) {
        super(model.id);
      this._isVisible = false;
      this._counter = 0;
        this.onPress = this.onPress.bind(this);
        this.setLastIndexBottom = this.setLastIndexBottom.bind(this);
    }
    get counter() {
        return this._counter;
    }
    set counter(value:number|string) {
        if (value === this._counter){
            return
        }
        this._counter = value
        this.modified = true;
        this.forceUpdate();

    }
    get isVisible() {
        return this._isVisible;
    }
    set isVisible(value:boolean) {
        if (value === this.isVisible){
            return
        }
        this._isVisible = value;
        this.modified = true;
        this.forceUpdate();
    }
    onPress() {
        this.isVisible = false;
        store().chats.current.items.dataSource.endScroll();
    }
    setLastIndexBottom(lastIndex){
        if(store().recyclerViewInverted){
            if(lastIndex>4 && !this._isVisible){
                this.showIndicator()
            }
            if(lastIndex === 0){
                this.hideIndicator()
            }
        } else {
            if(lastIndex<store().chats.current.items.dataSource.size()-4){
                this.showIndicator()
            }
            if(lastIndex === (store().chats.current.items.dataSource.size() - 1) && this._isVisible){
                this.hideIndicator()
            }
        }
    }

    hideIndicator(){
        this.counter = 0;
        this.isVisible = false;
        this.modified = true;
        this.forceUpdate();
    }

    showIndicator(){
        this.isVisible = true
        this.modified = true
        this.forceUpdate()
    }
}
