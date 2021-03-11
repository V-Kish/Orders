import {BaseModel} from '../../Common/BaseModel';
import {Button} from '../Components/Button';
import {ICONS} from '../../constants/icons';
import {navigator} from '../../Core/Navigator';
import {Keyboard} from 'react-native';

type headerModel = {
  id: string;
};

class Header extends BaseModel {
  private _appName: string;
  private _drawerBtn: Button;
  constructor(model: headerModel) {
    super(model.id);
    this.onDrawerBtnPress = this.onDrawerBtnPress.bind(this);
    this._appName = 'OSBB.work';
    this._drawerBtn = new Button({
      id: 'drawerBtn',
      style: 'drawerIconStyle',
      onPress: ()=>{},
      // icon: ICONS.drawerIcon,
    });
  }

  get appName() {
    return this._appName;
  }

  onDrawerBtnPress() {
    Keyboard.dismiss();
    setTimeout(() => {
      navigator().toggleDrawer();
    }, 0);
  }

  get drawerBtn() {
    return this._drawerBtn;
  }
}

export {Header};
