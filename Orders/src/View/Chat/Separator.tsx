import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

import {useDispatch} from 'react-redux';
import { MyMessage } from '../Components/MyMessage';
import { ReceivedMessage } from '../Components/ReceivedMessage';
import {getTime} from "../../Common/getTime";
import {CHAT_COLORS} from "../../constants/colors";
import moment from "moment";

export const Separator = ({date}) => {
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
        <View style={styles.containerReceivedMessage}>
            <Text style={styles.textTime}>{getTime(date, false, false, true, () => returnDay())}</Text>
      </View>
    );
};
const styles = StyleSheet.create({
    containerMyMessages:{
        width:'100%',
        justifyContent:'flex-end',
        flexDirection:'row'
    },
    containerReceivedMessage:{
        width:'100%',
        justifyContent:'center',
        flexDirection:'row'
    },
    textTime:{
        fontFamily:'Roboto-Regular',
        fontSize:hp(16),
        color:CHAT_COLORS.FONT_GRAY,
        marginRight:wp(10)
    },
});
