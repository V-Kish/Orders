import {IItemType} from './BaseTypes';


export type tariffServicesItem = {
  tariffServicesId: number;
  sum: number;
};

export type tariffType = IItemType & {
  isAreaType: boolean;
  status: boolean;
  date: string;
};
