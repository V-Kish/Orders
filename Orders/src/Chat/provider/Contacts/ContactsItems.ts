import {RawContactItem, rawContactItemProps, ContactItem} from './ContactItem';
import {fetchData} from '../../../Common/fetchData';
import {currentUser} from '../../../Core/CurrentUser';
import {ContactsDataProvider} from '../../DataProvider/ContactsDataProvider';
import {ContactIsOnline} from '../ContactIsOnline';
import {ContactIcon} from '../ContactIcon';
import {IconHelper} from '../ChatList/HelperIcon';
import {store} from '../Store';

class ContactsItems {
  private _storage: Map<number, RawContactItem>;
  private _lastUpdatedTimestamp: number;

  constructor() {
    this._storage = new Map<number, RawContactItem>();
    this._lastUpdatedTimestamp = 0;
  }

  get storage() {
    return this._storage;
  }

  get(id: number): RawContactItem {
    return this._storage.get(id) || null;
  }

  createContactItem(id: number) {
    const contact = this.getOrAdd(id);
    return ContactItem.create(contact);
  }

   getOrAdd(id: number) {
    let contact = this.get(id);
    if (contact === null) {
      contact = new RawContactItem({
        id: id,
        hash: '',
        name: '',
        photo: 'none',
        status: false,
      });
      this._storage.set(contact.id, contact);
    }
    return contact;
  }

  set(model: rawContactItemProps) {
    let contact = this.get(model.id);
    if (contact === null) {
      contact = new RawContactItem(model);
      this._storage.set(contact.id, contact);
    } else {
      contact.set(model);
    }
    return contact;
  }

  refresh(reload: boolean = false): Promise<boolean> {
    if (!reload) {
      reload = this.storage.size === 0;
    }
    return new Promise((resolve, reject) => {
      if (
        !reload &&
        this.storage.size !== 0 &&
        new Date().getTime() - this._lastUpdatedTimestamp < 60000
      ) {
        resolve(false);
      } else {
        try {
          this.load()
            .then(
              (items) => {
                if (items.length !== 0) {
                  this._lastUpdatedTimestamp = new Date().getTime();
                }
                items.forEach((item) => {
                  this.set(item);
                });
                resolve(true);
              },
              (error) => {
                console.log('ContactsItems.refresh error => ', error);
                reject();
              },
            )
            .catch((error) => {
              console.log('ContactsItems.refresh error => ', error);
              reject();
            });
        } catch (e) {
          console.log('preloader refresh error', e);
        }
      }
    });
  }

  load(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      ContactsDataProvider.LoadContacts()
        .then(
          (items) => {
            resolve(items);
          },
          (error) => {
            reject(error);
          },
        )
        .catch((error) => {
          reject(error);
        });
    });
  }

  async loadContactsStat() {
    try {
      const response = await fetchData(
        `${currentUser().userToken}/${
          currentUser().currentOsbb?.hash
        }/contacts/usersStat`,
        'get',
        null,
        null,
        null,
        true,
      );
      // console.log('loadContactsStat', response.result);
      if (response.result) {
        response.result.forEach((item) => {
          this.setIsOnline(item);
        });
      }
    } catch (ex) {
      console.log('ContactsItems.loadContactsStat', ex);
    }
  }

  setIsOnline(contactInfo) {
    const contact = this.getOrAdd(contactInfo.id);
    if (contact.isOnline === null) {
      contact.isOnline = new ContactIsOnline({
        id: contact.id,
        status: contactInfo.isOnline,
        date: contactInfo.isOnlineDate,
      });
    }
    try {
      contact.isOnline.update(
        {
          isOnline: contactInfo.isOnline,
          isOnlineDate: contactInfo.isOnlineDate,
        },
        true,
      );
    } catch (ex) {
      console.error(ex);
    }
  }

  setPhoto(id: number, hash: string) {
    const contact = this.getOrAdd(id);
    contact.icon.photo = IconHelper.getUri(hash);
    contact.icon.modified = true;
    contact.icon.forceUpdate();
  }
}

export {ContactsItems};
