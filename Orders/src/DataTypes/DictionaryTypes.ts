import {IItemType} from './BaseTypes';

export type osbbDictionaryMessagesType = IItemType & {
  code: string;
  date: string;
  description: string;
  status: boolean;
};

export type osbbDictionaryTransactionType = IItemType & {
  status: boolean;
};

export type osbbDictionaryStatusStatementOfResidentsType = IItemType & {
  slug: string;
  status: boolean;
};

export type osbbDictionarySectionsStatementsType = IItemType & {
  osbbId: number;
  status: boolean;
};

export type fileType = IItemType & {
    id: string;
    name: string;
    isDocument: boolean;
    slug: string;
    status: boolean;
}
