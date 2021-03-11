import {BaseModel} from '../../../Common/BaseModel';

export type screenStepProps = {
  id: string;
  isVisible?: boolean;
  name?:string;
  historyProtect?: boolean;
};

class ScreenStep extends BaseModel {
  private _model: screenStepProps
  private _historyProtect: boolean;
  private _isVisible: boolean;
  constructor(_model: screenStepProps) {
    super(_model.id);
    this._model = _model
    this._historyProtect = _model.historyProtect || false ;
    this._isVisible = _model.isVisible ? _model.isVisible : false;
  }

  get name(){
    return this._model.name
  }

  get isVisible() {
    return this._isVisible;
  }
  set isVisible(value) {
    if(this._isVisible!==value){
      this._isVisible = value;
      this.forceUpdate();
    }
  }
  get historyProtect(){
    return this._historyProtect
  }
}

export {ScreenStep};
