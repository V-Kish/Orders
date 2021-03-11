import {MultiBase} from '../../../Common/BaseModel';

export type pagedItemProps = {
  id: string | number;
  name: string;
};

class PagedItemModel extends MultiBase {
  private _model: any;
  private _deleted: boolean;

  constructor(model: pagedItemProps) {
    super(`${model.id}`);
    this._model = model;
    this._deleted = false;
  }

  // onPress(model: PagedItemModel) {
  //   if (typeof this._model.onPress === 'function') {
  //     this._model.onPress();
  //   }
  // }

  update(component: any) {
    this._model = component.model;
    this.modified = true;
  }

  delete() {
    this._deleted = true;
    this.modified = true;
    this.forceUpdate();
  }

  get model() {
    return this._model;
  }

  get deleted() {
    return this._deleted;
  }
}

export {PagedItemModel};
