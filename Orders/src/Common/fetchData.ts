import {AppSettings} from './AppSettings';
import {currentUser} from '../Core/CurrentUser';

export const fetchData = async (
  url: string,
  type: string,
  body: object | null = null,
  token: string | null = null,
  context = null,
  chat: boolean = false,

) => {
  const newContext = context;
  const userToken = currentUser().userToken;
  try {
    // Aboard Fetch Data 15000
    const timeout = 15000;
    let controller = new AbortController();
    const id = setTimeout(() => {
      controller.abort();
    }, timeout);
    let signal = body!==null && body.signalController!==undefined ? body.signalController :  controller.signal
    //
    const endpoint = chat ? AppSettings.chatEndpoint : AppSettings.endpoint
    // const startTime = new Date().getTime();
    const response = await fetch(`${endpoint}/${url}`, {
      method: type.toString().toUpperCase(),
      // @ts-ignore
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': 'F5E4C34D-0D3E-4BC7-8EBD-2D2AC4D626EA',
        'role-token': '2FCB66F5-D533-4648-BB7A-BABBA23D6F03',
        'user-token': userToken,
      },
      body:
        type.toString().toUpperCase() !== 'GET' ? JSON.stringify(body) : null,
      signal
    });
    clearTimeout(id);
    // console.log('fetchTime',`${endpoint}/${url}`, new Date().getTime() - startTime)
    if (response.ok) {
      const json = await response.json();
      // json.__context__ = newContext;
      // console.log('jsonFetch--' + url, json);
      return json;
    } else {
      if(!(body.requestWithoutFeedBack!==undefined && body.requestWithoutFeedBack)) {
        throw 500;
      }
    }
  } catch (err) {
    console.log('jsonErrCatch--' + url, err);
    if(!(body.requestWithoutFeedBack!==undefined && body.requestWithoutFeedBack)) {
      throw err;
    }
  }
};
