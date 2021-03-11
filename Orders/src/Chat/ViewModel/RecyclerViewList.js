import React, {Component} from 'react';
import ReactNative, {
  Platform,
  StyleSheet,
  UIManager,
  requireNativeComponent,
} from 'react-native';
import DataSource from './DataSource';
import {store} from '../provider/Store';
import NativeRecyclerViewItem from './NativeRecyclerViewItem'

class RecyclerViewItem extends Component {
  // static propTypes = {
  //   style: ViewPropTypes.style,
  //   itemIndex: PropTypes.number,
  //   shouldUpdate: PropTypes.bool,
  //   dataSource: PropTypes.object,
  //   renderItem: PropTypes.func,
  //   header: PropTypes.any,
  //   separator: PropTypes.any,
  //   footer: PropTypes.any,
  // };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.itemIndex !== this.props.itemIndex || nextProps.shouldUpdate
    );
  }

  render() {
    // const NativeRecyclerViewItem =
    //   Platform.OS === 'ios' ? null : dataSource.requiredItem;
    const {style, itemIndex, dataSource, renderItem} = this.props;
    const element = renderItem({
      item: dataSource.get(itemIndex),
      index: itemIndex,
    });
    return (
      <NativeRecyclerViewItem style={style} itemIndex={itemIndex}>
        {element}
      </NativeRecyclerViewItem>
    );
  }
}

export class RecyclerView extends React.PureComponent {
  static defaultProps = {
    dataSource: new DataSource([], (item, i) => i),
    initialListSize: 10,
    windowSize: 100000,
    inverted: false,
  };

  _dataSourceListener = {
    onVisibleItems: () => {
      let items = [];
      items.push(this.state.firstVisibleIndex, this.state.lastVisibleIndex);

      return items;
    },

    // getGoUp: () => {
    //   return this.state.goUp;
    // },

    onUnshift: () => {
      this._notifyItemRangeInserted(0, 1);
      this._shouldUpdateAll = true;
    },

    onPush: () => {
      const {dataSource} = this.props;
      this._notifyItemRangeInserted(dataSource.size(), 1);
      this._shouldUpdateAll = true;
    },

    onPushList: (pushSize) => {
      const {dataSource} = this.props;
      this._notifyItemRangeInserted(dataSource.size(), pushSize);
      this._shouldUpdateAll = true;
    },

    onMoveUp: (position) => {
      this._notifyItemMoved(position, position - 1);
      this._shouldUpdateAll = true;
    },

    onMoveDown: (position) => {
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
    },

    onSet: (index, item) => {
      this._shouldUpdateKeys.push(this.props.dataSource.getKey(item, index));
      this.forceUpdate();
    },

    onSetDirty: () => {
      this._shouldUpdateAll = true;
      this.forceUpdate();
    },

    scrollToID: (index, {animated = true, velocity} = {}) => {
      this.scrollToIndex({
        index: index,
        // animated,
        // velocity,
      });
    },

    scrollToEnd: () => {
      this.scrollToEnd();
    },
  };

  constructor(props) {
    super(props);

    const {dataSource, initialListSize, initialScrollIndex} = this.props;

    dataSource._addListener(this._dataSourceListener);

    var visibleRange =
      initialScrollIndex >= 0
        ? [initialScrollIndex, initialScrollIndex + initialListSize]
        : [0, initialListSize];

    this.state = {
      firstVisibleIndex: visibleRange[0],
      lastVisibleIndex: visibleRange[1],
      itemCount: dataSource.size(),
      firstLoad: 0,
      // goUp: false,
    };

    this._shouldUpdateAll = true;
    this._shouldUpdateKeys = [];
  }

  componentWillUnmount() {
    const {dataSource} = this.props;
    if (dataSource) {
      dataSource._removeListener(this._dataSourceListener);
    }
  }

  componentDidMount() {
    const {initialScrollIndex, initialScrollOffset} = this.props;
    if (initialScrollIndex) {
      // this.scrollToIndex({
      //   animated: true,
      //   index: initialScrollIndex,
      //   viewPosition: 0,
      //   viewOffset: initialScrollOffset,
      // });
      // this.scrollToEnd({
      //   animated: true,
      //   viewPosition: 0,
      //   viewOffset: initialScrollOffset,
      // });
    }

    this._shouldUpdateAll = false;
    this._shouldUpdateKeys = [];
  }

  componentWillReceiveProps(nextProps) {
    const {dataSource} = this.props;
    if (nextProps.dataSource !== dataSource) {
      dataSource._removeListener(this._dataSourceListener);
      nextProps.dataSource._addListener(this._dataSourceListener);
      this._notifyDataSetChanged(nextProps.dataSource.size());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this._shouldUpdateAll = false;
    this._shouldUpdateKeys = [];
  }

  render() {
    const {
      dataSource,
      renderItem,
      // ListHeaderComponent,
      // ListFooterComponent,
      ListEmptyComponent,
      // ItemSeparatorComponent,
      inverted,
      defaultInverted,
      ...rest
    } = this.props;

    const itemCount = dataSource.size();
    const end = itemCount - 1;
    var stateItemCount = this.state.itemCount;

    var body = [];
    var itemRangeToRender = this._calcItemRangeToRender(
      this.state.firstVisibleIndex,
      this.state.lastVisibleIndex,
    );

    // if (ListHeaderComponent) {
    //   var headerElement = React.isValidElement(ListHeaderComponent) ? (
    //     ListHeaderComponent
    //   ) : (
    //     <ListHeaderComponent />
    //   );
    // }

    // if (ListFooterComponent) {
    //   var footerElement = React.isValidElement(ListFooterComponent) ? (
    //     ListFooterComponent
    //   ) : (
    //     <ListFooterComponent />
    //   );
    // }

    // if (ItemSeparatorComponent) {
    //   var separatorElement = React.isValidElement(ItemSeparatorComponent) ? (
    //     ItemSeparatorComponent
    //   ) : (
    //     <ItemSeparatorComponent />
    //   );
    // }
    // console.log('bodyINITIALIZE', this.props.dataSource.size())
    if (this.props.dataSource.size() > 0) {
      // for (var i = itemRangeToRender[0]; i < itemRangeToRender[1]; i++) {
      for (var i = 0; i < this.props.dataSource.size(); i++) {
        let item = dataSource.get(i);
        // console.log('dataSourceItem', item);
        // console.log('bodyINITIALIZE2', item)
        let itemKey = dataSource.getKey(item, i);
        let shouldUpdate = this._needsItemUpdate(itemKey);
        let isFirst = i == 0;
        let isLast = i == end;
        // let header = defaultInverted
        //   ? isLast && footerElement
        //   : isFirst && headerElement;
        // let footer = defaultInverted
        //   ? isFirst && headerElement
        //   : isLast && footerElement;
        // let separator = defaultInverted
        //   ? !isFirst && separatorElement
        //   : !isLast && separatorElement;
        body.push(
          <RecyclerViewItem
            key={itemKey}
            style={styles.absolute}
            itemIndex={i}
            shouldUpdate={shouldUpdate}
            dataSource={dataSource}
            renderItem={renderItem}
            // header={header}
            // separator={separator}
            // footer={footer}
          />,
        );
      }
    } else if (ListEmptyComponent) {
      var emptyElement = React.isValidElement(ListEmptyComponent) ? (
        ListEmptyComponent
      ) : (
        <ListEmptyComponent />
      );

      body.push(
        <RecyclerViewItem
          style={styles.absolute}
          key="$empty"
          itemIndex={0}
          shouldUpdate={true}
          dataSource={dataSource}
          renderItem={() => emptyElement}
          // header={headerElement}
          // footer={footerElement}
        />,
      );

      stateItemCount = 1;
    }

    return (
      <NativeRecyclerView
        {...rest}
        itemCount={stateItemCount}
        onVisibleItemsChange={this._handleVisibleItemsChange}
        onScrolledToEnd={this._handleScrolledToEnd}
        // onScrolledTop={this._handleScrolledTop}
        // onGoBottom={this._handleOnGoBottom}
        inverted={defaultInverted}>
        {body}
      </NativeRecyclerView>
    );
  }

  // scrollToEnd({animated = true, velocity} = {}) {
  //     this.scrollToIndex({
  //         index: this.props.dataSource.size() - 1,
  //         animated,
  //         velocity,
  //     });
  // }

  scrollToEnd = () => {
    console.log('scrollToEnd_RV', true);

    const index = this.props.dataSource.size() - 1;

    // this.setState(
    //   {
    //     firstVisibleIndex: index,
    //     lastVisibleIndex:
    //       index + (this.state.lastVisibleIndex - this.state.firstVisibleIndex),
    //   },
    //   () => {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.RecyclerView.Commands.scrollToEnd,
      [],
    );
    //   },
    // );
  };

  scrollToIndex = ({
    index,
    animated = false,
    // velocity,
    // viewPosition,
    // viewOffset,
  }) => {
    index = Math.max(0, Math.min(index, this.props.dataSource.size() - 1));

    if (animated) {
      UIManager.dispatchViewManagerCommand(
        ReactNative.findNodeHandle(this),
        UIManager.RecyclerView.Commands.scrollToIndex,
        // [animated, index, velocity, viewPosition, viewOffset],
        [index],
      );
    } else {
      // this.setState(
      // {
      //   firstVisibleIndex: index,
      //   lastVisibleIndex:
      //     index +
      //     (this.state.lastVisibleIndex - this.state.firstVisibleIndex),
      // },
      // () => {
      UIManager.dispatchViewManagerCommand(
        ReactNative.findNodeHandle(this),
        UIManager.RecyclerView.Commands.scrollToIndex,
        // [animated, index, velocity, viewPosition, viewOffset],
          [index],
      );
      // },
      // );
    }
  };

  _needsItemUpdate(itemKey) {
    return this._shouldUpdateAll || this._shouldUpdateKeys.includes(itemKey);
  }

  _handleScrolledToEnd = ({nativeEvent}) => {
    const {onScrolledToEnd} = this.props;
    if (onScrolledToEnd) {
      onScrolledToEnd(nativeEvent);
    }
  };

  _handleOnGoBottom = ({nativeEvent}) => {
    const {onGoBottom} = this.props;
    if (onGoBottom) {
      onGoBottom(nativeEvent);
    }
  };

  _handleScrolledTop = ({nativeEvent}) => {
    // var goUp = nativeEvent.onScrolledTop;

    // this.setState({
    //     goUp: goUp,
    // });

    const {onScrolledTop} = this.props;
    if (onScrolledTop) {
      onScrolledTop(nativeEvent);
    }
  };

  _handleVisibleItemsChange = ({nativeEvent}) => {
    var firstIndex = nativeEvent.firstIndex;
    var lastIndex = nativeEvent.lastIndex;
    // this.setState({
    //   firstVisibleIndex: firstIndex,
    //   lastVisibleIndex: lastIndex,
    // });

    // console.log('onVisibleItemsChange start')
    const {onVisibleItemsChange} = this.props;
    if (onVisibleItemsChange) {
      // console.log('onVisibleItemsChange')
      onVisibleItemsChange(nativeEvent);
    }
    if (store().recyclerViewInverted) {
      store().chats.current.items.newMessageIndicator.setLastIndex(firstIndex);
      store().chats.current.items.goBottom.setLastIndexBottom(firstIndex);
    } else {
      store().chats.current.items.newMessageIndicator.setLastIndex(lastIndex);
      store().chats.current.items.goBottom.setLastIndexBottom(lastIndex);
    }
  };

  _calcItemRangeToRender(firstVisibleIndex, lastVisibleIndex) {
    const {dataSource, windowSize} = this.props;
    var count = dataSource.size();
    var from = Math.min(count, Math.max(0, firstVisibleIndex - windowSize));
    var to = Math.min(count, lastVisibleIndex + windowSize);
    return [from, to];
  }

  _notifyItemMoved(currentPosition, nextPosition) {
    // console.log('_notifyItemMoved', currentPosition)
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.RecyclerView.Commands.notifyItemMoved,
      [currentPosition, nextPosition],
    );
    this.forceUpdate();
  }

  _notifyItemRangeInserted(position, count) {
    // console.log('pos', position)
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.RecyclerView.Commands.notifyItemRangeInserted,
      [position, count],
    );

    // const { firstVisibleIndex, lastVisibleIndex, itemCount } = this.state;
    this.forceUpdate();
    // if (itemCount == 0) {
    //   // this.setState({
    //     // itemCount: this.props.dataSource.size(),
    //   //   firstVisibleIndex: 0,
    //   //   lastVisibleIndex: this.props.initialListSize,
    //   // });
    //   this.forceUpdate()
    // } else {
    //   if (position <= firstVisibleIndex) {
    //     // console.log('firstVisibleIndex')
    //     // this.setState({
    //     //   firstVisibleIndex: this.state.firstVisibleIndex + count,
    //     //   lastVisibleIndex: this.state.lastVisibleIndex + count,
    //     // });
    //     this.forceUpdate()
    //   } else {
    //     // console.log('!!!firstVisibleIndex')
    //     this.forceUpdate();
    //   }
    // }
  }

  _notifyItemRangeRemoved(position, count) {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.RecyclerView.Commands.notifyItemRangeRemoved,
      [position, count],
    );
    this.forceUpdate();
  }

  _notifyDataSetChanged(itemCount) {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.RecyclerView.Commands.notifyDataSetChanged,
      [itemCount],
    );
    // this.setState({
    //   itemCount,
    // });
  }
}

var nativeOnlyProps = {
  nativeOnly: {
    onVisibleItemsChange: true,
    onScrolledToEnd: false,
    onScrolledTop: false,
    onGoBottom: false,
    itemCount: true,
  },
};

var styles = StyleSheet.create({
  absolute: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

const NativeRecyclerView =
  Platform.OS === 'ios'
    ? null
    : requireNativeComponent('RecyclerView',
      RecyclerView,
      nativeOnlyProps
      );
