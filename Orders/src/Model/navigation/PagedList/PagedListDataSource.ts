import {NativeScrollEvent} from 'react-native';
import {BaseModel} from '../../../Common/BaseModel';
import {EmptyListMessageModel} from './EmptyListMessageModel';
import {PagedItemModel, pagedItemProps} from './PagedItem';
import {BottomPreloader} from "./BottomPreloader";

class PagedListDataSource extends BaseModel {
  private _pageIndex: number;
  private _pageSize: number;
  private _totalItems: number;
  private _totalPages: number;
  private _items: Array<any>;
  private _termSearch: any;
  private _isLoadAllItems: boolean;
  private _isInitList: boolean;
  private _shouldToUpdateList: boolean;
  private _needToUnshift: boolean;
  private _emptyListMessageModel: EmptyListMessageModel;
  private _refMainScroll: any;
  private prevCoordsScroll: number;
  private _scrollPosition: string;
  public itemModelImpl: new (model: pagedItemProps) => PagedItemModel;
  private _params: any;
  private _refreshing: boolean;
  private _bottomPreloader: BottomPreloader;

  constructor(
    id: any,
    emptyListMessageModel: EmptyListMessageModel = new EmptyListMessageModel({
      id: 'EmptyListMessageModel',
      title: 'Список порожній',
    }),
  ) {
    super(id);
    this._pageIndex = 1;
    this._pageSize = 10;
    this._totalItems = 10;
    this._totalPages = 10;
    this._items = [];
    this._isLoadAllItems = false;
    this._isInitList = false;
    this._shouldToUpdateList = false;
    this._needToUnshift = false;
    this._refMainScroll = null;
    this._emptyListMessageModel = emptyListMessageModel;
    this.prevCoordsScroll = 0;
    this._scrollPosition = 'Top';
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.itemModelImpl = PagedItemModel;
    this.positionScroll = this.positionScroll.bind(this);
    this._refreshing = false;
    this._bottomPreloader = new BottomPreloader(id);
  }

  async query(value: string, {...params} = {}): Promise<Array<any>> {
    throw 500;
  }

  async loadData(
    value: string = '',
    useClearList: boolean = false,
    {...params} = {...this._params},
  ) {
    this._params = {...params};
    this._needToUnshift =
      params.needToUnshift !== undefined ? params.needToUnshift : false;
    if (useClearList) {
      this.clearList();
    }
    if (params.refreshingState === undefined) {
      this.showPreloader();
    }
    if (value != this._termSearch) {
      this._termSearch = value;
    }
    const newItems = await this.query(this._termSearch, {...params});
    // console.log('newItemsnewItems',newItems)
    if (newItems !== undefined) {
      newItems.forEach((e) => {
        this.addOrUpdate(e);
      });
      this._isLoadAllItems = newItems.length < this._pageSize;
      if(this._isLoadAllItems){
        this._bottomPreloader.hide();
      }
    }
    this._isInitList = true;
    this.hidePreloader();
    this.forceUpdate();
  }

  refreshingWait(timeout: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  async onRefresh() {
    this.refreshing = true;
    const pageSize = this._pageSize
    const pageIndex = this._pageIndex
    this._pageIndex = 1
    this._pageSize = pageIndex*pageSize
    await this.loadData(this._termSearch, false, {
      ...this._params,
      needToUnshift: true,
      refreshingState: true,
    });
    this._pageIndex = pageIndex
    this._pageSize = pageSize
    this.refreshing = false;
  }

  async nextPage() {
    if (this._isLoadAllItems) {
      return;
    }
    // this.showBottomPreloader()
    this._shouldToUpdateList = false;
    this._pageIndex++;
    await this.loadData(this._termSearch, false, {
      ...this._params,
      needToUnshift: false,
    });
  }

  async addOrUpdate(model: any) {
    const item = this._items.find((e) => e.id == model.id);
    if (item === undefined) {
      await this.add(model);
    } else {
      await this.update(item, model);
    }
  }

  async add(model: any) {
    if (this._isInitList && this._needToUnshift) {
      this._items.unshift(model);
    } else {
      this._items.push(model);
    }
    // this._items.push(model);
  }

  async update(item: PagedItemModel, model: any) {
    item.update(model);
  }

  async delete(id: string | number) {
    const item = this._items.find((i) => i.id == id);
    // console.log('deleteItem', item);
    if (item !== undefined) {
      item.delete();
      this.forceUpdate();
    }
  }

  clearList() {
    this._items = [];
    this._pageIndex = 1;
    this._isInitList = false;
    this._shouldToUpdateList = false;
    this._isLoadAllItems = false;
    this.forceUpdate();
  }

  positionScroll({contentOffset}, func) {
    // console.log('PagedListDataSource onScroll', contentOffset);
    if (Math.abs(contentOffset.y - this.prevCoordsScroll) > 10) {
      if (contentOffset.y < this.prevCoordsScroll) {
        if (this.scrollPosition === 'Bottom') {
          if (typeof func === 'function') {
            this.prevCoordsScroll = contentOffset.y;
            func('TOP');
          }
          this._scrollPosition = 'Top';
        }
      } else {
        if (this.scrollPosition === 'Top') {
          if (typeof func === 'function') {
            this.prevCoordsScroll = contentOffset.y;
            func('BOTTOM');
          }
          this._scrollPosition = 'Bottom';
        }
      }
      this.prevCoordsScroll = contentOffset.y;
    }
    if (contentOffset.y == 0) {
      if (typeof func === 'function') {
        func('TOP_PISiTIiON_0');
      }
    }
  }

  async onMomentumScrollEnd({nativeEvent}: { nativeEvent: NativeScrollEvent }) {
    // console.log('PagedListDataSource onMomentumScrollEnd');
    const paddingToBottom = 50;
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const isEnd =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    if (isEnd) {
      await this.nextPage();
    }
  }

  get items() {
    return this._items;
  }

  get emptyListMessageModel() {
    return this._emptyListMessageModel;
  }

  set emptyListMessageModel(value: EmptyListMessageModel) {
    this._emptyListMessageModel = value;
  }

  get pageIndex() {
    return this._pageIndex;
  }

  nextPageIndex() {
    this._pageIndex++;
  }

  get pageSize() {
    return this._pageSize;
  }

  get totalItems() {
    return this._totalItems;
  }

  get totalPages() {
    return this._totalPages;
  }

  get termSearch() {
    return this._termSearch;
  }

  get isInitList() {
    return this._isInitList;
  }

  get isLoadAllItems() {
    return this._isLoadAllItems;
  }

  // ref scroll

  get refMainScroll() {
    return this._refMainScroll;
  }

  set refMainScroll(value) {
    this._refMainScroll = value;
  }

  get shouldToUpdateList() {
    return this._shouldToUpdateList;
  }

  set shouldToUpdateList(shouldToUpdateList: boolean) {
    this._shouldToUpdateList = shouldToUpdateList;
  }

  get scrollPosition() {
    return this._scrollPosition;
  }

  get refreshing() {
    return this._refreshing;
  }

  set refreshing(value) {
    if (this._refreshing !== value) {
      this._refreshing = value;
      this.forceUpdate();
    }
  }

  showPreloader() {
    this._shouldToUpdateList = true;
    // this._bottomPreloader.show()
  }

  hidePreloader() {
    this._shouldToUpdateList = false;
    // this._bottomPreloader.hide();
  }
  get bottomPreloader(){
    return this._bottomPreloader
  }
  get scrollY(){
    return this.prevCoordsScroll
  }
}

export {PagedListDataSource};
