import {IItemType} from './BaseTypes';

export type osbbTariffsItem = IItemType & {
  osbbId: number;
  tariffTypeId: number;
  sum: number;
  dateFrom: string;
  dateTo: string;
  isForMonth: boolean;
  status: boolean;
  date: string;
  canUpdate?: boolean;
};

export type tariffServicesItem = {
  tariffServicesId: number;
  sum: number;
};

export type tariffType = IItemType & {
  isAreaType: boolean;
  status: boolean;
  date: string;
};
