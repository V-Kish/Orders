import {MultiBase} from '../../../Common/BaseModel';
import {COLOR_SCHEME} from '../../../constants/colors';

export type radioInputModel = {
  id: string;
  title: string;
  selected: boolean;
  name: string;
  description?: string;
  disable?: boolean;
  defaultColor?: string;
  type?: 'checkbox' | 'radiobox';
  withVisualScale?: boolean;
  visible?: boolean;
  percent?: number;
  style: string;
  onSelect: (input: RadioInput) => void;
};

class RadioInput extends MultiBase {
  private _title: string;
  private _description: string;
  private _selected: boolean;
  private _onSelect: (input: RadioInput) => {};
  private _name: string;
  private _type: 'checkbox' | 'radiobox';
  private _withVisualScale?: boolean;
  private _percent?: number;
  private _style?: string;
  private _disable?: boolean | null;
  private _visible?: boolean | null;
  private _defaultColor?: string | null;

  constructor(_model: radioInputModel) {
    super(_model.id);
    this.onSelect = this.onSelect.bind(this);
    this.getColor = this.getColor.bind(this);
    this._title = _model.title ? _model.title : '';
    this._description = _model.description ? _model.description : '';
    this._visible = _model.visible ? _model.visible : true;
    this._type = _model.type !== undefined ? _model.type : 'checkbox';
    this._withVisualScale =
      _model.withVisualScale !== undefined ? _model.withVisualScale : false;
    this._percent =
      _model.percent !== undefined && !isNaN(_model.percent)
        ? _model.percent
        : 0;
    this._disable = _model.disable !== undefined ? _model.disable : null;
    this._defaultColor =
      _model.defaultColor !== undefined ? _model.defaultColor : null;
    this._selected = _model.selected !== undefined ? _model.selected : false;
    this._onSelect = _model.onSelect
      ? _model.onSelect
      : (input: RadioInput) => {};
    this._style = _model.style !== undefined ? _model.style : undefined;
    this._name = _model.name ? _model.name : '';
  }

  get name() {
    return this._name;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    if (value !== this._title) {
      this._title = value;
    }
  }

  getColor() {
    try {
      if (this._defaultColor !== null) {
        return this._defaultColor;
      }
      const colorIndex = +this.id.split('_')[1];
      if (COLOR_SCHEME.length < colorIndex) {
        const index =
          colorIndex -
          COLOR_SCHEME.length * Math.round(colorIndex / COLOR_SCHEME.length);
        return COLOR_SCHEME[index];
      } else {
        return COLOR_SCHEME[colorIndex];
      }
    } catch (e) {
      console.log('ex', e);
    }
    return COLOR_SCHEME[0];
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (value !== this._description) {
      this._description = value;
    }
  }

  get disable() {
    return this._disable;
  }

  set disable(value) {
    if (value !== this._disable) {
      this._disable = value;
    }
  }

  get withVisualScale() {
    return this._withVisualScale;
  }

  set withVisualScale(value) {
    if (value !== this._withVisualScale) {
      this._withVisualScale = value;
    }
  }

  get percent() {
    return this._percent;
  }

  set percent(value) {
    if (value !== this._percent) {
      this._percent = value;
    }
  }

  get selected() {
    return this._selected;
  }

  set selected(value: boolean) {
    if (value !== this._selected) {
      this._selected = value;
      this.forceUpdate();
    }
  }

  set type(value) {
    this._type = value;
  }

  get type() {
    return this._type;
  }
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
  }

  onSelect() {
    this._onSelect(this);
  }

  get style() {
    return this._style;
  }
}

export {RadioInput};
