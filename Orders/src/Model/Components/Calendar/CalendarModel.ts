import {BaseModel} from '../../../Common/BaseModel';
import moment from 'moment';
import {CounterModel} from "../../CounterModel";

type calendarProps = {
  id: string;
  calendarText: string;
  range: boolean;
  onDateChange: (calendar: CalendarModel) => void;
};

class CalendarModel extends BaseModel {
  private _model: calendarProps;
  private _date: any;
  private _startDate: any;
  private _endDate: any;
  private _calendar: any;
  private _focus: 'startDate' | 'endDate';
  private _isVisible: boolean;
  private _range: boolean;
  private _counterModel: CounterModel;

  constructor(model: calendarProps) {
    super(model.id);
    this._model = model;
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onCalendarDayPress = this.onCalendarDayPress.bind(this);
    this.makeCounterItems = this.makeCounterItems.bind(this);
    this._counterModel = new CounterModel({
      id: this._model.id,
      counter: 0
    });
    this._date = null
    this._startDate = moment(new Date());
    this._endDate = moment(new Date());
    this._focus = 'startDate';
    this._isVisible = false;
    this._range = model.range ? model.range : false;
  }

  onDatesChange(date: {startDate; endDate; focusedInput}) {
    this._focus = date.focusedInput;
    this._startDate = date.startDate;
    this._endDate = date.endDate;
    this.forceUpdate();
    this._model.onDateChange(this);
  }
  get counterModel() {
    return this._counterModel;
  }
  set counterModel(value) {
    // @ts-ignore
    this._counterModel.counter = value;
    this.modified = true;
    this.forceUpdate();
  }

  onDateChange(date) {
    console.log('dateChage1', date);
    console.log('dateChage1', this._date);
    if(this._date!==null && date.isSame(this._date)) {
      this._date = null
      this.forceUpdate()
      this._model.onDateChange(this)
      return
    }
    this._date = date;
    this.forceUpdate();
    this._model.onDateChange(this);
  }

  onCalendarDayPress({...rest}) {
    // console.log('rest', rest);
    if (this._range) {
      this.onDatesChange(rest);
    } else {
      this.onDateChange(rest.date);
    }
  }

  get calendar() {
    return this._calendar;
  }

  set calendar(value) {
    this._calendar = value;
  }

  get date() {
    return this._date;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get focus() {
    return this._focus;
  }

  get isVisible() {
    return this._isVisible;
  }

  get calendarText() {
    return this._model.calendarText;
  }

  get range() {
    return this._range;
  }

  show() {
    if (!this._isVisible) {
      this._isVisible = true;
      this.forceUpdate();
    }
  }

  hide() {
    if (this._isVisible) {
      this._isVisible = false;
      this.forceUpdate();
    }
  }

  toggle() {
    this._isVisible = !this._isVisible;
    this.forceUpdate();
  }

  get selectedDate() {
    if(this._date ===null){
      return ''
    }
    return this._range
      ? `${this._startDate.format('DD.MM.YYYY')} ${this._endDate.format(
          'DD.MM.YYYY',
        )}`
      : `${this._date.format('DD.MM.YYYY')}`;
  }

  get counterItems(){
    return this.counterModel
  }
  makeCounterItems(value:object){
    this._counterModel.items = value
    this.counterModel.modified = true
    this.forceUpdate()
  }
}

export {CalendarModel};
