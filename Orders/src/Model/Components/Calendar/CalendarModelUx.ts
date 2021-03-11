import {BaseModel} from '../../../Common/BaseModel';

type calendarProps = {
  id: string;
}
type yearProps = {
  months: Array<monthProps>;
  year: number;
}

type monthProps = {
  name: string;
  days: Array<dayProps>;
}

type dayProps = {
  date: Date;
  sevenIndex?: number;
  day?: number;
  events?: number;
  selected?: boolean;
  currentMonth?: boolean; 
}

class CalendarUx extends BaseModel {
  private _model: calendarProps;

  constructor(model: calendarProps) {
    super(model.id);
    this._model = model;
  }

  initYear(year: number){
    for (let i = 0; i < 12; i++) {
      // this.ca
    }
  }

  initMonth(date = new Date()): monthProps{
    let month:Array<dayProps> = new Array()
    for (let i = 0; i < this.getDaysInMonth(date.getMonth(),date.getFullYear()); i++) {
      month.push(this.initDay(i, date.getMonth(), date.getFullYear()))
    }
    return {
      days: month,
      name: this.getMonthName(month[0].date)
    }
  }

  initDay(i: number, month:number, year: number): dayProps {
    const date = new Date(year,month,i)
    return {
      date: date,
      sevenIndex: date.getDay()+1,
      day: date.getDate(),
      events: 0,
      selected: false,
      currentMonth: true
    }
  }

  getDaysInMonth(month:number,year:number) {
   return new Date(year, month, 0).getDate();
  };
  getMonthName(date = new Date()): string{
    const monthCount = date.getMonth()
    switch(monthCount){
      case 0: return "Січень";
      case 1: return "Лютий";
      case 2: return "Березень";
      case 3: return "Квітень";
      case 4: return "Травень";
      case 5: return "Червень";
      case 6: return "Липень";
      case 7: return "Серпень";
      case 8: return "Вересень";
      case 9: return "Жовтень";
      case 10: return "Листопад";
      case 11: return "Грудень";
      default: ""
    }
    return ""
  }
}

export {CalendarUx};
