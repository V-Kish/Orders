import { MultiBase} from '../Common/BaseModel';

type counterModelProps = {
  id: string;
  counter: number;
};

class CounterModel extends MultiBase {
  private _counter: number;
  private _items: object;

  constructor(model: counterModelProps) {
    super(model.id);
    this._counter = model.counter || 0;
    this._items = {};
    // console.log('newCounterModel', this.id)
  }

  get items(){
    return this._items
  }
  set items(value){
    Object.keys(value).forEach(key=>{
      if(typeof this._items[key]==="undefined"){
        this._items[key] = new CounterModel({id: key, counter: value[key].counter});
      } else {
        if(this._items[key].counter !== value[key].counter){
          this._items[key].counter = value[key].counter
          this._items[key].modified = true
        }
      }
    })
    Object.keys(this._items).forEach(key=>{
      if(typeof value[key]==="undefined"){
        delete this._items[key]
      } else {
        // this._items[key].counter
      }
    })
    // this._items = value
  }

  getItem(key: string) {
    return this._items[key];
  }
  get counter() {
    return this._counter;
  }

  set counter(value: number) {
    this._counter = value;
    this.modified = true;
    this.forceUpdate();
    this.modified = true
  }
}

export {CounterModel};
