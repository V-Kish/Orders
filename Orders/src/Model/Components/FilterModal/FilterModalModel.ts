import {BaseModel} from '../../../Common/BaseModel';
import {Button} from '../Button';
import {ICONS} from '../../../constants/icons';

type filterModalModel = {
  id: string;
  onPressFilter?: (isVisible:boolean) => void;
  onLastFilterPress?: ()=>void;
  onDoneFilterPress?: ()=>void;
  stylesPoint?:string,
  point?:boolean,
  withBtns?: boolean;
};
class FilterModalModel extends BaseModel {
  private _model: filterModalModel;
  private _isVisible: boolean;
  private _filterBtn: Button;
  private _lastFiltersBtn: Button;
  private _doneFilterBtn: Button;
  private _withBtns: boolean;
  constructor(_model: filterModalModel) {
    super(_model.id);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onVisibleChanged = this.onVisibleChanged.bind(this);
    this.onDoneFilterPress = this.onDoneFilterPress.bind(this);
    this.onLastFilterPress = this.onLastFilterPress.bind(this);
    this._model = _model;
    this._isVisible = false;
    this._filterBtn = new Button({
      id: 'filterBtnStyle',
      style: 'filterBtnStyle',
      onPress: this.toggle,
      icon: ICONS.filterBlue,
    });
    this._doneFilterBtn = new Button({
      id: '_doneFilterBtn',
      title: 'Підтвердити',
      style: 'detailButtonsAccept',
      onPress: this.onDoneFilterPress
    })
    this._lastFiltersBtn = new Button({
      id: '_lastFiltersBtn',
      title: 'Скасувати',
      style: 'detailButtonsCancelOpacity',
      onPress: this.onLastFilterPress
    })
    this._withBtns = _model.withBtns!==undefined ? _model.withBtns : false
  }

  get withBtns(){
    return this._withBtns
  }

  onDoneFilterPress(){
    this.hide()
    if (this._model.onDoneFilterPress !== undefined) {
      this._model.onDoneFilterPress();
    }
  }
  onLastFilterPress(){
    this.hide()
    if (this._model.onLastFilterPress !== undefined) {
      this._model.onLastFilterPress();
    }
  }
  onVisibleChanged() {
    if (this._model.onPressFilter !== undefined) {
      this._model.onPressFilter(this._isVisible);
    }
  }
  show() {
    if (!this._isVisible) {
      this._isVisible = true;
      this.forceUpdate();
    }
  }
  hide() {
    if (this._isVisible) {
      this._isVisible = false;
      this.forceUpdate();
    }
  }

  toggle() {
    this._isVisible = !this._isVisible;
    this.onVisibleChanged();
    this.forceUpdate();
  }

  get isVisible() {
    return this._isVisible;
  }

  get filterBtn() {
    return this._filterBtn;
  }
  get doneFilterBtn(){
    return this._doneFilterBtn
  }
  get lastFiltersBtn(){
    return this._lastFiltersBtn
  }
}

export {FilterModalModel};
