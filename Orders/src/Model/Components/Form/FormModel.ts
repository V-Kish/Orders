import {BaseModel} from '../../../Common/BaseModel';
import {ICONS} from '../../../constants/icons';
import {FormTextBox} from '../FormTextBox';

type formModel = {
  onChangeText?: () => void;
  id: string;
  inputs: any;
  style?: string;
  colCount?: number;
};

class FormModel extends BaseModel {
  private _model: formModel;
  private _formInputBoxes: Array<FormTextBox>;
  private _inputs: Array<FormTextBox>;
  private _formValues: Array<FormTextBox>;
  private _colCount: number;
  private onChangeText: any;

  constructor(_model: formModel) {
    super(_model.id);
    this._model = _model;
    this.addItem = this.addItem.bind(this);
    this.initItem = this.initItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.initForm = this.initForm.bind(this);
    this.isFormFiled = this.isFormFiled.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.onChangeInputText = this.onChangeInputText.bind(this);
    this.onChangeText = _model.onChangeText ? _model.onChangeText : undefined;
    this._colCount = _model.colCount ? _model.colCount : 1;
    this._inputs = _model.inputs;
    this._formInputBoxes = new Array();
    this._formValues = new Array();
    this.initForm();
  }

  initInputs(inputs: Array<any>) {
    this._formInputBoxes = new Array();
    this._inputs = inputs;
    this.initForm();
    this.modified = true;
  }

  addItem(item) {
    this.initItem(item);
    this.forceUpdate();
  }
  onChangeInputText(formBox: FormTextBox) {
    const box = this._formValues.find((b) => b.id === formBox.id);
    if (box === undefined) {
      this._formValues.push(formBox);
    } else {
      box.value = formBox.value;
    }
    if (typeof this.onChangeText !== 'undefined') {
      this.onChangeText();
    }
  }

  initForm() {
    this._inputs.forEach((element, index) => {
      this.initItem(element, index);
    });
  }

  initItem(element, index = this.formValues.length) {
    const returnKeyboardType =
      index < this._inputs.length - 1 ? 'next' : 'default';

    const additional = element.multiLine
      ? {
          returnKeyType: 'default',
          blurIcon: true,
        }
      : {};
    const formBox = new FormTextBox({
      style: this._model.style,
      id: `formBox${index}`,
      onChangeText: this.onChangeInputText,
      title: element.title,
      returnKeyType: returnKeyboardType,
      ...additional,
      ...element,
    });
    this._formValues.push(formBox);
    if (this._formInputBoxes.length > 0) {
      const onSubmitEdititng = () => {
        try {
          formBox.focus();
        } catch (e) {
          console.log('focus ex', e);
        }
      };
      const lastInputBox = this._formInputBoxes[this.formInputBoxes.length - 1];
      if (lastInputBox.inputType === undefined ||
        lastInputBox.inputType !== 'select'
      ) {
        if(lastInputBox.multiLine === false) {
          lastInputBox.setOnSubmitEdititng(onSubmitEdititng);
        } else {
          console.log('lastInputBox', lastInputBox)
        }
      } else {
        // console.log('select input', lastInputBox);
      }
    }
    this._formInputBoxes.push(formBox);
  }

  removeItem(element) {
    const index = this._formValues.findIndex((item) => item.id == element.id);
    if (index !== -1) {
      this._formInputBoxes.splice(index, 1);
      this._inputs.splice(index, 1);
      this.modified = true;
      this.forceUpdate();
    }
  }


  isFormFiled() {
    let filed = true;
    this._formValues.forEach((formBox) => {
      if (!formBox.isFiled()) {
        filed = false;
        return false;
      }
    });
    return filed;
  }

  get formInputBoxes() {
    return this._formInputBoxes;
  }

  get formValues() {
    return this._formValues;
  }

  getInput(value: string | null = null): FormTextBox {
    if (value === null) {
      return {value: ''};
    }
    return this._formValues.find((e) => e.name === value);
  }

  getInputValue(value: string | null = null): string {
    if (value === null) {
      return '';
    }
    const input = this._formValues.find((e) => e.name === value);
    if (input !== undefined) {
      return input.value;
    } else {
      return '';
    }
  }

  setInputParams(name: string, parameter: string, value: any) {
    const input = this.findInput(name);
    if (input && input[parameter]) {
      input[parameter] = value;
    }
  }

  fillInput(name: string, value: any) {
    const input = this.findInput(name);
    if (input) {
      input.value = value;
    }
  }
  changeTitle(name: string, value: any) {
    const input = this.findInput(name);
    if (input) {
      input.title = value;
    }
  }
  findInput(name: string) {
    const input = this._formValues.find((e) => e.name === name);
    if (input === undefined) {
      console.log(`input ${name} doesn't exist`);
    }
    return input;
  }

  clearForm() {
    this._formInputBoxes.forEach((e) => {
      // e.value = e.defaultValue;
      e.clear()
    });
  }

  get colCount() {
    return this._colCount;
  }
}

export {FormModel};
