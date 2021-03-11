import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import Dates from './Dates';
import { CalendarModel } from '../../../Model/Components/Calendar/CalendarModel';
class CalendarView extends TypedBaseComponent<CalendarModel> {
  constructor(props: any) {
    super(props);
  }

  render() {
    super.render();
    const isDateBlocked = (date: Date) => {};
    if (!this.model.isVisible) {
      return null;
    }
    const date = this.model.date!==null ? {
      date: this.model.date
    }
    : {}
    return (
      <View style={styles.container}>
        <Dates
          date={this.model.date}
          onDatesChange={this.model.onCalendarDayPress}
          isDateBlocked={() => {
            return false;
          }}
          startDate={this.model.startDate}
          endDate={this.model.endDate}
          focusedInput={this.model.focus}
          focusedMonth={this.model.date}
          range={this.model.range}
          counterItems={this.model.counterItems}
        />
        <Text style={styles.calendarText}>
          {this.model.calendarText} {this.model.selectedDate}
        </Text>
      </View>
    );
  }
}

export {CalendarView};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  calendarText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: wp(14),
    lineHeight: 16,
    color: '#000000',
    paddingHorizontal: wp(15),
    paddingVertical: hp(10),
  },
});
