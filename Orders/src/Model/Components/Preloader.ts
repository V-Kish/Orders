import {BaseModel} from '../../Common/BaseModel';

type preloaderProps = {
  id: string;
};

class Preloader extends BaseModel {
  private _model: preloaderProps;
  private _isVisible: boolean;
  constructor(model: preloaderProps) {
    super(model.id);
    this._model = model;
    this._isVisible = false;
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
  get isVisible() {
    return this._isVisible;
  }
}

export {Preloader};
