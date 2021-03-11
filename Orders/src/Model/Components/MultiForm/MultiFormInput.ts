import {BaseModel} from '../../../Common/BaseModel';
import {MultiFormBox} from './MultiFormBox';

type multiFormInputModel = {
  id: string;
  count: number;
  editable?: boolean;
  onType?: (value: number) => void;
  onEndTyping?: () => void;
  style?: string;
};

class MultiFormInput extends BaseModel {
  private _formBoxes: Array<MultiFormBox>;
  private _count: number;
  private _value: string;
  private _hiddenInputRef: any;
  private _editable: boolean;
  private _onType: (value: string) => void;
  private _onEndTyping: () => void;
  private _style: string;

  constructor(_model: multiFormInputModel) {
    super(_model.id);
    this.clearForm = this.clearForm.bind(this);
    this.initMultiInput = this.initMultiInput.bind(this);
    this.onTypeListener = this.onTypeListener.bind(this);
    this.isFiled = this.isFiled.bind(this);
    this.boxPress = this.boxPress.bind(this);
    this.focus = this.focus.bind(this);
    this._formBoxes = new Array();
    this._count = _model.count;
    this._value = '';
    this._onType = _model.onType ? _model.onType : (value: string) => {};
    this._onEndTyping = _model.onEndTyping ? _model.onEndTyping : () => {};
    this._editable = _model.editable !== undefined ? _model.editable : true;
    this._style = _model.style !== undefined ? _model.style : undefined;
    this._hiddenInputRef = null;
    this.initMultiInput();
  }

  initMultiInput() {
    for (let i = 0; i < this._count; i++) {
      const element = new MultiFormBox({
        id: `multiBox${i}`,
        editable: this._editable,
        style: this._style,
        onPress: this.boxPress,
      });
      this._formBoxes.push(element);
    }
  }

  onTypeListener(value: string) {
    var numbers = /^[0-9]+$/;
    if (value.match(numbers) || value === '') {
      this._value = value;
      //on type from model
      this._onType(value);
      // if type end
      if (value.length === this._formBoxes.length) {
        this._onEndTyping();
      }
      this._formBoxes.forEach((box, index) => {
        const char = value[index] ? value[index] : '';
        this.changeOneBox(box, char);
      });
      this.forceUpdate();
    } else {
      this.forceUpdate();
    }
  }

  changeOneBox(box: MultiFormBox, char: string) {
    if (box.value === char) {
      return;
    }
    box.value = char;
  }

  boxPress() {
    // console.log('boxPress');
    this.focus();
  }

  get formBoxes() {
    return this._formBoxes;
  }

  get hiddenInputRef() {
    return this._hiddenInputRef;
  }
  set hiddenInputRef(value) {
    this._hiddenInputRef = value;
    console.log('boxFocus value',value);
    console.log('boxFocus this._hiddenInputRef',this._hiddenInputRef);
    this.modified = true;
  }

  focus() {
    console.log('boxFocus',this._hiddenInputRef);
    this._hiddenInputRef.focus();
  }

  get value() {
    return this._value;
  }
  set value(value) {
    this.onTypeListener(value);
  }

  get editable() {
    return this._editable;
  }
  set editable(value) {
    this._editable = value;
    this.forceUpdate();
  }
  clearForm() {
    this.value = '';
    this.modified = true;
    this.forceUpdate();
  }

  isFiled() {
    return this._value.length === this._count;
  }
}

export {MultiFormInput};
