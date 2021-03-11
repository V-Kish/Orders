import {BaseModel} from '../../../Common/BaseModel';

type SwitchButtonTypes = {
  id: string;
  textDescriptions: Array<string>;
  onValueChangeSwitch: () => void;
  style?:string;
};

class SwitchButtonModel extends BaseModel {
  private _stateSwitch: boolean;
  private _textDescriptions: Array<string>;
  private _text: string;
  private _model: SwitchButtonTypes;
  private _onValueChange: () => void;

  constructor(_model: SwitchButtonTypes) {
    super(_model.id);
    this._model = _model;
    this.onValueChange = this.onValueChange.bind(this);
    this._stateSwitch = false;
    this._textDescriptions = _model.textDescriptions;
    this._text = this._textDescriptions[0];
    this._onValueChange = _model.onValueChangeSwitch;
    this.textDescription = this.textDescription.bind(this);
  }

  get style(){
    return this._model.style
  }

  get stateSwitch() {
    return this._stateSwitch;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  textDescription(index = 0) {
    this._text = this._textDescriptions[index];
  }

  set stateSwitch(value) {
    if (value !== this._stateSwitch) {
      if (value) {
        this.textDescription(1);
      } else {
        this.textDescription(0);
      }
      this._stateSwitch = value;
      this.modified = true;
      this.forceUpdate();
    }
  }

  async onValueChange() {
    this._onValueChange(this);
  }
}

export {SwitchButtonModel};
