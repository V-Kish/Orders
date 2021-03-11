import {BaseModel} from '../Common/BaseModel';
import {Keyboard} from 'react-native';
import {navigator} from '../Core/Navigator';
import {DrawerAdminModel} from './DrawerAdminModel';
import {DrawerUserModel} from './DrawerUserModel';
import {currentUser} from '../Core/CurrentUser';
import {ContactIconModel} from '../Models/Components/UserIconModels/ContactIconModel';
import {controllers} from '../Controllers/Controllers';
import RNFS from 'react-native-fs';
import {loadData, UserDataProvider} from '../DataProvider/UserDataProvider';
import {bodyChangeAvatarTypes} from '../DataTypes/UserDataProviderTypes';
import {baseResponse} from '../DataTypes/BaseTypes';
import {store} from '../Chat/provider/Store';
import {ImagePickerModel} from '../Models/SelectedPhoto/ImagePickerModel';
import {SelectedPhotoModel} from '../Models/SelectedPhoto/SelectedPhotoModel';
import {CounterModel} from "../Models/CounterModel";
type chooseDrawerModel = {
  id: string;
  counterModel: CounterModel;
}
class ChooseDrawerModel extends BaseModel {
  private _isDrawerAdmin: boolean;
  private readonly _drawerAdmin: DrawerAdminModel;
  private readonly _drawerUser: DrawerUserModel;
  public imagePicker: ImagePickerModel;
  public filePicker: SelectedPhotoModel;
  private _isShowContent: boolean;
  constructor(model: chooseDrawerModel) {
    super(model.id);
    this.selectDrawerAdmin = this.selectDrawerAdmin.bind(this);
    this.selectDrawerUser = this.selectDrawerUser.bind(this);
    this.onDrawerBtnPress = this.onDrawerBtnPress.bind(this);
    this.imageToBase64 = this.imageToBase64.bind(this);
    this.pickPhoto = this.pickPhoto.bind(this);
    this._isDrawerAdmin = false;
    this._isShowContent = false;
    this._drawerAdmin = new DrawerAdminModel({
      id: 'DrawerAdminModel',
      onDrawerBtnPress: this.onDrawerBtnPress,
      counterModel: model.counterModel,
    });
    this._drawerUser = new DrawerUserModel({
      id: 'DrawerUserModel',
      onDrawerBtnPress: this.onDrawerBtnPress,
      counterModel: model.counterModel,
    });
    this.imagePicker = new ImagePickerModel({
      options: {
        title: 'Виберіть фото',
        cancelButtonTitle: 'Скасувати',
        takePhotoButtonTitle: 'Зробіть фото',
        chooseFromLibraryButtonTitle: 'Виберіть з галереї',
        customButtons: [],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      pickPhoto: this.pickPhoto,
      id: 'ImagePickerModel',
    });
    this.filePicker = new SelectedPhotoModel({
      pickFiles: () => {},
      pickPhoto: this.pickPhoto,
      id: 'ChoosePhotoModel_FilePicker',
    });
  }
  // settings drawer
  get isDrawerAdmin() {
    return this._isDrawerAdmin;
  }
  // change drawer container view
  set isDrawerAdmin(value: boolean) {
    if (this._isDrawerAdmin === value) {
      return;
    }
    this._isDrawerAdmin = value;
    this.modified = true;
    this.forceUpdate();
  }
  selectDrawerAdmin() {
    this.isDrawerAdmin = true;
    this._drawerAdmin.userPhoto = new ContactIconModel({
      id: 'newContactIconModel',
      name: currentUser().user.name,
      photo: null,
    });
    this._drawerAdmin.modified = true;
    this._drawerAdmin.forceUpdate();
  }
  selectDrawerUser() {
    this.isDrawerAdmin = false;
    this._drawerUser.userPhoto = new ContactIconModel({
      id: 'newContactIconModel',
      name: currentUser().user.name,
      photo: null,
    });
    this._drawerUser.modified = true;
    this._drawerUser.forceUpdate();
  }
  // open Drawer
  onDrawerBtnPress() {
    Keyboard.dismiss();
    setTimeout(() => {
      navigator().toggleDrawer();
    }, 0);
  }

  get drawerAdmin() {
    return this._drawerAdmin;
  }
  get drawerUser() {
    return this._drawerUser;
  }
  get imagePickerModel() {
    return this.imagePicker;
  }
  get isShowContent() {
    return this._isShowContent;
  }

  set isShowContent(value: boolean) {
    this._isShowContent = value;
  }
  async imageToBase64(file) {
    const base64 = await RNFS.readFile(file.uri, 'base64');
    return base64;
  }
  async changeUserAvatar(file, base64) {
    const body: bodyChangeAvatarTypes = {
      originalName: file.name,
      base64data: base64,
      osbbToken: currentUser().currentOsbb?.hash,
      comment: '',
    };
    console.log('body 1', body);
    const responseUserAvatar = await loadData<baseResponse<any>>(
      UserDataProvider.settingsAvatar,
      body,
    );
    console.log('responceUserAvatar', responseUserAvatar);
    if (responseUserAvatar.statusCode === 200) {
      // currentUser().contactIcon = new ContactIcon()
      const photoHash = responseUserAvatar.result.hash
      store().contactsItems.setPhoto(
        currentUser().userId,
        photoHash,
      );
      currentUser().contactIcon.forceUpdate();
    }
  }
  async pickPhoto() {
    const response = await UserDataProvider.getStorePermission();
    console.log('response', response);
    if (response == false) {
      this._drawerAdmin.loading = false;
      this._drawerUser.loading = false;
      return;
    }
    this._drawerAdmin.loading = true;
    this._drawerUser.loading = true;
    if (response) {
      this.filePicker.pick('image').then(async (file) => {
        console.log('file', file);
        if (!file) {
          this._drawerAdmin.loading = false;
          this._drawerUser.loading = false;
          return;
        }
        const responseBase64 = await this.imageToBase64(file[0]);
        await this.changeUserAvatar(file[0], responseBase64);
        this._drawerAdmin.loading = false;
        this._drawerUser.loading = false;
      });
    }
  }
}

export {ChooseDrawerModel};
