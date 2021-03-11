import * as React from 'react';
import {StyleSheet, requireNativeComponent} from 'react-native';
import {TypedBaseComponent} from "../../../Common/BaseComponent";
import { RecyclerModel } from './RecyclerModel';
import { MessageView } from '../../classes/MessageView';
import { store } from '../../provider/Store';

import NativeRecyclerViewItem from '../NativeRecyclerViewItem';

class RecyclerView extends TypedBaseComponent<RecyclerModel> {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // super.onFocus();
        console.log('asdasdasdasdasdasdasdasdasdas', store().chats.current.items.dataSource)
        this.model.dataSource = store().chats.current.items.dataSource;
        this.model.addListener()
        this.model.renderItem = ({item,index}) => {
            return <MessageView model={item} key={`Message_${index}`} index={index}/>
        }
    }
    render(){
        super.render();
        console.log('this.model.dataSource',this.model.dataSource)
        return (
            <NativeRecyclerView
                {...this.props}
                style={{flex: 1}}
                itemCount={this.model.body.length}
                onVisibleItemsChange={this.model._handleVisibleItemsChange}
                onScrolledToEnd={this.model._handleScrolledToEnd}
                // onScrolledTop={this._handleScrolledTop}
                // onGoBottom={this._handleOnGoBottom}
                inverted={true}
                >
                    {this.model.dataSource && this.model.dataSource.data && this.model.dataSource.data.map((element, index) =>{
                        return(<NativeRecyclerViewItem
                            key={`nativeItem${index}`}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                // backgroundColor: 'pink',
                                flex: 1,
                                // width: 100,
                                // height: 100,
                            }}
                            itemIndex={index+1}
                        >
                            <MessageView model={element} key={`Message${element.id}`}  index={index+1}/>
                        </NativeRecyclerViewItem>)
                    })}
                {/* {this.model.body} */}
            </NativeRecyclerView>
        );
    }
}
export { RecyclerView }

const styles = StyleSheet.create({
    container: {

    },
});

var nativeOnlyProps = {
    nativeOnly: {
      onVisibleItemsChange: true,
      onScrolledToEnd: false,
      onScrolledTop: false,
      onGoBottom: false,
      itemCount: true,
    },
};
const NativeRecyclerView = requireNativeComponent(
    'AndroidRecyclerViewBackedScrollView',
    RecyclerView,
    nativeOnlyProps,
);
