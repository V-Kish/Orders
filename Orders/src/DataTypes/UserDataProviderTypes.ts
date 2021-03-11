// Type body Post authorization
import {requestBodyType, IItemType} from './BaseTypes';
import {pagedItemProps} from '../Models/navigation/PagedList/PagedItem';
import DeviceInfo from 'react-native-device-info';

export type AuthBody = {
  phone: string;
  password: string;
  deviceInfo: string;
};
//Type response Auth
export type AuthBodyAnswer = {
  statusCode: number;
  statusMessage: string;
  data?:
    | {
        accessToken: string;
        userHash: string;
        authStatusId: number;
      }
    | {field: string};
};
//Створити/Отримання токену доступу для пристрою
export type getDeviceId = {
  phone?: string;
  deviceInfo?: string;
  password?: string;
  accessToken?: string;
};
//Тіло відповіді
export type getDeviceIdAnswer = {
  statusCode: number;
  statusMessage: string;
  data?:
    | {
        accessToken: string;
        userHash: string;
        authStatusId: number;
        code: boolean;
      }
    | {field: string};
};
//Перевірити токену пристрою
export type deviceIdCheck = {
  accessToken: string;
  phone: string;
  deviceInfo: string;
};
//Тіло відповіді
export type deviceIdCheckAnswer = {
  statusCode: number;
  statusMessage: string;
  data?: {
    accessToken: string;
    userHash: string;
    authStatusId: number;
    code: boolean;
  };
};
//Згенерувати та відправити перевірочний код для смс
export type phoneCodeGenerate = {
  accessToken: string;
};
//Тіло відповіді
export type phoneCodeGenerateAnswer = {
  statusCode: number;
  statusMessage: string;
  data?: {
    smsIsSended: boolean;
    codeEndDate: string;
    secondsLeft: number;
  };
};
//Метод для перевірки коду підтвердження
export type phoneCodeCheck = requestBodyType & {
  code: string;
};
//Тіло відповіді
export type phoneCodeCheckAnswer = {
  statusCode: number;
  statusMessage: string;
};
//Изменить аватар пользовател
export type bodyChangeAvatarTypes = {
  originalName: string;
  base64data: string;
  comment: string;
};

export type deviceInfoType = {
  AndroidID: string;
  Bootloader: string;
  Brand: string;
  DeviceID: string;
  BuildID: string;
  MAC: string;
  IP: string;
} | null;
export type paramsCreateFetchBody = {
  phone?: string;
  password?: string;
  accessToken?: string;
  pageIndex?: number;
  pageSize?: number;
  edrpou?: string;
};
export type fileVerify = {
  HttpPostedFileBase: any;
  fileTypeId: number;
  comment: string;
  osbbHash: string;
};

//
export type genarateCodeType = {
  smsIsSended: boolean | null;
  codeEndDate: string | null;
  canGenNewCodeDate: string | null;
  secondsLeft: number | null;
  canGenNewCodeSecondsLeft: number | null;
  canGenNewCode: boolean | null;
};

//Створити ОСББ (На перевірку)
export type createOSBBForCheck = {
  edrpou: string;
  name: string;
  address: string;
  filesList: [string];
  userName: string;
  ipn: string;
  email: string;
};
//Тіло відповіді
export type createOSBBForCheckAnswer = {
  statusCode: number;
  statusMessage: string;
  data?: {
    id?: number;
    hash?: string;
    edrpou?: string;
    edrpouHash?: number;
    address?: string;
    name?: string;
    slug?: string;
    ownerUserId?: number;
    status?: boolean;
    date?: string;
    field?: string;
    verifyStatusId?: number;
  };
};

export type headerTypes = [
  {
    id: number;
    headerTitle: string;
    onPress: () => void;
  },
];
export type headerSelectedTypes = {
  id: number;
  headerTitle: string;
  onPress: () => void;
};
