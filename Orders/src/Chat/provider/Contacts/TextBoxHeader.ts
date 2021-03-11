import { Base } from '../Base';

type propsTypes = {
  id: string,
  value: string,
  placeholder: string,
  style: string,
  onChangeText?: (text: string) => void,
  // onFocusAndBlur?: (textBox: TextBox) => void,
};

class TextBoxHeader extends Base {

  private _model: propsTypes;

  constructor(model: propsTypes) {
    super(model.id);
    this._model = model;
  }
   clearForm(){
    this.ref.clear();
    this.ref.blur();
  }
  get value(): string {
    if (this.ref === null) {
      return '';
    }
    return this.ref._lastNativeText;
  }
  /*
  comment
  * */
  get placeholder() {
    return   this._model.placeholder;
  }

  get style() {
    return  this._model.style;
  }
  set style(value) {
    this._model.style = value;
  }

  onChangeText(text: string) {
    if (typeof this._model.onChangeText !== 'undefined') {
      this._model.onChangeText(text);
    }
  }
}

export { TextBoxHeader };
