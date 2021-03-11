import {BaseModel} from '../../../Common/BaseModel';

export type typeModelDropDawn = {
  id: string;
  style: string;
  placeholder: string | boolean;
  text: string | boolean;
  titleText: string | boolean;
  modalHeaderText: string | boolean;
  icon: string | boolean;
};

class DropDawnModel extends BaseModel {
  private _model: typeModelDropDawn;
  private _style: string;
  private _placeholder: string | boolean;
  private _titleText: string | boolean;
  private _modalHeaderText: string | boolean;
  private _icon: string | boolean;
  private _isShowDropDawnModal: boolean;
  private _selectedItems: Array;
  constructor(_model: typeModelDropDawn) {
    super(_model.id);
    this._model = _model;
    this.onShowDropDawnModal = this.onShowDropDawnModal.bind(this);
    this.onHideDropDawnModal = this.onHideDropDawnModal.bind(this);
    this._selectedItems = [];
    this._isShowDropDawnModal = false;
    this._style = this._model.style ? this._model.style : 'defaultStyles';
    this._icon = this._model.icon ? this._model.icon : false;
    this._titleText = this._model.titleText ? this._model.titleText : false;
    this._modalHeaderText = this._model.modalHeaderText ? this._model.modalHeaderText : false;
    this._placeholder = this._model.placeholder
      ? this._model.placeholder
      : false;
  }
  // selected items
  get selectedItems() {
    return this._selectedItems;
  }
  set selectedItems(value) {
    this._selectedItems.push(value);
    this.forceUpdate();
  }
  //
  get style() {
    return this._style;
  }
  get modalHeaderText() {
    return this._modalHeaderText;
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
    this.forceUpdate();
  }
  // get first in array obj and get his name
  get text() {
    return typeof this._selectedItems[0] !== 'undefined'
      ? this._selectedItems[0].name
      : false;
  }
  get placeholder() {
    return this._placeholder;
  }
  get titleText() {
    return this._titleText;
  }
  get isShowDropDawnModal() {
    return this._isShowDropDawnModal;
  }
  set isShowDropDawnModal(value: boolean) {
    this._isShowDropDawnModal = value;
    this.forceUpdate();
  }
  async onShowDropDawnModal() {
    this.isShowDropDawnModal = true;
  }
  async onHideDropDawnModal() {
    this.isShowDropDawnModal = false;
  }
}

export {DropDawnModel};
