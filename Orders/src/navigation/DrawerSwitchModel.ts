import {BaseModel} from '../Common/BaseModel';
import {ChooseDrawerModel} from './ChooseDrawerModel';
import {CounterModel} from '../Models/CounterModel';
import {navigator} from '../Core/Navigator';
import {controllers} from "../Controllers/Controllers";

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
  // settings drawer
  // get swipeEnabled() {
  //   return this._swipeEnabled;
  // }
  // set swipeEnabled(value) {
  //   if (this.swipeEnabled !== navigator().navigation.getCurrentOptions().swipeEnabled){
  //     this._swipeEnabled = navigator().navigation.getCurrentOptions().swipeEnabled;
  //     controllers().drawerSwitch.chooseDrawer.modified = true;
  //     this.forceUpdate()
  //   }
  //   // this._navigationRef.setOptions({
  //   //   swipeEnabled: navigator().navigation.getCurrentOptions().gestureEnabled,
  //   // });
  // }
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
