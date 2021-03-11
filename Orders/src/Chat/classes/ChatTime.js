import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getTime } from '../functions/getTime';
import { mockupHeightToDP as hp } from '../../constants/Dimensions';
import moment from 'moment';
import { BaseComponent } from '../../Common/BaseComponent';

class ChatTime extends BaseComponent {
  constructor(props) {
    super(props);
    this.messageDate = moment(
      this.props.model.messageDate,
      'DD.MM.YYYYTHH:mm:ss',
    ).format('YYYY.MM.DD');
    this.days = this.setDays();
  }

  setDays() {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');
    let days = [];
    for (let i = 0; i <= 6; i++) {
      let dayObj = { day: null, data: null };
      dayObj.day = moment(weekStart)
        .add(i, 'days')
        .format('dddd');
      dayObj.data = moment(weekStart)
        .add(i, 'days')
        .format('YYYY.MM.DD');

      days.push(dayObj);
    }
    return days;
  }

  getWeekDay(weekDay) {
    switch (weekDay) {
      case 'понеділок':
        return 'Пн';
      case 'вівторок':
        return 'Вт';
      case 'середа':
        return 'Ср';
      case 'четвер':
        return 'Чт';
      case "п'ятниця":
        return 'Пт';
      case 'субота':
        return 'Сб';
      case 'неділя':
        return 'Нд';
    }
  }

  returnDay() {
    let result = '';
    this.days.forEach((elements, index) => {
      if (elements.data === this.messageDate) {
        return (result = this.getWeekDay(elements.day));
      }
    });
    if (result !== '') {
      return result;
    } else {
      return false;
    }
  }

  render() {
    super.render();
    return (
      <View style={styles.contactTimeContainer}>
        <Text style={styles.contactTime}>
          {getTime(this.props.model.messageDate, false, false, true, () =>
            this.returnDay(),
          )}
        </Text>
      </View>
    );
  }
}

export default ChatTime;

const styles = StyleSheet.create({
  contactTimeContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactTime: {
    fontSize: hp(10.8),
    color: 'rgba(0, 0, 0, 0.38)',
    marginBottom: hp(5),
    marginTop: hp(3),
  },
});
