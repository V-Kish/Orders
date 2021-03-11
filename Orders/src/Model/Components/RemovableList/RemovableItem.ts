import {BaseModel} from '../../../Common/BaseModel';
import {FormTextBox} from '../FormTextBox';

type removableItemModel = {
  id: string;
  itemId: number;
  title: string;
  value?: string;
  placeholder: string;
  onDeletePress: (item: RemovableItem) => void;
  onFormBoxChanged: (item: RemovableItem) => void;
  type: 'titledFormBox' | 'FormBox';
  style?: string;
  keyboardType: string;
};

class RemovableItem extends BaseModel {
  private _model: removableItemModel;
  private _title: string;
  private _formBoxInput: FormTextBox;
  private _itemId: number;
  private _style: string;
  constructor(_model: removableItemModel) {
    super(_model.id);
    this.onDeletePress = this.onDeletePress.bind(this);
    this.onFormBoxChanged = this.onFormBoxChanged.bind(this);
    this._model = _model;
    this._title = _model.title;
    this._itemId = _model.itemId;
    this._style = _model.style ? _model.style : undefined;
    this._formBoxInput = new FormTextBox({
      id: `${this._model.id}_formBox`,
      title: '',
      value: _model.value !== null ? _model.value : '',
      style: 'removableInputBox',
      placeholder: _model.placeholder,
      keyboardType: _model.keyboardType,
      onChangeText: this.onFormBoxChanged,
    });
  }

  onDeletePress() {
    this._model.onDeletePress(this);
  }
  onFormBoxChanged(item) {
    this._model.onFormBoxChanged(item);
  }
  get title() {
    return this._title;
  }
  get formBoxInput() {
    return this._formBoxInput;
  }
  get itemId() {
    return this._itemId;
  }
  get style() {
    return this._style;
  }
}

export {RemovableItem};
