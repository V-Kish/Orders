import {store} from '../provider/Store';
import {requireNativeComponent} from "react-native";

export default class DataSource {
  // get requiredItem() {
  //   return this._requiredItem;
  // }
  //
  // set requiredItem(value) {
  //   if(this._requiredItem == null){
  //     this._requiredItem = value;
  //   }
  // }

  constructor(data, keyExtractor) {
    this._data = data || [];
    this._keyExtractor = keyExtractor;
    this._listeners = [];
    // this._requiredItem = requireNativeComponent('RecyclerViewItemView');

    if (!keyExtractor) {
      console.warn(
        "RecyclerViewList/DataSource: missing keyExtractor, it's strongly recommended to specify a keyExtractor function " +
          'in order to use all the features correctly.',
      );

      this._keyExtractor = (item, index) => {
        return JSON.stringify(item) + '_' + index;
      };
    }
  }

  visibleItems() {
    let items;
    this._listeners.forEach((listener) => {
      if (listener && listener.onVisibleItems && listener.onVisibleItems()) {
        items = listener.onVisibleItems();
      }
    });

    return items;
  }

  push(item) {
    this._data.push(item);
    this._listeners.forEach((listener) => {
      listener && listener.onPush && listener.onPush(item);
    });
  }

  pushList(items) {
    items.forEach((i) => {
      this._data.push(i);
    });
    this._listeners.forEach((listener) => {
      listener && listener.onPushList && listener.onPushList(items.length);
    });
  }

  unshift(item) {
    this._data.unshift(item);
    this._listeners.forEach((listener) => {
      listener && listener.onUnshift && listener.onUnshift(item);
    });
  }

  splice(start, deleteCount, ...items) {
    this._data.splice(start, deleteCount, ...items);
    this._listeners.forEach((listener) => {
      listener &&
        listener.onSplice &&
        listener.onSplice(start, deleteCount, ...items);
    });
  }

  size() {
    return this._data.length;
  }

  moveUp(index) {
    if (index <= 0) {
      return;
    }
    const item = this._data[index];
    this._data[index] = this._data[index - 1];
    this._data[index - 1] = item;
    this._listeners.forEach((listener) => {
      listener && listener.onMoveUp && listener.onMoveUp(index);
    });
  }

  moveDown(index) {
    if (index >= this._data.length - 1) {
      return;
    }
    const item = this._data[index];
    this._data[index] = this._data[index + 1];
    this._data[index + 1] = item;
    this._listeners.forEach((listener) => {
      listener && listener.onMoveDown && listener.onMoveDown(index);
    });
  }

  set(index, item) {
    this._data[index] = item;
    this._listeners.forEach((listener) => {
      listener && listener.onSplice && listener.onSet(index, item);
    });
  }

  setDirty() {
    this._listeners.forEach((listener) => {
      listener && listener.onSetDirty && listener.onSetDirty();
    });
  }

  getIDView(item) {
    return this._data.indexOf(item);
  }

  get(index) {
    return this._data[index];
  }

  getKey(item, index) {
    return this._keyExtractor(item, index);
  }

  scrollToID(index) {
    this._listeners.forEach((listener) => {
      listener && listener.scrollToID && listener.scrollToID(index);
    });
  }

  scrollEnd(index) {
    this._listeners.forEach((listener) => {
      listener && listener.scrollEnd && listener.scrollEnd(index);
    });
  }

  scrollToEnd() {
    this._listeners.forEach((listener) => {
      console.log('scrollToEndDataSource', this.size());
      // listener && listener.scrollToEnd && listener.scrollToEnd();
      if (store().recyclerViewInverted) {
        // listener && listener.scrollToEnd && listener.scrollToEnd();
        try {
          // if(this.size()!==20){
          // listener && listener.scrollToID && listener.scrollToID(0);
          // }
        } catch (e) {
          console.log('listener exeption', e);
        }
      } else {
        listener &&
          listener.scrollToID &&
          listener.scrollToID(this._data.length - 1);
      }
    });
  }

  endScroll() {
    // alert('SCROLL')
    this._listeners.forEach((listener) => {
      listener && listener.scrollToID && listener.scrollToID(0);
    });
  }

  clearData() {
    this._data = [];
  }

  // getGoUp(){
  //     console.log('goUp', true);
  //
  //     this._listeners.forEach((listener) => {
  //         listener && listener.getGoUp && listener.getGoUp();
  //     });
  // }

  _addListener(listener) {
    this._listeners.push(listener);
  }

  _removeListener(listener) {
    let index = this._listeners.indexOf(listener);
    if (index > -1) {
      this._listeners.splice(index, 1);
    }
  }

  get data() {
    return this._data;
  }
}
