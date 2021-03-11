import {AlertModel} from '../Models/Alert/AlertModel';
import {Button} from '../Models/Components/Button';
import {AdminControllModel} from '../Models/Shared/AdminControll';
import {DatePickerModel} from '../Models/Shared/DatePickerModel';
import {SharedModel} from '../Models/Shared/SharedModel';
import {SearchModal} from "../Models/GlobalSearch/SearchModal";
import {Urler} from "../Models/Components/Urler/Urler";

class SharedController {
  private readonly _sharedModel: SharedModel;
  private readonly _adminControllModel: AdminControllModel;
  private readonly _datePicker: DatePickerModel;
  private readonly _reminderAlert: AlertModel;
  private readonly _searchModal: SearchModal;
  private readonly _urler: Urler;
  constructor() {
    this._sharedModel = new SharedModel('sharedModel');
    this._adminControllModel = new AdminControllModel('adminControll');
    this._datePicker = new DatePickerModel('DatePickerModel');
    this._urler = new Urler({id: 'globalUrler', onPress: ()=>{}});
    this.hideModal = this.hideModal.bind(this);
    this._reminderAlert = new AlertModel({
      id: '_reminderAlert',
      title: '',
      date: ' ',
      message: '',
      buttons: [
        new Button({
          id: 'understandBtn',
          title: 'Зрозуміло',
          style: 'reminderBtnStyle',
          onPress:this.hideModal,
        }),
      ],
    });
    this._searchModal = new SearchModal({id: 'searchModal'});
  }
  get urler(){
    return this._urler
  }
  get sharedModel() {
    return this._sharedModel;
  }
  hideModal() {
    this._reminderAlert.close();
  }

  get adminControll() {
    return this._adminControllModel;
  }
  get reminderAlert() {
    return this._reminderAlert;
  }

  get datePicker() {
    return this._datePicker;
  }
  get searchModal(){
    return this._searchModal;
  }
}

export {SharedController};
