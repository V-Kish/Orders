// Type body Post authorization
import {requestBodyType, IItemType} from './BaseTypes';
import { pagedItemProps } from '../Models/navigation/PagedList/PagedItem';
import DeviceInfo from "react-native-device-info";

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
export type formVerification = {
  osbbHash: string;
  name?: string;
  address?: string;
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
//
export type initOsbbListType = [
  {
    hash: string;
    edrpou: string;
    address: string;
    name: string;
    ownerUserId: number;
    status: boolean;
    slug: string;
    verifyStatusId: number;
    verifyUserId: number;
    verifyStatusMessage: string;
    verifyDate: string;
    verifyComment: string;
    date: string;
    edrpouHash: string;
  },
];
//
export type findCodeOsbbEdrpou = {
  edrpou: string;
};
//Тіло відповіді
export type findCodeOsbbEdrpouAnswer = {
  statusCode: number;
  statusMessage: string;
  data?: {
    hash?: string;
    edrpou?: string;
    address?: string;
    name?: string;
    ownerUserId?: number;
    status?: boolean;
    slug?: string;
    verifyStatusId?: number;
    osbbVerifyDate?: string;
    verifyComment?: string;
    field?: string;
  };
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
//
export type userInfoTypes = {
  id: number;
  hash: string;
  name: string;
  login: string;
  password: string;
  hashsum: number;
  ipn: string;
  email: string;
  emailVerify: boolean;
  ugroup: number;
  status: boolean;
  date: string;
  bDate: string;
  bDateIsDefault: boolean;
  ugroupName: string;
} | null;
//
export type attachTmpUser = {
  name: string;
  email: string;
  personalAccount: string;
  memberTypeId: string;
  ipn: string;
  bDate: string;
} | null;
export type attachTmpUserAnswer = {
  statusCode: number;
  statusMessage: string;
  data?: [
    {
      osbbHash: string;
      personalAccount: string;
      membersVerifyStatusId: number;
      dateCreate: string;
      dateUpdate: string;
      field?: string;
    },
  ];
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
export type FireBaseTypes = {
  token: string;
  deviceInfo: string;
};


export type osbbDocumentListItemType = IItemType & pagedItemProps & {
    id: number;
    BLOBData: string;
    comment: string;
    date: string; //date
    extension: string;
    filesTypeId: number;
    hash: string; //guid
    mimeType: string;
    originalName: string;
    ownerId: number;
    size: number;
    status: boolean;
};
