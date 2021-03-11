import { MultiBase} from '../../Common/BaseModel';
import {CounterModel} from '../CounterModel';

type iconButtonProps = {
  id: string;
  icon: string;
  iconActive?: string;
  style?: string;
  onPress?: () => void;
  hidden?: boolean;
  isActive?: boolean;
  activeOpacity?: number;
  _counterModel?: CounterModel;
};

class IconButton extends MultiBase {
  private _model: iconButtonProps;
  private _counterModel: CounterModel;
  constructor(model: iconButtonProps) {
    super(model.id);
    this._model = model;
    this._counterModel = model._counterModel!==undefined ? model._counterModel : new CounterModel({id: `${this._model.id}_counter`, counter: 0});
    // console.log('newIconBtn', this._counterModel.id)
  }

  get icon() {
    return this._model.icon;
  }
  get iconActive() {
    return this._model.iconActive;
  }
  get activeOpacity() {
    return this._model.activeOpacity;
  }

  get style() {
    return this._model.style;
  }
  get hidden() {
    return this._model.hidden || false;
  }

  get isActive() {
    return this._model.isActive || false;
  }
  set isActive(value) {
    this._model.isActive = value;
    this.modified = true
  }

  onPress() {
    if (typeof this._model.onPress !== 'undefined') {
      this._model.onPress();
    }
  }

  updateIcon(icon: string, forceUpdate: boolean) {
    if (this._model.icon !== icon) {
      this._model.icon = icon;
      this._model.isActive = !this._model.isActive;
      this.modified = true;
      if (forceUpdate) {
        this.forceUpdate();
      }
    }
  }

  update(hidden: boolean, forceUpdate: boolean) {
    if (this.hidden !== hidden) {
      this._model.hidden = hidden;
      this.modified = true;
      if (forceUpdate) {
        this.forceUpdate();
      }
      return true;
    }
    return false;
  }

  get counterModel(){
    return this._counterModel
  }

  setCounter(value: number){
    if(this._counterModel.counter!== value){
      this._counterModel.counter = value
      this.modified = true
    }
  }
}

export {IconButton};
