export function convertToUTCString(date: string, timeOffset = '+02:00') {
  if (date === undefined || date === null) {
    return '01.01.1970';
  }
  date = date.replace('T', ' ');
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
    timeOffset;
  ///AppLog.log(utcString);
  return utcString;
}

export function dateParse(dateString: string) {
  return new Date(Date.parse(dateString));
}

export function dateTimeToTimeString(date: Date) {
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
}

export function dateTimeToDateString(date: Date | undefined) {
  if (!date) {
    return '';
  }
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${day}.${month}.${date.getFullYear()}`;
}

export function strToDateStr(str: string, type: 'date' | 'time' = 'date') {
  return type === 'date'
    ? dateTimeToDateString(dateParse(convertToUTCString(str)))
    : dateTimeToTimeString(dateParse(convertToUTCString(str)));
}

export function differenceTwoDate(dateStr1: string, dateStr2: string) {
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  // const millisecondsInHour = 1000 * 60 * 60;
  const date1 = dateParse(convertToUTCString(dateStr1));
  const date2 = dateParse(convertToUTCString(dateStr2));

  // let difference =
  //   Math.abs(date1.getTime() - date2.getTime()) / millisecondsInDay;
  // if (difference > 0) {
  //   return Math.trunc(difference);
  // } else {
  //   difference =
  //     Math.abs(date1.getTime() - date2.getTime()) / millisecondsInHour;
  //   return Math.trunc(difference);
  // }
  const difference =
    Math.abs(date1.getTime() - date2.getTime()) / millisecondsInDay;
  if (difference > 0 && difference < 1) {
    return 1;
  } else {
    return Math.trunc(difference);
  }
}

// recieve in format dd.mm.yyyy
export const stringToServerDate = (string: string): string => {
  try {
    const splites = string.split('.');
    const dd = splites[0];
    const mm = splites[1];
    const yyyy = splites[2];
    return `${yyyy}-${mm}-${dd}`;
  } catch (e) {
    console.log('date ex', e);
    return string;
  }
};
// recieve in format HH:MM
export const stringToServerTime = (string: string): string => {
  try {
    const splites = string.split(':');
    const HH = splites[0];
    const MM = splites[1];
    const SS = splites[2] !== undefined ? splites[2] : '00';
    return `${HH}:${MM}:${SS}`;
  } catch (e) {
    console.log('time ex', e);
    return string;
  }
};

export const datePlusTimeServerString = (
  date: string,
  time: string,
): string => {
  try {
    return `${stringToServerDate(date)}T${stringToServerTime(time)}`;
  } catch (e) {
    console.log('serverTimeEx', e);
    return '';
  }
};

// convert SERVER DATE to view date ForExample: 07.01.21
export const serverDateStringToDateString = (date: string) => {
  return dateTimeToDateString(dateParse(convertToUTCString(date)));
};
// convert SERVER DATE to view time ForExample: 10:42
export const serverDateStringToTimeString = (date: string) => {
  return dateTimeToTimeString(dateParse(convertToUTCString(date)));
};
// convert SERVER DATE to view date with time ForExample: 07.01.21 10:42
export const serverDateStringToDateWithTimeString = (date: string) => {
  const dd = dateParse(convertToUTCString(date));
  return `${dateTimeToDateString(dd)} ${dateTimeToTimeString(dd)}`;
};
const months = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];
export const getMonth = (serverString: string) => {
  try {
    const dd = serverString.split('T')[0].split('.');
    let month = +dd[1];
    return `${months[month - 1]} ${dd[2]}`;
  } catch (e) {
    return serverString;
  }
};

// const monthsPadege = [
//   'Січня',
//   'Лютого',
//   'Березня',
//   'Квітня',
//   'Травня',
//   'Червня',
//   'Липня',
//   'Серпня',
//   'Вересня',
//   'Жовтня',
//   'Листопада',
//   'Грудня',
// ];
//
// export const serverTimeToDateWithMonth = (serverString: string) => {
//   try{
//     const serverDate = serverString.split('T')[0].split('.')
//     return `${serverDate[0]} ${monthsPadege[+serverDate[1]]} ${serverDate[2]}`
//   } catch (e){
//     return serverString
//   }
// }
