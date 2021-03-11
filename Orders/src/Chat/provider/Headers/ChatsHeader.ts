import {Base} from '../Base';
import {ContactIcon} from '../ContactIcon';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {currentUser} from '../../../Core/CurrentUser';
import {Button} from '../../../Models/Components/Button';
import {ICONS} from '../../../constants/icons';
import {navigator} from '../../../Core/Navigator';

class ChatsHeader extends Base {
  private _contactIcon: ContactIcon;
  private _backBtn: Button;
  constructor(id: string) {
    super(id);
    this._contactIcon = null;
    this.backBtnPress = this.backBtnPress.bind(this);
    this._backBtn = new Button({
      id: '_backBtn',
      title: 'Назад',
      icon: ICONS.arrowLeftBlue,
      style: 'chatBtnBackStyles',
      onPress: this.backBtnPress,
    });
  }

  init() {
    this._contactIcon = currentUser().contactIcon;
  }
  get height() {
    return hp(72);
  }
  update() {
    this.init();
    this._contactIcon.modified = true;
    this.forceUpdate();
  }

  get contactIcon() {
    return this._contactIcon;
  }
  // go back
  get backBtn() {
    return this._backBtn;
  }
  async backBtnPress() {
    navigator().toGoBack();
  }
}

export {ChatsHeader};
