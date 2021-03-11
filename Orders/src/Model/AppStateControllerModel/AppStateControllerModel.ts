import {BaseModel} from '../../Common/BaseModel';
import {navigator} from '../../Core/Navigator';

class AppStateControllerModel extends BaseModel {
  constructor(model: {id: string}) {
    super(model.id);
    this.handleBackground = this.handleBackground.bind(this);
  }

 async handleBackground(state: string) {
   await navigator().handleBackground(state);
  }
}
export {AppStateControllerModel};
