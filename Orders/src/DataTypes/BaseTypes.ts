export interface IItemType {
  id?: number;
  name?: string;
}

export type baseResponseType<T extends IItemType> = {
  statusCode: number;
  statusMessage: string;
  data: {} | Array<T>; //?
};

export type baseResponse<T extends IItemType> = {
  statusCode: number;
  statusMessage: string;
  data?: {
    Items: Array<T>;
    PageIndex: number;
    PageSize: number;
    TotalItems: number;
    TotalPages: number;
  };
};

export type dictionaryBaseResponse<T extends IItemType> = {
  statusCode: number;
  statusMessage: string;
  data: Array<T>;
};

export type requestBodyType = {
  accessToken?: string;
  pageIndex: number;
  pageSize: number;
  sQuery?: string;
  [id: string]: string | number | undefined;
};
