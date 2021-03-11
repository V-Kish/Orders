import {IconHelper} from './HelperIcon';
import {BaseModel} from '../../../Common/BaseModel';

type contactIconProps = {
  id: string;
  name: string;
  photo: string | null;
};

class ContactIconModel extends BaseModel {
  _firstCharacter: string;
  _name: string;
  _colorScheme: object;
  _photo: string;
  _hasPhoto: boolean;

  constructor({id, name, photo}: contactIconProps) {
    super(id);
    const hasPhoto = IconHelper.hasPhoto(photo);
    this._name = name;
    this.updatePhoto = this.updatePhoto.bind(this);
    this._firstCharacter = this.character();
    this._colorScheme = !hasPhoto
      ? IconHelper.getColor(this.firstCharacter)
      : {};
    this._photo = hasPhoto ? IconHelper.getUri(photo) : '';
    this._hasPhoto = hasPhoto;
  }

  get photo() {
    return this._photo;
  }
  set photo(value) {
    this._photo = value;
  }
  updatePhoto(hash) {
    this._photo = IconHelper.getUri(hash);
    this.modified = true;
    this.forceUpdate();
  }
  get hasPhoto() {
    return this._hasPhoto;
  }
  get colorScheme() {
    return this._colorScheme;
  }
  set colorScheme(value) {
    this._colorScheme = value;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get firstCharacter() {
    return this._firstCharacter;
  }
  set firstCharacter(value) {
    this._firstCharacter = value;
  }

  character() {
    let firstCharacter = 'U';
    if (typeof this.name !== 'undefined' && this.name !==null && this.name.length >= 1) {
      let name = this.name.toString();
      firstCharacter = name.charAt(0);
    }
    return firstCharacter;
  }

  update(model) {
    if (
      this.photo !==
      (IconHelper.hasPhoto(this.photo) ? IconHelper.getUri(this.photo) : false)
    ) {
      this.photo = IconHelper.hasPhoto(this.photo)
        ? IconHelper.getUri(this.photo)
        : '';
      this.firstCharacter = this.character();
      this.colorScheme = IconHelper.getColor(this.character());
      this.modified = true;
      this.forceUpdate();
    }
  }
}

export {ContactIconModel};
