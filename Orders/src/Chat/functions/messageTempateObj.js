import { dateToString } from './dateToString';
import { currentUser } from '../../Core/CurrentUser';

export function messageTemplateObj() {
  return {
    date: dateToString(new Date()),
    groupHash: '',
    groupId: null,
    id: -new Date().getTime(),
    isEncrypt: true,
    message: '',
    messageType: 1,
    status: true,
    uFrom: currentUser().userId,
    uFromDate: dateToString(new Date()),
    uFromStatus: null,
    uFromToken: '',
    progress: 0,
  };
}
