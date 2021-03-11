import {IItemType} from './BaseTypes';

export type userApartmentDetailType = {
  apartmentNumber: string;
  houseAddress: string;
  houseNumber: number;
  osbbName: string;
  apartmentId: number;
  membersTypeId: number;
  osbbId: number;
};
export type userDataType = IItemType & {
  bDate?: string;
  date?: string;
  email?: string;
  emailVerify?: boolean;
  hash?: string;
  hashsum?: number;
  ipn?: string;
  status?: boolean;
  phone: string;
  detailInfo: Array<userApartmentDetailType>;
  ugroup?: number;
};
