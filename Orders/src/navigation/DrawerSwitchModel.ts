import {BaseModel} from '../Common/BaseModel';
import {ChooseDrawerModel} from './ChooseDrawerModel';
import { CounterModel } from '../Model/CounterModel';


type DrawerSwitchTypes = {
  id: string;
  counterModel: CounterModel;
};

class DrawerSwitchModel extends BaseModel {
  private _navigationRef: any;
  private _chooseDrawer: ChooseDrawerModel;
  constructor(model: DrawerSwitchTypes) {
    super(model.id);
    this._navigationRef = null;
    this._chooseDrawer = new ChooseDrawerModel({
      id: 'ChooseDrawerModel',
      counterModel: model.counterModel,
    });
  }
  get navigationRef() {
    return this._navigationRef;
  }
  set navigationRef(value) {
    if (this._navigationRef === null) {
      this._navigationRef = value;
    }
  }
  get chooseDrawer() {
    return this._chooseDrawer;
  }
  // ховати дровер при запуску апки
}

// @ts-ignore
export {DrawerSwitchModel};
