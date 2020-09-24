export type reduxTypes = {
  start: {
    startApp: string;
    isAuthStack: boolean;
  };
  dictionaries: {
    listDepartments: Array<any>;
    listCurrencies: Array<any>;
  };
};
export type AuthBody =
  | {
      login: string;
      password: string;
      deviceInfo: string | undefined;
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
