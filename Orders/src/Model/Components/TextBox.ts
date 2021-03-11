import {BaseModel} from '../../Common/BaseModel';

type propsTypes = {
  id: string;
  value?: string;
  placeholder?: string;
  style?: string;
  secureTextEntry?: boolean;
  onChangeText?: (textBox: TextBox, text: string) => void;
  isValid?: boolean;
  onFocus?: (textBox: TextBox) => void;
  onBlur?: (textBox: TextBox) => void;
  onEndEditing?: (textBox: TextBox) => void;
  autoFocus?: boolean;
  autoCorrect?: boolean;
  multiline?: boolean;
  maxLength?: number;
  keyboardType?: string;
  editable?: boolean;
};

class TextBox extends BaseModel {
  private _model: propsTypes;
  private _value: string;

  constructor(model: propsTypes) {
    super(model.id);
    this._model = model;
    this._value = this.value;
  }
  set autoFocus(value) {
    this._model.autoFocus = value;
  }
  set maxLength(value) {
    this._model.maxLength = value;
  }
  get autoFocus() {
    return this._model.autoFocus;
  }
  set editable(value) {
    this._model.editable = value;
    this.modified = true;
    this.forceUpdate();
  }
  get editable() {
    return this._model.editable;
  }
  get multiline() {
    return this._model.multiline;
  }
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
    this.forceUpdate();
  }
  /*
    comment
    * */
  get placeholder() {
    return this._model.placeholder;
  }
  get maxLength() {
    return this._model.maxLength;
  }
  get secureTextEntry() {
    return this._model.secureTextEntry;
  }
  set secureTextEntry(value) {
    this._model.secureTextEntry = value;
  }
  get style() {
    return this._model.style;
  }
  set style(value) {
    this._model.style = value;
  }
  get isValid() {
    return this._model.isValid;
  }
  set isValid(value) {
    this._model.isValid = value;
  }
  get autoCorrect() {
    return this._model.autoCorrect;
  }
  get keyboardType() {
    return this._model.keyboardType;
  }
  update(isValid: boolean, style: string): boolean {
    if (this.isValid !== isValid || this.style !== style) {
      this.style = style;
      this.isValid = isValid;
      this.modified = true;
      this.forceUpdate();
      return true;
    }
    return false;
  }
  onChangeText(text: string) {
    this.value = text;
    if (typeof this._model.onChangeText !== 'undefined') {
      this._model.onChangeText(this, text);
    }
  }
  onFocus() {
    if (typeof this._model.onFocus !== 'undefined') {
      this._model.onFocus(this);
    }
  }
  onBlur() {
    if (typeof this._model.onBlur !== 'undefined') {
      this._model.onBlur(this);
    }
  }
  onEndEditing() {
    if (typeof this._model.onEndEditing !== 'undefined') {
      this._model.onEndEditing(this);
    }
  }
  clearTextInput() {
    this.value = '';
    this.modified = true;
    this.forceUpdate();
  }
}

export {TextBox};
