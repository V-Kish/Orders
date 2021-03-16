export type reduxTypes = {
  chat: {
    chatListInfo:{
      TotalItems: number;
      TotalPages: number;
      PageIndex: number;
      PageSize: number;
    };
    paginationBody:{
      pageIndex: number;
      pageSize: number;
      isRead:  number;
    };
    Items: Array<any>;
    searchParam:any;
    selectedChat:{
      id: number;
      rootId: number;
      clientId: number;
      clientName: string;
      clientPhone: string;
      theme: string;
      message: string;
      fromUserId: number;
      fromUserIsClient: boolean;
      isUread: boolean;
      isMread: boolean;
      unReadCountU: number;
      unReadCountM: number;
      date: string;
    };
    listMessages:Array<any>;
    chatListMessagesInfo: {
      Theme: string;
      TotalItems: number;
      TotalPages: number
      PageIndex: number
      PageSize: number
    };
    paginationBodyMessage:{
      pageIndex: number;
      pageSize: number;
    }
  };
  clients: {
    Items: Array<any>;
    selectedChatUser: {
      userName: string,
      id: number
    }
  };
  
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
    orderDataCount: number;
    selectedDepartments: Array<any>;
  };
  ditUser: {
    editUser: userDataTypes;
    orderData: Array<any>;
    searchParam: {statusId: number; searchText: string};
    selectedDepartment: {id: number; text: string};
    paginationBody: {
      pageIndex: number;
      pageSize: number;
      operationType: string;
      departmentId: number;
    };
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

export type ChatList = {
  pageIndex: number;
  PageSize:  number;
  isRead:  number;
}
export type ClientsList = {
  pageIndex: number;
  PageSize:  number;
  query:  string;
}
export type ChatMessagesList = {
  pageIndex: number;
  pageSize:  number;
  rootId:  number;
}
export type chatMessage = {
  message:string;
  rootId:  number;
}
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
    adminComment: string;
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
export type chatItem = {
  clientId: number;
  clientName: string;
  clientPhone: string;
  date:string;
  fromUserId:  number;
  fromUserIsClient: boolean;
  id:  number;
  isMread: boolean;
  isUread: boolean;
  message: string;
  rootId:  number;
  theme: string;
  unReadCountM: number;
  unReadCountU:  number;
}


export type clientItem = {
  id: number;
  clientName: string;
  clientPhone: string;
}