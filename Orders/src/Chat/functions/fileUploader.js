import { AppSettings } from '../../Common/AppSettings';

export function fileUploader(
  json: string,
  url: string,
  onProgressFn,
  userToken,
  context,
) {
  return new Promise((success, reject) => {
    //AppLog.log('fileUploaderBody', json);
    let xhr = new XMLHttpRequest();
    xhr.__context__ = context;
    xhr.responseType = 'json';
    xhr.onerror = function(e) {
      reject(e);
    };
    xhr.upload.onprogress = e => {
      //AppLog.log(e.loaded, e.total);
      onProgressFn(e.loaded, e.total);
    };
    xhr.onloadend = () => {
      if (xhr.status === 200) {
        success(xhr);
      } else {
        reject(xhr);
      }
    };
    xhr.open('POST', `${AppSettings.endpoint}/${url}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader(
      'access-token',
      'F5E4C34D-0D3E-4BC7-8EBD-2D2AC4D626EA',
    );
    xhr.setRequestHeader(
      'access-token',
      'F5E4C34D-0D3E-4BC7-8EBD-2D2AC4D626EA',
    );
    xhr.setRequestHeader('role-token', '2FCB66F5-D533-4648-BB7A-BABBA23D6F03');
    xhr.setRequestHeader('user-token', userToken);
    xhr.send(json);
  });
}
