export function convertToUTCString(dateString, timeOffset = null) {
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
    timeOffset;
  ///AppLog.log(utcString);
  return utcString;
}
