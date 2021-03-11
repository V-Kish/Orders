import {MultiBase} from '../../../Common/BaseModel';
import {RadioInput, radioInputModel} from './RadioInput';

type radioFormModel = {
  id: string;
  inputs: any;
  formType?: 'checkbox' | undefined;
  onSelected?: (item: RadioInput) => void;
  autoSelected?: boolean;
  style?: string;
  defaultColor?: string;
};

class RadioForm extends MultiBase {
  private _model: radioFormModel;
  private _radioForm: Array<RadioInput>;
  private _inputs: any;
  private _disabled: boolean;
  private _formType: 'checkbox' | undefined;
  private _autoSelected: boolean;
  private _isVisible: boolean;
  constructor(_model: radioFormModel) {
    super(_model.id);
    this._model = _model;
    this.onSelectInput = this.onSelectInput.bind(this);
    this.changeInputs = this.changeInputs.bind(this);
    this.getInput = this.getInput.bind(this);
    this._radioForm = new Array();
    this._disabled = false;
    this._isVisible = true;
    this._inputs = _model.inputs ? _model.inputs : [];
    this._formType = _model.formType ? _model.formType : undefined;
    this._autoSelected =
      _model.autoSelected !== undefined ? _model.autoSelected : true;
    this.initForm();
  }

  initForm() {
    this._radioForm = [];
    this._inputs.forEach((element, index) => {
      const selected = this._autoSelected ? index === 0 : false;
      const formBox = new RadioInput({
        id: `formBox_${index}`,
        onSelect: this.onSelectInput,
        selected,
        style: this._model.style,
        defaultColor: this._model.defaultColor,
        ...element,
      });

      this._radioForm.push(formBox);
    });
  }

  updateForm(updatesArr: Array<radioInputModel>) {
    if (updatesArr === undefined) {
      return;
    }
    updatesArr.forEach((radioInput) => {
      const item = this._radioForm.find((inp) => inp.name == radioInput.name);
      if (item !== undefined) {
        item.description =
          radioInput.description !== undefined ? radioInput.description : '';
        item.title = radioInput.title;
        item.selected = radioInput.selected;
        item.withVisualScale = radioInput.withVisualScale;
        item.percent = radioInput.percent;
        item.forceUpdate();
      }
    });
  }

  onSelectInput(input: RadioInput) {
    console.log('onSelectInput disabled', this._disabled);
    if (this._disabled) {
      return;
    }
    if (this._formType === 'checkbox') {
      input.selected = !input.selected;
      try {
        if (this._model.onSelected !== undefined) {
          this._model.onSelected(input);
        }
      } catch (e) {}
    } else {
      const selected = this._radioForm.find((inp) => inp.selected === true);
      if (input === selected) {
        return;
      }
      if (selected) {
        selected.selected = false;
      }
      input.selected = true;
      try {
        if (this._model.onSelected !== undefined) {
          this._model.onSelected(input);
        }
      } catch (e) {}
    }
    // const selected = this._radioForm.find((inp) => inp.selected === true);
    // if (input === selected) {
    //   if (this._formType === 'checkbox') {
    //     selected.selected = false;
    //     try{
    //       if(this._model.onSelected !== undefined) {
    //         this._model.onSelected(selected);
    //       }
    //     }catch (e) {
    //
    //     }
    //   }
    //   return;
    // }
    // if (selected && this._formType !== 'checkbox') {
    //   selected.selected = false;
    // }
    // input.selected = true;
    // try{
    //   if(this._model.onSelected !== undefined) {
    //     this._model.onSelected(input);
    //   }
    // }catch (e) {
    //
    // }
  }

  chooseInputByName(name: string) {
    const choosed = this._radioForm.find((i) => i.name == name);
    if (choosed !== undefined) {
      this.onSelectInput(choosed);
    }
  }
  chooseInputByIndex(index: number){
    // перевірка чи є стільки елементів у масиві як переданий індекс
    if(this._radioForm.length < index+1){
      return
    }
    const choosed = this._radioForm[index]
    if(choosed!==undefined){
      this.onSelectInput(choosed)
    }
  }
  getInput(name: string): RadioInput {
    return this._radioForm.find((i) => i.name === name) || new RadioInput();
  }
  clearForm() {
    this._radioForm = new Array();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  get radioForm() {
    return this._radioForm;
  }

  set inputs(value: any) {
    this._inputs = value;
  }

  get inputs() {
    return this._inputs;
  }

  get selectedInputs() {
    return this._radioForm.map((e) => {
      return {
        name: e.name,
        value: e.selected,
      };
    });
  }
  changeInputs(value) {
    this._radioForm.forEach((item) => {
      const selectedItem = value.find((element) => element.name === item.name);
      item.selected = selectedItem.value;
      item.modified = true;
    });
    this.forceUpdate();
  }
  getInputSelected(name: string) {
    const input = this._radioForm.find((e) => e.name === name);
    if (input) {
      return input.selected;
    } else {
      return false;
    }
  }
  get selectedInput() {
    return this._radioForm.find((i) => i.selected);
  }
  set isVisible(value) {
    this._isVisible = value;
    this.modified = true;
    // this.forceUpdate();
  }
  get isVisible() {
    return this._isVisible;
  }
  get selectedInputBoolean() {
    const find = this._radioForm.find((i) => i.selected);
    return typeof find !== 'undefined';
  }
}

export {RadioForm};
