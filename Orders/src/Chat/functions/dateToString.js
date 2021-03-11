export const dateToString = date => {
  return [
    ('0' + date.getDate()).slice(-2),
    '.',
    ('0' + (date.getMonth() + 1)).slice(-2),
    '.',
    date.getFullYear(),
    'T',
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    ':',
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    ':',
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
  ].join('');
};