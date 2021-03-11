import {IItemType} from './BaseTypes';

export type osbbHousesApartmentsItem = IItemType & {
  adminUserId: number;
  adminUserName: number;
  apartmentTypeId: number;
  date: string;
  entrance: number;
  floor: number;
  hash: string;
  heatingArea: number;
  houseAddress: string;
  houseId: number;
  liveArea: number;
  membersCount: number;
  number: string;
  personalAccount: string;
  roomsCount: number;
  status: boolean;
  tariffId: number;
  totalArea: number;
};
