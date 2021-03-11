import {IItemType} from './BaseTypes';
export type osbbDictionaryTransactionType = IItemType & {
  status: boolean;
};
export type fileType = IItemType & {
    id: string;
    name: string;
    isDocument: boolean;
    slug: string;
    status: boolean;
}
