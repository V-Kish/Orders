import { Alert } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import { FileSystem } from 'react-native-unimodules';
// import { console } from '../../Common/console';

const RNFS = require('react-native-fs');

class MessageHelper {
  static bytesToSize(bytes, decimals = 1) {
    if (bytes === 0) {
      return '0 Кб';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Кб', 'Мб', 'Гб'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  static async fileToBase64(uri) {
    const fileBase64 = await RNFS.readFile(uri, 'base64');
    return fileBase64;
  }

  static getFileExtension(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : null;
  }

  static getFileExtensionName(fileName) {
    const slices = fileName.split('/');
    return slices[slices.length - 1];
  }

  static getFileNameWithoutExtension(name) {
    const FileName = name.split('.');
    return FileName.splice(0, FileName.length - 1).join('.');
  }

  static base64Split(base64) {
    if (base64.indexOf('data:') === 0) {
      let index = base64.indexOf(';base64,');
      if (index !== -1 && base64.length > index + 8) {
        let result = base64.slice(index + 8);
        console.log('result', result);
        return result;
      }
    }
    return base64;
  }

  static saveFile(path, fileName, extension, base64, i = 0) {
    let newFileName = null;
    RNFS.exists(
        path + fileName + (i !== 0 ? `(${i})` : '') + '.' + extension,
    ).then(exists => {
      if (exists) {
        i++;
        this.saveFile(path, fileName, extension, base64, i);
      } else {
        if (i >= 20) {
          newFileName = MessageHelper.uuidv4();
        } else {
          newFileName = fileName;
        }
        RNFS.writeFile(
            path +
            newFileName +
            (i !== 0 && i < 20 ? `(${i})` : '') +
            '.' +
            extension,
            MessageHelper.base64Split(base64),
            'base64',
        )
            .then(success => {
              //setDisabledBtn(false);
              FileViewer.open(path + newFileName + '.' + extension)
                  .then(() => {
                    // success
                  })
                  .catch(error => {
                    // error
                  });
              console.log('FILE WRITTEN!');
            })
            .catch(err => {
              //setDisabledBtn(false);
              console.log(err.message);
            });
      }
    });
  }

  static uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line no-bitwise
      let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static async openFile(path) {
    console.log('path', path);
    const filePath = path.replace('file://', '');
    await FileViewer.open(filePath);
    return true;
  }

  static async downloadFile(uri: string, fileName = null) {
    const path = FileSystem.documentDirectory + fileName;
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) {
      const img = await FileSystem.downloadAsync(uri, path, {
        headers: {
          'access-token': '1F31C7D6-8E2C-4917-8FAD-36AA4F4690F0',
          'role-token': '2FCB66F5-D533-4648-BB7A-BABBA23D6F03',
        },
      });
      if (img.status !== 200) {
        return '';
      }
    }
    return path;
  }

  static getMessageType(filename) {
    const imageTypes = [
      'jpeg',
      'tiff',
      'png',
      'gif',
      'raw',
      'jpg',
      'jpe',
      'jfif',
      'jfi',
    ];
    const documentTypes = ['doc', 'docx', 'pdf', 'xls', 'txt', 'zip', 'rar', 'apk'];
    if (
        imageTypes.indexOf(
            MessageHelper.getFileExtension(filename.toLowerCase()),
        ) !== -1
    ) {
      return 5;
    } else if (
        documentTypes.indexOf(
            MessageHelper.getFileExtension(filename.toLowerCase()),
        ) !== -1
    ) {
      return 2;
    } else {
      return 8;
    }
  }
}
export { MessageHelper };
