import {BaseModel} from '../../Common/BaseModel';


type mainNavigation = {
  id: string | number;
  isAuthPassed?:
    | 'AuthStack'
    | 'ConfirmOssbStack'
    | 'MainStack'
    | 'OsbbAdminStack';
};

class MainNavigation extends BaseModel {
  private _model: mainNavigation;
  constructor(model: mainNavigation) {
    // @ts-ignore
    super(model.id);
    this._model = {...model, isAuthPassed: 'AuthStack'};
  }

  get authPassed() {
    return this._model.isAuthPassed;
  }

  set authPassed(value) {
    this._model.isAuthPassed = value;
  }

  update() {
    this.modified = true;
    this.forceUpdate();
  }
}
export {MainNavigation};
