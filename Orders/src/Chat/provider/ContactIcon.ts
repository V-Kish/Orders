import { deleteEmojiInString } from '../../Common/textParse';
import {MultiBase} from './Base';

import {IconHelper} from './ChatList/HelperIcon';

import {ContactIsOnline} from './ContactIsOnline';
import {store} from './Store';

type contactIconProps = {
  id: string;
  name: string;
  photo: string;
  isPublic: boolean;
  contactId: number;
  fullName?: boolean;
  isOnline?: ContactIsOnline;
};

class ContactIcon extends MultiBase {
  _firstCharacter: string;
  _name: string;
  _colorScheme: object;
  _photo: string;
  _hasPhoto: boolean;
  _isOnline: ContactIsOnline;
  _isPublic: boolean;
  _fullName: boolean;
  _version: number;

  constructor({
    id,
    name,
    photo,
    isPublic,
    contactId,
    isOnline,
    fullName,
  }: contactIconProps) {
    super(id);
    const hasPhoto = IconHelper.hasPhoto(photo);
    this._name = name;
    this._fullName = fullName ? fullName : false;
    this._version = 1;
    this.updatePhoto = this.updatePhoto.bind(this);
    this._firstCharacter = this.character();
    this._colorScheme = !hasPhoto
      ? IconHelper.getColor(this.firstCharacter)
      : {};
    this._photo = hasPhoto ? IconHelper.getUri(photo) : '';
    this._hasPhoto = hasPhoto;
    this._isOnline = isPublic
      ? new ContactIsOnline({id: -1, status: true})
      : !isOnline
      ? store().contactsItems.getOrAdd(contactId).isOnline
      : isOnline;
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
    this.modified = true;
    this.forceUpdate();
  }

  get firstCharacter() {
    return this._firstCharacter;
  }

  set firstCharacter(value) {
    this._firstCharacter = value;
  }

  get isOnline() {
    return this._isOnline;
  }

  set isOnline(isOnline) {
    this._isOnline = isOnline;
  }
  character() {
    let firstCharacter = 'U';
    if (typeof this.name !== 'undefined' && this.name.length >= 1) {
      let name = this.name.toString();
      const newName = deleteEmojiInString(name);
      try {
        const characters = newName.split(' ');
        if (characters.length > 1) {
          firstCharacter = characters[0].charAt(0) + characters[1].charAt(0);
        } else {
          firstCharacter = newName.charAt(0);
        }
      } catch (e) {
        console.log('character Ex', e);
      }
      if (this._fullName) {
        firstCharacter = newName;
      }
    }
    if (firstCharacter === '') {
      firstCharacter = 'U';
    }
    return firstCharacter;
  }

  update(model: any) {
    if (
      this.photo !==
      (IconHelper.hasPhoto(this.photo) ? IconHelper.getUri(this.photo) : false)
    ) {
      // console.log('iconModel', model)
      // console.log('iconModel photo', this.photo)
      this._hasPhoto =
        model.photo === null ? false : IconHelper.hasPhoto(model.photo);
      // console.log('photo version', this._version)
      this.photo = IconHelper.hasPhoto(model.photo)
        ? IconHelper.getUri(model.photo)
        : '';
      this.name = model.name;
      this.firstCharacter = this.character();
      this.colorScheme = IconHelper.getColor(this.character());
      this.modified = true;
      this.forceUpdate();
    }
  }
}

export {ContactIcon};
