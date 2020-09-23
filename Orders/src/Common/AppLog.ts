class AppLog {
  static log(message: string, args: any = null) {
    console.log(message, args);
  }
  static trace(message: string, args: any = null) {
    console.log(message, args);
  }

  static warn(message: string) {
    console.warn(message);
  }

  static error(message: string, args: any = null) {
    console.log(message, args);
  }
}

export {AppLog};
