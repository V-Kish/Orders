import {Base} from "../../provider/Base";
import {store} from "../../provider/Store";
import React from 'react'
import ReactNative, 
{requireNativeComponent,
  Text,
UIManager} 
from 'react-native'
import { RecyclerItemModel } from "./RecyclerItemModel";
import { RecyclerViewItem } from "./RecyclerItem";

class RecyclerModel extends Base{
    private _dataSource
    private _dataSourceListener:any = {
        onVisibleItems: () => {
          let items = [];
          items.push(0, this.dataSource.size());
          return items;
        },
    
        onUnshift: () => {
          this._notifyItemRangeInserted(0, 1);
          this._shouldUpdateAll = true;
          // this.insertIntoBody(this.dataSource.size(), true)
        },
    
        onPush: () => {
        //   const { dataSource } = this.props;
          this._notifyItemRangeInserted(this._dataSource.size(), 1);
          this._shouldUpdateAll = true;
          // this.insertIntoBody(this.dataSource.size(), false)
        },
    
        onPushList: (pushSize) => {
        //   const { dataSource } = this.props
        
          this._notifyItemRangeInserted(this._dataSource.size(), pushSize)
          this._shouldUpdateAll = true
        },
    
        onMoveUp: position => {
          this._notifyItemMoved(position, position - 1);
          this._shouldUpdateAll = true;
        },
    
        onMoveDown: position => {
          this._notifyItemMoved(position, position + 1);
          this._shouldUpdateAll = true;
        },
    
        onSplice: (start, deleteCount, ...items) => {
          if (deleteCount > 0) {
            this._notifyItemRangeRemoved(start, deleteCount);
          }
          if (items.length > 0) {
            this._notifyItemRangeInserted(start, items.length);
          }
          this._shouldUpdateAll = true;
          this.forceUpdate()
        },
    
        onSet: (index, item) => {
          this._shouldUpdateKeys.push(this._dataSource.getKey(item, index));
          this.forceUpdate();
        },
    
        onSetDirty: () => {
          this._shouldUpdateAll = true;
          this.forceUpdate();
        },
    
        scrollToID: (index, { animated = true, velocity } = {}) => {
          this.scrollToIndex({
            index: index,
            animated,
            velocity,
          });
        },
    
        scrollToEnd: () => {
          this.scrollToEnd();
        },
    };
    private _shouldUpdateAll:any;
    private _shouldUpdateKeys:any;
    private _body: any
    private _renderItem:any
    constructor(model) {
        super(model.id);
        // this._dataSource = store().chats.current.items.dataSource
        // this._dataSource._addListener(this._dataSourceListener);
        this._shouldUpdateAll = true;
        this._shouldUpdateKeys = [];
        this._body = []

        this.initBody = this.initBody.bind(this)
        this.addListener = this.addListener.bind(this)
        // this._renderItem = model.renderItem
    }
    get renderItem(){
      return this._renderItem
    }
    set renderItem(value){
      this._renderItem = value
    }
    get dataSource(){
      return this._dataSource
    }
    set dataSource(value){
      this._dataSource = value
    }
    addListener(){
        this._dataSource._addListener(this._dataSourceListener)
    }

    _calcItemRangeToRender(firstVisibleIndex, lastVisibleIndex) {
        // const { dataSource, windowSize } = this.props;
        const windowSize = 100000
        var count = this._dataSource.size();
        var from = Math.min(count, Math.max(0, firstVisibleIndex - windowSize));
        var to = Math.min(count, lastVisibleIndex + windowSize);
        return [from, to];
    }

    _handleVisibleItemsChange = ({ nativeEvent }) => {
        var firstIndex = nativeEvent.firstIndex;
        var lastIndex = nativeEvent.lastIndex;
    
        const { onVisibleItemsChange } = this.component.props;
        if (onVisibleItemsChange) {
          onVisibleItemsChange(nativeEvent);
        }
            store().chats.current.items.newMessageIndicator.setLastIndex(firstIndex);
            store().chats.current.items.goBottom.setLastIndexBottom(firstIndex);
      };

    _notifyItemRangeInserted(position, count) {
      console.log('incerted ITEM')
        UIManager.dispatchViewManagerCommand(
          ReactNative.findNodeHandle(this.component),
          UIManager.AndroidRecyclerViewBackedScrollView.Commands
            .notifyItemRangeInserted,
          [position, count],
        );
        this.forceUpdate();
    }

    _notifyItemRangeRemoved(position, count) {
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this.component),
            UIManager.AndroidRecyclerViewBackedScrollView.Commands
            .notifyItemRangeRemoved,
            [position, count],
        );
        this.forceUpdate();
    }

    _notifyItemMoved(currentPosition, nextPosition) {
        console.log('_notifyItemMoved', currentPosition)
        UIManager.dispatchViewManagerCommand(
          ReactNative.findNodeHandle(this.component),
          UIManager.AndroidRecyclerViewBackedScrollView.Commands.notifyItemMoved,
          [currentPosition, nextPosition],
        );
        this.forceUpdate();
    }

    scrollToIndex = ({
        animated = true,
        index,
        velocity,
        viewPosition,
        viewOffset,
      }) => {
        index = Math.max(0, Math.min(index, this._dataSource.size() - 1));
        if (animated) {
          UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this.component),
            UIManager.AndroidRecyclerViewBackedScrollView.Commands.scrollToIndex,
            [animated, index, velocity, viewPosition, viewOffset],
          );
        } else {
              UIManager.dispatchViewManagerCommand(
                ReactNative.findNodeHandle(this.component),
                UIManager.AndroidRecyclerViewBackedScrollView.Commands
                  .scrollToIndex,
                [animated, index, velocity, viewPosition, viewOffset],
              );
        }
    };

    scrollToEnd = () => {
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this.component),
            UIManager.AndroidRecyclerViewBackedScrollView.Commands.scrollToEnd,
            [],
        );
    };
    _handleScrolledToEnd = ({ nativeEvent }) => {
        const { onScrolledToEnd } = this.component.props;
        if (onScrolledToEnd) {
          onScrolledToEnd(nativeEvent);
        }
    };

    insertIntoBody(i, shouldUnshift = false){
      // console.log('insertIntoBody', i)
      try{
        i = i-1
        let item = this._dataSource.get(i);
        let itemKey = this._dataSource.getKey(item, i);
        const oneRecyclerItem = new RecyclerItemModel({
          id: `recyclerItem${i}`,
          // element: myElement, 
          itemIndex: i
        })
        if(!shouldUnshift){
          this._body.push(
            <RecyclerViewItem
              model={oneRecyclerItem}
              key={`recyclerItem${i}`}
              itemIndex={i}
              shouldUpdate={()=>true}
              dataSource={this._dataSource}
              renderItem={this.component.props.renderItem}
            />,
          );
        } else {
          this._body.unshift(
            <RecyclerViewItem
              model={oneRecyclerItem}
              key={`recyclerItem${i}`}
              itemIndex={i}
              shouldUpdate={()=>true}
              dataSource={this._dataSource}
              renderItem={this.component.props.renderItem}
            />,
          );
        }
      } catch(e){
        console.error('body push', e)
      }
      this.forceUpdate()
    }

    initBody(startSize, endSize){
      console.log('bodyinited start', this._body)
        for (var i = startSize; i < endSize; i++) {
          let item = this._dataSource.get(i);
          // const myElement = this._renderItem({item: item, index: i});
            const oneRecyclerItem = new RecyclerItemModel({
                id: `recyclerItem${i}`,
                // element: myElement, 
                itemIndex: i
            })
          // this._body.push(()=>{
          //   return (<RecyclerViewItem model={oneRecyclerItem} key={oneRecyclerItem.id}/>)
          // });
          let itemKey = this._dataSource.getKey(item, i);
          try{
            // this._body.push(
            //   <RecyclerViewItem
            //     model={oneRecyclerItem}
            //     key={itemKey}
            //     itemIndex={i}
            //     shouldUpdate={()=>true}
            //     dataSource={this._dataSource}
            //     renderItem={this.component.props.renderItem}
            //     style={{width:100, height: 100, backgoundColor:'yellow'}}
            //   />,
            // );
          } catch(e){
            console.error('body push', e)
          }

          // console.log('element', this._renderItem)
        }
            // let item = this._dataSource.get(i);
            // let itemKey = this._dataSource.getKey(item, i);

            // const myElement = this._renderItem({item: item, index: i});
            // const oneRecyclerItem = new RecyclerItemModel({
            //     id: `recyclerItem${i}`,
            //     element: myElement, 
            //     itemIndex: i
            // })
            // this._body.push(oneRecyclerItem);
            // let shouldUpdate = this._needsItemUpdate(itemKey);
        // }
        try{
          // this._body[0].props.model.forceUpdate()
          this.forceUpdate()
        } catch(e){
          console.log('forceUpdate', e)
        }
      console.log('bodyinited', this._body)
    }

    get body(){
        return this._body
    }

}

export { RecyclerModel }