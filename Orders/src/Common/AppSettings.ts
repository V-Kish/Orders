class AppSettings {
  private static _chatEndpoint = 'https://ceaa8cbf-f65c-4779-9595-chat-api.osbb.work/api-v2';
  private static _chatTestEndpoint = 'https://uat-api-chat.osbb.work/api-v2';


  // true - test endpoints
  // false - release endpoints
  private static _devMode = false;


  static get endpoint() {
    return 'https://company001-api-9586dpoq-75.torello.exchange';
    //return 'https://api-torello.rake.tech';
  }
  static get chatEndpoint(){
    return this._devMode ? this._chatTestEndpoint : this._chatEndpoint
  }

}

export {AppSettings};
