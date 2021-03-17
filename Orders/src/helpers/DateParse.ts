export function convertToUTCString(date: string, timeOffset = '+03:00') {
    if (date === undefined) {
      return '';
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
export function dateTimeToTimeStringOrders(date: Date) {
    const hours = `0${date.getHours() + 1}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${hours}:${minutes}`;
}
export function dateTimeToTimeStringDatePick(date: Date) {
    const hours = `0${date.getHours() + 1}`.slice(-2);
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
