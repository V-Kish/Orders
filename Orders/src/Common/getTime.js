import moment from 'moment';
import 'moment/locale/uk';

import {convertToUTCString, dateParse} from "../helpers/DateParse";
export function getTime(
  dateString,
  type = false,
  format = false,
  chatTime = false,
  returnDay = null,
) {
  if (!type) {
    console.log('getTime moment 1')
    if (!chatTime) {
      console.log('getTime moment 2')
      return moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('HH:mm');
    } else {

      const lastMessageTime = dateParse(
        convertToUTCString(dateString),
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
            console.log('getTime moment getMonth dateString', dateString)
            console.log('getTime moment getMonth', getMonth(dateString))
            console.log('getTime moment lastMessageTime',moment(dateString, 'DD.MM.YYYYTHH:mm:ss').format('DD') +
                getMonth(dateString))
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
  console.log('getTime moment month ',month)
  switch (month) {
    case 'січень':
      return ' січ';
    case 'лютий':
      return ' лют';
    case 'березень':
      return ' бер';
    case 'квітень':
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
export function dateTimeToDateString(date: Date | undefined) {
  if (!date) {
    return '';
  }
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${day}.${month}.${date.getFullYear()}`;
}
