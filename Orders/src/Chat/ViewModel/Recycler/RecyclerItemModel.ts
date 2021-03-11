import {Base} from "../../provider/Base";
import {store} from "../../provider/Store";
import ReactNative, 
{UIManager} 
from 'react-native'

class RecyclerItemModel extends Base{
    private _itemIndex: any
    private _element: any
    constructor(model) {
        super(model.id);
        this._element = model.element
        this._itemIndex = model.itemIndex
        this.modified = true
    }
    get itemIndex(){
        return this._itemIndex
    }
    get element(){
        return this._element
    }
}

export { RecyclerItemModel }