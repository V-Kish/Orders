import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import {PagedListDataSource} from '../../Models/navigation/PagedList/PagedListDataSource';
import {EmptyListMessageView} from './EmptyListMessageView';
import {Loader} from '../Components/Loader/Loader';
import {STYLES, STYLES_LIST} from '../../constants/styles';
import {COLORS} from '../../constants/colors';
import {BottomPreloaderView} from './BottomPreloaderView';
import {LastItemBottomPadding} from './LastItemBottomPadding';
import {controllers} from '../../Controllers/Controllers';

class PagedListView extends TypedBaseComponent<PagedListDataSource> {
  private _item: any;
  constructor(id: any) {
    super(id);
  }

  // renderItem(
  //   item: PagedItemModel,
  //   component: TypedBaseComponent<PagedItemModel>,
  // )
  renderItem(item: any, component: any) {
    return item.deleted ? null : component;
  }

  renderItems() {
    if (this.model.items === void 0) {
      return null;
    }
    return this.model.items.map((item) => this.renderItem(item));
  }

  render() {
    super.render();
    if (!this.model.isInitList || this.model.shouldToUpdateList) {
      return (
        <View style={STYLES.preloaderStyle}>
          <Loader />
        </View>
      );
    }
    if (this.model.items.length === 0) {
      return (
        <EmptyListMessageView
          model={this.model.emptyListMessageModel}
          key={this.model.emptyListMessageModel.id}
          id={this.childId(this.model.emptyListMessageModel)}
        />
      );
    } else {
      // console.log('this.model.items', this.model.items);
      return (
        // <View style={{flex: 1}}>
        <ScrollView
          ref={(ref) => (this.model.refMainScroll = ref)}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          onScroll={({nativeEvent}) => this.model.positionScroll(nativeEvent)}
          scrollEventThrottle={5}
          onMomentumScrollEnd={this.model.onMomentumScrollEnd}
          refreshControl={
            <RefreshControl
              tintColor={COLORS.BLUE.bg}
              colors={[COLORS.BLUE.bg]}
              titleColor={COLORS.BLUE.bg}
              refreshing={this.model.refreshing}
              onRefresh={this.model.onRefresh}
            />
          }>
          {this.renderItems()}
          <BottomPreloaderView
            model={this.model.bottomPreloader}
            key={this.childId(this.model.bottomPreloader)}
            id={this.childId(this.model.bottomPreloader)}
          />
          {/*// Padding for bottom navigation // */}
          <LastItemBottomPadding
            model={controllers().lastItemPaddingBottom}
            key={this.childId(controllers().lastItemPaddingBottom)}
            id={this.childId(controllers().lastItemPaddingBottom)}
          />
        </ScrollView>
        // </View>
      );
    }
  }
}

export {PagedListView};
