import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TypedBaseComponent} from "../../../Common/BaseComponent";
import { RecyclerItemModel } from './RecyclerItemModel';

// const NativeRecyclerViewItem = requireNativeComponent('RecyclerViewItemView');

class RecyclerViewItem extends TypedBaseComponent<RecyclerItemModel> {
    constructor(props) {
        super(props);
    }

    render(){
        super.render();
        // console.log('itemProps',this.props.renderItem({item: this.model, index:0}))
        const element = this.props.renderItem({
            item: this.props.dataSource.get(this.model.itemIndex),
            index: this.model.itemIndex,
        });
        console.log('element ', element)
        return null
        // (
            // <NativeRecyclerViewItem
            //     {...this.props}
            //     style={{
            //         position: 'absolute',
            //         top: 0,
            //         left: 0,
            //         right: 0,
            //         backgroundColor: 'pink',
            //         // flex: 1,
            //         // width: 100,
            //         // height: 100,
            //     }}
            //     itemIndex={this.model.itemIndex}
            // >
            //     {element}
            //  </NativeRecyclerViewItem>
        // );
    }
}
export { RecyclerViewItem }

const styles = StyleSheet.create({
    container: {

    },
});
