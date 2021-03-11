import {BaseModel} from '../../../Common/BaseModel';
import {currentUser} from '../../../Core/CurrentUser';
import {Dimensions} from 'react-native';

type avoidScrollModel = {
  id: string;
  initialMaxHeight?: number;
  minusMaxHeight?: number;
  scrollEnabled?: boolean;
  onScroll?: (nativeEvent: any)=>void;
};

class AvoidScrollModel extends BaseModel {
  private _model: avoidScrollModel;
  private _maxHeight: string | number;
  private _initialMaxHeight: number | string;
  private _isFlex: boolean;
  private _minusMaxHeight: number;
  private _scrollEnabled: boolean;
  constructor(_model: avoidScrollModel) {
    super(_model.id);
    this._model = _model;
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this._initialMaxHeight =
      _model.initialMaxHeight !== undefined ? _model.initialMaxHeight : '100%';
    this._maxHeight = this._initialMaxHeight;
    this._isFlex = true;
    this._minusMaxHeight =
      _model.minusMaxHeight !== undefined ? _model.minusMaxHeight : 130;
    this._scrollEnabled =
      _model.scrollEnabled !== undefined ? _model.scrollEnabled : true;
  }

  onScroll(nativeEvent: any){
    if(typeof  this._model.onScroll === 'function'){
      this._model.onScroll(nativeEvent)
    }
  }

  keyboardDidShow(e) {
    const mistake =
      currentUser().mistakeHeight !== null && currentUser().mistakeHeight > 70
        ? currentUser().mistakeHeight / 2
        : 0;
    this._maxHeight =
      Dimensions.get('window').height -
      e.endCoordinates.height -
      this._minusMaxHeight -
      mistake;
    this._isFlex = false;
    this.forceUpdate();
  }
  keyboardDidHide = () => {
    this._maxHeight = this._initialMaxHeight;
    this._isFlex = true;
    this.forceUpdate();
  };

  get isFlex() {
    return this._isFlex;
  }
  get maxHeight() {
    return this._maxHeight;
  }
  get scrollEnabled() {
    return this._scrollEnabled;
  }
  set scrollEnabled(value) {
    if (this._scrollEnabled !== value) {
      this._scrollEnabled = value;
      // this.forceUpdate();
    }
  }
}

export {AvoidScrollModel};
