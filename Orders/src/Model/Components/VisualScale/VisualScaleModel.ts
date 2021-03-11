import {BaseModel} from '../../../Common/BaseModel';

export type visualScaleType = {
  id: string;
  color: string;
  percent: number;
};

class VisualScaleModel extends BaseModel {
  private model: visualScaleType;

  constructor(_model: visualScaleType) {
    super(_model.id);
    this.model = _model;
  }

  get color() {
    return this.model.color;
  }

  get percent() {
    return this.model.percent;
  }
}

export {VisualScaleModel};
