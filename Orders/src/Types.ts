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
    orderData: orderDataTypes;
    selectedDepartments: Array<any>;
  };
  ditUser: {
    editUser: userDataTypes;
  };
};
export type AuthBody =
  | {
      login: string;
      password: string;
      deviceInfo: string | undefined;
      appCode?: string;
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
};
export type userDataTypes = {
  user: {
    hash: string;
    name: string;
    password: string;
    phone: string;
  };
  cards: Array<{
    balance: {total: number; writeoff: number; diff: number};
    group: {id: number; name: string};
    hash: string;
    number: string;
    operations: {buyCount: number; saleCount: number};
    reshta: {totalIn: number; totalOut: number; current: number};
  }>;
};
export type orderDataTypes = {
  detail: {
    cardGroupId: number;
    cardNumber: string;
    clientId: number;
    clientName: string;
    clientPhone: string;
    comment: string;
    currencyId: number;
    currencyIdCode:string;
    currencyToId: number;
    currencyToIdCode:string;
    departmentId: number;
    operationType: string;
    rate: number;
    rateCurrency: {
      sale: number;
      buy: number;
    };
    rateCurrencyTo: {
      sale: number;
      buy: number;
    };
  };
  system: {
    QR:string;
    createDate: string;
    orderId: number;
    orderNum: string;
    status: number;
    statusDate: string;
  };
};
