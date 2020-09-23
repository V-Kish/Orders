export type reduxTypes = {
  start: {
    startApp: string;
    isAuthStack: boolean;
  };
};
export type AuthBody = {
      login: string;
      password: string;
      deviceInfo: string;
    } | undefined;
