import {Base} from "../Base";
import {MessageList} from "../MessageList";
import {store} from "../Store";

type newMessageIndicator = {
    id: string,
    newMessages?: number,
    lastIndex?: number,
    list: MessageList,
}

export class NewMessageIndicator extends Base{
    private _model: newMessageIndicator;
    private _sizeMessageList: number;
    private _sizeAllMessages: number;
    private _lastIndex: number;
    private _sizeNewMessage: number;

    private _lastBiggerIndex: number;
    private _counter: number;
    private _prevSize: number;
    private _currentSize: number;

    constructor(model: newMessageIndicator) {
        super(model.id);
        this.addOneMessage = this.addOneMessage.bind(this)
        this.setLastIndex = this.setLastIndex.bind(this)
        this._model = {
            ...model,
            newMessages: 0,
        }
        this._lastBiggerIndex = 0
        this._prevSize = null
        this._counter = 0
        this.onPress = this.onPress.bind(this);
    }

    get newMessages() {
        return this._model.newMessages;
    }

    get lastIndex(){
        return this._lastIndex
    }

    setLastIndex(lastIndex){
        this._lastIndex = lastIndex
        // set bigger index
        if(store().recyclerViewInverted){
            if(this._lastIndex>=0 && this._lastIndex<this._counter){
                this._counter = this._lastIndex
                this.forceUpdate()
            }
        } else {
            if(lastIndex > this._lastBiggerIndex){
                this._lastBiggerIndex = lastIndex
            }
            this._currentSize = store().chats.current.items.dataSource.size();
            const currentIndexSize = this._currentSize - this._lastBiggerIndex - 1;
            if(this._counter > currentIndexSize){
                this._counter = currentIndexSize
                store().chats.current.items.goBottom.isVisible = false;
                store().chats.current.items.goBottom.counter = 0;
            }
            if(this._counter<0){
                this._counter = 0
            }
            this.forceUpdate()
        }
    }

    addOneMessage(){
        // this._lastBiggerIndex++
    }

    get counter() {
        if (this._counter >= 100){
            return  '99+'
        }else {
            return this._counter;

        }
    }

    get sizeAllMessages(){
        if (this._sizeAllMessages >= 100){
            return  '99+'
        }else {
            return this._sizeAllMessages;

        }
    }
    iterateNewMessages() {
        if(store().recyclerViewInverted){
            this._counter++
            store().chats.current.items.goBottom.counter = this.counter;
            this.forceUpdate();
        } else {
            try{
                this._currentSize = store().chats.current.items.dataSource.size();
                this._model.list.goUp = true
                this.modified = true
            }catch (e) {
                console.log('iterateNewMessages ex',e)
            }
              this._counter++
              store().chats.current.items.goBottom.counter = this.counter;
              this.forceUpdate()
        }
    }
    clearIndicator() {
        this._counter = 0;
        this.forceUpdate()
    }

    onPress() {
        this._counter = 0;
        store().chats.current.items.dataSource.endScroll();
        store().chats.current.items.goBottom.isVisible = false;
        store().chats.current.items.goBottom.counter = 0;
        this.modified = true;
        this.forceUpdate();
    }
}
