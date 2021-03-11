import moment from 'moment';
import 'moment/locale/uk';
import { dateParse } from './dateParse';
import { convertToUTCString } from './convertToUTCString';
import React from 'react';
export function getTime(
  dateString,
  type = false,
  format = false,
  chatTime = false,
  returnDay = null,
) {
  if (!type) {
    if (!chatTime) {
      return moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('HH:mm');
    } else {
      const lastMessageTime = dateParse(
        convertToUTCString(dateString, global.__timeOffset__),
      );
      const currentTime = new Date();
      if (
        lastMessageTime.getDate() === currentTime.getDate() &&
        lastMessageTime.getMonth() === currentTime.getMonth() &&
        lastMessageTime.getFullYear() === currentTime.getFullYear()
      ) {
        return moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('HH:mm');
      } else {
        //
        if (returnDay !== null) {
          if (returnDay() !== false) {
            return returnDay();
          } else {
            // return  getMonth(dateString)
            return (
              moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('DD') +
              getMonth(dateString)
            );
          }
        }
      }
    }
  } else {
    if (format) {
      return moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('dddd・DD.MM');
    }
    return moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('dddd・HH:mm');
  }
}
function getMonth(dateStr) {
  let month = moment(dateStr, 'DD.MM.YYYYTHH:mm:ss').format('MMMM');
  switch (month) {
    case 'січень':
      return ' січ';
    case 'лютий':
      return ' лют';
    case 'березень':
      return ' бер';
    case 'квітень ':
      return ' квіт';
    case 'травень':
      return ' трав';
    case 'червень':
      return ' черв';
    case 'липень':
      return ' лип';
    case 'серпень':
      return ' серп';
    case 'вересень':
      return ' вер';
    case 'жовтень':
      return ' жовт';
    case 'листопад':
      return ' лист';
    case 'грудень':
      return ' груд';
  }
}
function getUtcTime(dateString) {
  if (dateString === undefined) {
    return '';
  }
  const date = dateString.replace('T', ' ');
  const dateArr = date.split(' ');
  const reformatDate = dateArr[0].split('.');
  const utcString =
    reformatDate[2] +
    '-' +
    reformatDate[1] +
    '-' +
    reformatDate[0] +
    'T' +
    dateArr[1] +
    global.__timeOffset__;
  return new Date(Date.parse(utcString)).getTime();
}

export function getTimeAndText(dateString) {
  if (dateString === '') {
    return null;
  }
  const todayStart = moment().startOf('day');
  const todayEnd = moment()
    .add(1, 'day')
    .endOf('day');
  const yesterdayStart = moment()
    .subtract(1, 'day')
    .startOf('day');
  let TodayStart = Date.parse(todayStart);
  let TodayEnd = Date.parse(todayEnd);
  let YesterdayStart = Date.parse(yesterdayStart);
  if (getUtcTime(dateString) === '') {
    return 'користувач офлайн ';
  }
  if (getUtcTime(dateString) < YesterdayStart) {
    return (
      'був в мережі: ' +
      moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('DD.MM.YYYY HH:mm')
    );
  }
  if (getUtcTime(dateString) < TodayStart) {
    return (
      'був в мережі: вчора в ' +
      moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('HH:mm')
    );
  }
  if (getUtcTime(dateString) < TodayEnd) {
    return (
      'був в мережі: сьогодні в ' +
      moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('HH:mm')
    );
  }
}
