import {AppSettings} from './AppSettings';
import {AppLog} from './AppLog';
export const fetchData = async (
  url: string,
  type: string,
  body: object | null = null,
  token: string | null = null,
  context = null,
  chat: boolean = false,
) => {
  const newContext = context;
  try {
    const endpoint = chat ? AppSettings.chatEndpoint : AppSettings.endpoint;
    const response = await fetch(`${endpoint}/${url}`, {
      method: type.toString().toUpperCase(),
      // @ts-ignore
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': 'F5E4C34D-0D3E-4BC7-8EBD-2D2AC4D626EA',
        'user-token': token,
      },
      body:
        type.toString().toUpperCase() !== 'GET' ? JSON.stringify(body) : null,
    });
    if (response.ok) {
      const json = await response.json();
      json.__context__ = newContext;
      //AppLog.log('jsonFetch--' + url, json);
      return json;
    } else {
      throw 500;
    }
  } catch (err) {
    AppLog.log('jsonErrCatch--' + url, err);
    throw err;
  }
};
