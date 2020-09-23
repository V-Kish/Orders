import {AppSettings} from './AppSettings';
import {AppLog} from "./AppLog";
export const fetchData = async (
  url: string,
  type: string,
  body: object | null = null,
  token: string | null = null,
  context = null,
) => {
  const newContext = context;
  try {
    const response = await fetch(`${AppSettings.endpoint}/${url}`, {
      method: type.toString().toUpperCase(),
      // @ts-ignore
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': 'C7FA59B1-7522-485B-9AE0-64A021300939',
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
