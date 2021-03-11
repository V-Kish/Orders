
export function CheckResponse(response, setLoader, context) {
  if (setLoader !== undefined) {
    setLoader(false);
  }
  //AppLog.log('authResponse', response);
  if (typeof response !== 'undefined' && response.statusCode === 200) {
    if (context) {
      response.__context__ = context;
    }
    return response;
  } else {
    throw response;
  }
}
