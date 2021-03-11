
import {ApartmentsDictionary} from './ApartmentsDictionary';

class Dictionaries {

  private readonly _apartmentsDictionary: ApartmentsDictionary;

  constructor() {

    this._apartmentsDictionary = new ApartmentsDictionary(
      'apartmentsDictionary',
    );
  }

  get apartmentsDictionary(){
    return this._apartmentsDictionary
  }
}

export const dictionaries = new Dictionaries();
