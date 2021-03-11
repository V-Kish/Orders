import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {CounterView} from '../CounterView';
import {COLORS} from '../../../constants/colors';
import {dateTimeToDateString} from '../../../Common/dateParse';

const moment = extendMoment(Moment);

type DatesType = {
  range: boolean,
  date: ?moment,
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
  onDatesChange: (date: {
    date?: ?moment,
    startDate?: ?moment,
    endDate?: ?moment,
  }) => void,
  isDateBlocked: (date: moment) => boolean,
  onDisableClicked: (date: moment) => void,
  focusedMonth: ?moment,
};

type MonthType = {
  range: boolean,
  date: ?moment,
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
  currentDate: moment,
  focusedMonth: moment,
  onDatesChange: (date: {
    date?: ?moment,
    startDate?: ?moment,
    endDate?: ?moment,
  }) => void,
  isDateBlocked: (date: moment) => boolean,
  onDisableClicked: (date: moment) => void,
};

type WeekType = {
  range: boolean,
  date: ?moment,
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
  startOfWeek: moment,
  onDatesChange: (date: {
    date?: ?moment,
    startDate?: ?moment,
    endDate?: ?moment,
  }) => void,
  isDateBlocked: (date: moment) => boolean,
  onDisableClicked: (date: moment) => void,
};

const defaultStyles = StyleSheet.create({
  calendar: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: wp(10),
  },
  calendarContainer: {},
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(15),
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dayName: {
    flexGrow: 1,
    flexBasis: 1,
    textAlign: 'center',
    color: '#828282',
    fontWeight: '800',
    fontSize: wp(12),
  },
  day: {
    // backgroundColor: 'rgb(245, 245, 245)',
    margin: 1,
    // padding: 5,
    borderRadius: 10,
    width: wp(45),
    height: wp(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    flexGrow: 1,
    flexBasis: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(10),
  },
  dayBlocked: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
  daySelected: {
    backgroundColor: '#F2994A',
  },
  todayDate:{
    backgroundColor:COLORS.BORDER_BOTTOM_LINE
  },
  dayText: {
    color: 'rgb(0, 0, 0)',
    fontWeight: '600',
  },
  dayDisabledText: {
    color: 'gray',
    opacity: 0.5,
    fontWeight: '400',
  },
  daySelectedText: {
    color: 'rgb(252, 252, 252)',
  },
  previousMonthBox: {},
  nextMonthBox: {},
  currentMonthBox: {},
  previousMonthText: {
    color: '#56CCF2',
    textAlign: 'center',
  },
  currentMonthText: {
    color: '#EB5757',
    textAlign: 'center',
  },

  nextMonthText: {
    color: '#56CCF2',
    textAlign: 'center',
  },
  // counter
  containerCounter: {
    top: hp(-5),
    zIndex: 99,
    backgroundColor: 'red',
    position: 'absolute',
    width: 35 / 2,
    height: 35 / 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterActive: {
    position: 'absolute',
    right: 10,
    top: -5,
    zIndex: 99,
  },
  counterDisabled: {
    position: 'absolute',
    right: 20,
    top: 7,
    zIndex: 99,
  },
});

const dates = (
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
) => {
  if (focusedInput === 'startDate') {
    if (startDate && endDate) {
      return {startDate, endDate: null, focusedInput: 'endDate'};
    }
    return {startDate, endDate, focusedInput: 'endDate'};
  }

  if (focusedInput === 'endDate') {
    if (endDate && startDate && endDate.isBefore(startDate)) {
      return {startDate: endDate, endDate: null, focusedInput: 'endDate'};
    }
    return {startDate, endDate, focusedInput: 'startDate'};
  }

  return {startDate, endDate, focusedInput};
};

export const Week = (props: WeekType) => {
  const {
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    startOfWeek,
    onDatesChange,
    isDateBlocked,
    onDisableClicked,
    styles,
    counterItems
  } = props;

  const days = [];
  const endOfWeek = startOfWeek.clone().endOf('isoweek');

  const getDayRange = moment.range(startOfWeek, endOfWeek);
  Array.from(getDayRange.by('days')).map((day: moment) => {
    const onPress = () => {
      if (isDateBlocked(day)) {
        onDisableClicked(day);
      } else if (range) {
        let isPeriodBlocked = false;
        const start = focusedInput === 'startDate' ? day : startDate;
        const end = focusedInput === 'endDate' ? day : endDate;
        if (start && end) {
          moment.range(start, end).by('days', (dayPeriod: moment) => {
            if (isDateBlocked(dayPeriod)) {
              isPeriodBlocked = true;
            }
          });
        }
        onDatesChange(
          isPeriodBlocked
            ? dates(end, null, 'startDate')
            : dates(start, end, focusedInput),
        );
      } else {
        onDatesChange({date: day});
      }
    };

    const isDateSelected = () => {
      if (range) {
        if (startDate && endDate) {
          return (
            day.isSameOrAfter(startDate, 'day') &&
            day.isSameOrBefore(endDate, 'day')
          );
        }
        return (
          (startDate && day.isSame(startDate, 'day')) ||
          (endDate && day.isSame(endDate, 'day'))
        );
      }
      return date && day.isSame(date, 'day');
    };

    const isBlocked = isDateBlocked(day);
    const isSelected = isDateSelected();
    const todayDate = dateTimeToDateString(new Date()) == dateTimeToDateString(day._d) ? true : false;
    const style = [
      todayDate && styles.todayDate,
      styles.day,
      isBlocked && styles.dayBlocked,
      isSelected && styles.daySelected,
    ];

    const styleText = [
      styles.dayText,
      isBlocked && styles.dayDisabledText,
      isSelected && styles.daySelectedText,
    ];
    // console.log('counterItems',counterItems);
    const counterModel = counterItems.getItem(
        `${day.format('DD.MM.YYYY')}`,
    )
    // let counterModel = undefined
    days.push(
      <View style={styles.dayContainer} key={day.format('YYYY_MM_DD')}>
        <TouchableOpacity
          // key={day.format('YYYY_MM_DD')}
          style={style}
          onPress={onPress}
          disabled={isBlocked && !onDisableClicked}>
          <Text style={styleText}>{day.date()}</Text>
          <View
            style={
              isSelected && styles.daySelected
                ? styles.counterActive
                : styles.counterDisabled
            }>
            {counterModel!==undefined && (
                <CounterView
                    model={counterModel}
                    key={counterModel.id}
                    id={`${counterModel.id}_${}`}
                    styleContainer={styles.containerCounter}
                />
            )}
          </View>
        </TouchableOpacity>
      </View>,
    );
    return null;
  });
  return <View style={styles.week}>{days}</View>;
};

export const Month = (props: MonthType) => {
  const {
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    currentDate,
    focusedMonth,
    onDatesChange,
    isDateBlocked,
    onDisableClicked,
    styles,
    counterItems
  } = props;

  const dayNames = [];
  const weeks = [];
  const startOfMonth = focusedMonth.clone().startOf('month').startOf('isoweek');
  const endOfMonth = focusedMonth.clone().endOf('month');
  const weekRange = moment.range(
    currentDate.clone().startOf('isoweek'),
    currentDate.clone().endOf('isoweek'),
  );

  Array.from(weekRange.by('days')).map((day: moment) => {
    dayNames.push(
      <Text key={day.date()} style={styles.dayName}>
        {getDayName(new Date(day).getDay())}
      </Text>,
    );
    return null;
  });

  const getMonthRange = moment.range(startOfMonth, endOfMonth);
  Array.from(getMonthRange.by('weeks')).map((week: moment) => {
    weeks.push(
      <Week
        key={week}
        range={range}
        date={date}
        startDate={startDate}
        endDate={endDate}
        focusedInput={focusedInput}
        currentDate={currentDate}
        focusedMonth={focusedMonth}
        startOfWeek={week}
        onDatesChange={onDatesChange}
        isDateBlocked={isDateBlocked}
        onDisableClicked={onDisableClicked}
        styles={styles}
        counterItems={counterItems}
      />,
    );
    return null;
  });

  return (
    <View style={styles.month}>
      <View style={styles.week}>{dayNames}</View>
      {weeks}
    </View>
  );
};

export default class Dates extends Component {
  state = {
    currentDate: moment(),
    focusedMonth: moment().startOf('month'),
  };

  componentDidMount() {
    this.setFocusedMonth();
  }

  setFocusedMonth = () => {
    const {focusedMonth} = this.props;
    if (focusedMonth) {
      this.setState({
        focusedMonth: moment(focusedMonth, 'MMMM D, YYYY h:mm a').startOf(
          'month',
        ),
      });
    }
  };

  props: DatesType;

  render() {
    const previousMonth = () => {
      this.setState({focusedMonth: this.state.focusedMonth.add(-1, 'M')});
    };

    const nextMonth = () => {
      this.setState({focusedMonth: this.state.focusedMonth.add(1, 'M')});
    };

    const styles = {...defaultStyles, ...(this.props.styles || {})};
    // console.log('focusedMonth', this.state.focusedMonth)
    return (
      <View style={styles.calendar}>
        <View style={styles.heading}>
          <TouchableOpacity
            onPress={previousMonth}
            style={styles.previousMonthBox}>
            <Text style={styles.previousMonthText}>
              {getMonthName(new Date(this.state.focusedMonth).getMonth() - 1)}
            </Text>
          </TouchableOpacity>
          <View style={styles.currentMonthBox}>
            <Text style={styles.currentMonthText}>
              {getMonthName(new Date(this.state.focusedMonth).getMonth()) +
                ' ' +
                new Date(this.state.focusedMonth).getFullYear()}
            </Text>
          </View>
          <TouchableOpacity onPress={nextMonth} style={styles.nextMonthBox}>
            <Text style={styles.nextMonthText}>
              {getMonthName(new Date(this.state.focusedMonth).getMonth() + 1)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarContainer}>
          <Month
            range={this.props.range}
            date={this.props.date}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            focusedInput={this.props.focusedInput}
            currentDate={this.state.currentDate}
            focusedMonth={this.state.focusedMonth}
            onDatesChange={this.props.onDatesChange}
            isDateBlocked={this.props.isDateBlocked}
            onDisableClicked={this.props.onDisableClicked}
            styles={styles}
            counterItems={this.props.counterItems}
          />
        </View>
      </View>
    );
  }
}

const getMonthName = (month) => {
  const monthInd = month < 0 ? month + 12 : month > 11 ? month - 12 : month;
  switch (monthInd) {
    case 0:
      return 'Січень';
    case 1:
      return 'Лютий';
    case 2:
      return 'Березень';
    case 3:
      return 'Квітень';
    case 4:
      return 'Травень';
    case 5:
      return 'Червень';
    case 6:
      return 'Липень';
    case 7:
      return 'Серпень';
    case 8:
      return 'Вересень';
    case 9:
      return 'Жовтень';
    case 10:
      return 'Листопад';
    case 11:
      return 'Грудень';
    default:
      '';
  }
  return '';
};

const getDayName = (day) => {
  // const monthInd = month<0 ? month+12 : month>11 ? month-12 : month
  switch (day) {
    case 0:
      return 'ПН';
    case 1:
      return 'ВТ';
    case 2:
      return 'СР';
    case 3:
      return 'ЧТ';
    case 4:
      return 'ПТ';
    case 5:
      return 'СБ';
    case 6:
      return 'НД';
    default:
      '';
  }
  return '';
};
