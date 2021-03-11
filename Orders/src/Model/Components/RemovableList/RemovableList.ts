import {BaseModel} from '../../../Common/BaseModel';
import {RemovableItem} from './RemovableItem';

type removableModel = {
  id: string;
  formBoxPlaceHolder: string;
  onFormBoxChanged: (item: RemovableItem) => void;
  onDeletePress: () => void;
  style?: string;
};

class RemovableList extends BaseModel {
  private _model: removableModel;
  private _removableList: Array<RemovableItem>;
  private _count: number;

  constructor(_model: removableModel) {
    super(_model.id);
    this._model = _model;
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.onDeletePress = this.onDeletePress.bind(this);
    this.onFormBoxChanged = this.onFormBoxChanged.bind(this);
    this.clearEmptyValues = this.clearEmptyValues.bind(this);
    this._removableList = [];
    this._count = 0;
  }

  initList(items: any) {
    this.clearList();
    items.forEach((item) => {
      this.add(item);
    });
    this.forceUpdate();
  }

  add(item) {
    this._count = this._count + 1;
    const newItem = new RemovableItem({
      id: `removableItem${this._count}`,
      placeholder: this._model.formBoxPlaceHolder,
      onDeletePress: this.onDeletePress,
      onFormBoxChanged: this.onFormBoxChanged,
      style: this._model.style,
      ...item,
    });
    this._removableList.push(newItem);
  }

  delete(id: string) {
    const index = this._removableList.findIndex((i) => i.id == id);
    if (index !== -1) {
      this._removableList.splice(index, 1);
      this.forceUpdate();
    }
  }

  clearList() {
    this._removableList = [];
  }

  onDeletePress(item: RemovableItem) {
    this.delete(item.id);
    this._model.onDeletePress();
  }

  onFormBoxChanged(item) {
    this._model.onFormBoxChanged(item);
  }

  clearEmptyValues() {
    let emptyList = [];
    this._removableList.forEach((e) => {
      if (e.formBoxInput.value == '' || e.formBoxInput.value === undefined) {
        emptyList.push(e.id);
      }
    });
    // return
    emptyList.forEach((e) => {
      this.delete(e);
    });
    this.forceUpdate();
  }

  isEmptyList() {
    return this._removableList.length === 0;
  }

  get removableList() {
    return this._removableList;
  }
}

export {RemovableList};
