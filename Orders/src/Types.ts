export type reduxTypes = {
  start: {
    startApp: string;
    isAuthStack: boolean;
  };
  dictionaries: {
    listDepartments: Array<any>;
    listCurrencies: Array<any>;
    listDepartmentGroup: Array<any>;
    operationTypes: Array<any>;
    ordersStatus: Array<any>;
    orders: Array<any>;
  };
};
export type AuthBody =
  | {
      login: string;
      password: string;
      deviceInfo: string | undefined;
      appCode?:string
    }
  | undefined;

export type AuthBodyToken = {
  token: string;
  deviceInfo: string;
};
export type Departments = {
  rootType: number;
  sQuery: string;
  withSystemDepartments?: boolean;
};
export type DictionariesLoadStatusType = {
  listCurrencies: boolean;
  regions: boolean;
  departments: boolean;
  ordersStatuses: boolean;
  listDepartments: boolean;
};
export type Orders = {
  pageIndex: number;
  pageSize: number;
  operationType: string;
  status: number;
  departmentId: number;
  sQuery: string;
}
