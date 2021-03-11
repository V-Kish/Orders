import {MultiBase} from '../../../Common/BaseModel';

export class LastItemPaddingBottomModel extends MultiBase {
  private _isVisible: boolean;
  constructor(id: string) {
    super(`${id}_paddingBottom`);
    this._isVisible = true;
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
