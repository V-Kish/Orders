import React from 'react';
import moment from 'moment';
import {View, StyleSheet, Text, Image} from 'react-native';
import {getTime} from '../../Common/getTime';
import {COLORS, CHAT_COLORS} from "../../constants/colors";
import {CHAT_ICONS} from "../../constants/icons";
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

export const ChatTime = ({date}) => {
  let days: any[] = [];
  function setDays() {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');
    let days = [];
    for (let i = 0; i <= 6; i++) {
      let dayObj = {day: null, data: null};
      dayObj.day = moment(weekStart).add(i, 'days').format('dddd');
      dayObj.data = moment(weekStart).add(i, 'days').format('YYYY.MM.DD');

      days.push(dayObj);
    }
    return days;
  }
  function getWeekDay(weekDay) {
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
  function returnDay() {
    let result = '';
    days.forEach((elements, index) => {
      if (elements.data === date) {
        return (result = getWeekDay(elements.day));
      }
    });
    if (result !== '') {
      return result;
    } else {
      return false;
    }
  }

  return (
    <View style={styles.containers}>
      <Text style={styles.textTime}>{getTime(date, false, false, true, () => returnDay())}</Text>
      <Image source={CHAT_ICONS.arrow} style={styles.image}/>
    </View>
  );
};
const styles = StyleSheet.create({
  containers: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  textTime:{
    fontFamily:'Roboto-Regular',
    fontSize:hp(16),
    color:CHAT_COLORS.FONT_GRAY,
    marginRight:wp(10)
  },
  image:{
    resizeMode:'contain',
    width:hp(13),
    height:hp(13),
  }
});
