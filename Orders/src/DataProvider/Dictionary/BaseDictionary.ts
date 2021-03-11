import {dictionaryBaseResponse, IItemType} from '../../DataTypes/BaseTypes';

class BaseDictionary<T extends IItemType> {
  private _id: string;
  private _items: Array<T>;
  private _expiredDate: Date;
  static minDate = new Date(2020, 11, 1);

  static addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }

  constructor(id: string) {
    this._id = id;
    this._items = new Array<T>();
    this._expiredDate = BaseDictionary.minDate;
  }

  async query({...params} = {}): Promise<dictionaryBaseResponse<T>> {
    throw 'error';
  }

  clearExpiredDate(){
    this._expiredDate = new Date(new Date().getTime() - 100)
  }

  async loadData({...params} = {}): Promise<Array<T>> {
    if (this._expiredDate > new Date()) {
      return this._items;
    }
    try {
      const response = await this.query({...params});
      this._expiredDate = BaseDictionary.addMinutes(new Date(), 20);
      this._items = response.data.Items !== undefined ? response.data.Items : response.data;
    } catch (e) {}
    return this._items;
  }

  getItem(id: number) {
    return this.items.find((item) => item.id === id);
  }

  getItemByName(name: string) {
    return this.items.find((item) => item.name === name);
  }

  get items() {
    return this._items;
  }
}

export {BaseDictionary};
