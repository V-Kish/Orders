import {AppSettings} from '../../../Common/AppSettings';
import {currentUser} from '../../../Core/CurrentUser';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
class IconHelper {
  static hasPhoto(item) {
    if (item !== null && item !== 'none' && typeof item !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  static getUri(hashPhoto) {
    if (
      typeof currentUser().userToken !== 'undefined' &&
      currentUser().userToken !== null
    ) {
      return `${AppSettings.chatEndpoint}/${
        currentUser().userToken
      }/get-user-avatar-by-hash/${hashPhoto}`;
    }
    return '';
  }

  static iconDiameter(diameter) {
    if (diameter === null) {
      return diameter;
    }
    return {
      width: hp(diameter),
      height: hp(diameter),
    };
  }

  static getRenderType(type) {
    if (typeof type === 'undefined') {
      return;
    }
    if (type === 'medium') {
      return false;
    }
    return type.toLowerCase() === 'large';
  }

  static getColor(firstChar) {
    let result = {
      backgroundColor: '#fff',
      color: '#FC532F',
      borderColor: '#FC532F',
    };

    firstChar = firstChar.toLowerCase();

    switch (firstChar) {
      case 'а':
        result.backgroundColor = '#933DA9';
        result.color = '#FFFFFF';
        break;
      case 'м':
        result.backgroundColor = '#933DA9';
        result.color = '#FFFFFF';
        break;
      case 'щ':
        result.backgroundColor = '#933DA9';
        result.color = '#FFFFFF';
        break;
      case 'e':
        result.backgroundColor = '#933DA9';
        result.color = '#FFFFFF';
        break;
      case 'r':
        result.backgroundColor = '#933DA9';
        result.color = '#FFFFFF';
        break;
      case '5':
        result.backgroundColor = '#933DA9';
        result.color = '#FFFFFF';
        break;
      case 'б':
        result.backgroundColor = '#546CA9';
        result.color = '#FFFFFF';
        break;
      case 'н':
        result.backgroundColor = '#546CA9';
        result.color = '#FFFFFF';
        break;
      case 'ъ':
        result.backgroundColor = '#546CA9';
        result.color = '#FFFFFF';
        break;
      case 'f':
        result.backgroundColor = '#546CA9';
        result.color = '#FFFFFF';
        break;
      case 's':
        result.backgroundColor = '#546CA9';
        result.color = '#FFFFFF';
        break;
      case '6':
        result.backgroundColor = '#546CA9';
        result.color = '#FFFFFF';
        break;
      case 'в':
        result.backgroundColor = '#2FA9E4';
        result.color = '#FFFFFF';
        break;
      case 'о':
        result.backgroundColor = '#2FA9E4';
        result.color = '#FFFFFF';
        break;
      case 'ы':
        result.backgroundColor = '#2FA9E4';
        result.color = '#FFFFFF';
        break;
      case 'g':
        result.backgroundColor = '#2FA9E4';
        result.color = '#FFFFFF';
        break;
      case 't':
        result.backgroundColor = '#2FA9E4';
        result.color = '#FFFFFF';
        break;
      case '7':
        result.backgroundColor = '#2FA9E4';
        result.color = '#FFFFFF';
        break;
      case 'г':
        result.backgroundColor = '#F37047';
        result.color = '#FFFFFF';
        break;
      case 'п':
        result.backgroundColor = '#F37047';
        result.color = '#FFFFFF';
        break;
      case 'ь':
        result.backgroundColor = '#F37047';
        result.color = '#FFFFFF';
        break;
      case 'h':
        result.backgroundColor = '#F37047';
        result.color = '#FFFFFF';
        break;
      case 'u':
        result.backgroundColor = '#F37047';
        result.color = '#FFFFFF';
        break;
      case '8':
        result.backgroundColor = '#F37047';
        result.color = '#FFFFFF';
        break;
      case 'д':
        result.backgroundColor = '#D42A2A';
        result.color = '#FFFFFF';
        break;
      case 'р':
        result.backgroundColor = '#D42A2A';
        result.color = '#FFFFFF';
        break;
      case 'э':
        result.backgroundColor = '#D42A2A';
        result.color = '#FFFFFF';
        break;
      case 'i':
        result.backgroundColor = '#D42A2A';
        result.color = '#FFFFFF';
        break;
      case 'v':
        result.backgroundColor = '#D42A2A';
        result.color = '#FFFFFF';
        break;
      case '9':
        result.backgroundColor = '#D42A2A';
        result.color = '#FFFFFF';
        break;
      case 'е':
        result.backgroundColor = '#E59089';
        result.color = '#0D0939';
        break;
      case 'с':
        result.backgroundColor = '#E59089';
        result.color = '#0D0939';
        break;
      case 'ю':
        result.backgroundColor = '#E59089';
        result.color = '#0D0939';
        break;
      case 'j':
        result.backgroundColor = '#E59089';
        result.color = '#0D0939';
        break;
      case 'w':
        result.backgroundColor = '#E59089';
        result.color = '#0D0939';
        break;
      case '0':
        result.backgroundColor = '#E59089';
        result.color = '#0D0939';
        break;
      case 'ё':
        result.backgroundColor = '#F5C84E';
        result.color = '#0D0939';
        break;
      case 'т':
        result.backgroundColor = '#F5C84E';
        result.color = '#0D0939';
        break;
      case 'я':
        result.backgroundColor = '#F5C84E';
        result.color = '#0D0939';
        break;
      case 'k':
        result.backgroundColor = '#F5C84E';
        result.color = '#0D0939';
        break;
      case 'x':
        result.backgroundColor = '#F5C84E';
        result.color = '#0D0939';
        break;
      case 'ж':
        result.backgroundColor = '#8490C8';
        result.color = '#0D0939';
        break;
      case 'у':
        result.backgroundColor = '#8490C8';
        result.color = '#FFFFFF';
        break;
      case 'ї':
        result.backgroundColor = '#8490C8';
        result.color = '#FFFFFF';
        break;
      case 'l':
        result.backgroundColor = '#8490C8';
        result.color = '#FFFFFF';
        break;
      case 'y':
        result.backgroundColor = '#8490C8';
        result.color = '#FFFFFF';
        break;
      case 'з':
        result.backgroundColor = '#4CB684';
        result.color = '#FFFFFF';
        break;
      case 'ф':
        result.backgroundColor = '#4CB684';
        result.color = '#FFFFFF';
        break;
      case 'і':
        result.backgroundColor = '#4CB684';
        result.color = '#FFFFFF';
        break;
      case 'm':
        result.backgroundColor = '#4CB684';
        result.color = '#FFFFFF';
        break;
      case 'z':
        result.backgroundColor = '#4CB684';
        result.color = '#FFFFFF';
        break;
      case 'и':
        result.backgroundColor = '#636363';
        result.color = '#FFFFFF';
        break;
      case 'х':
        result.backgroundColor = '#636363';
        result.color = '#FFFFFF';
        break;
      case 'a':
        result.backgroundColor = '#636363';
        result.color = '#FFFFFF';
        break;
      case 'n':
        result.backgroundColor = '#636363';
        result.color = '#FFFFFF';
        break;
      case '1':
        result.backgroundColor = '#636363';
        result.color = '#FFFFFF';
        break;
      case 'й':
        result.backgroundColor = '#217F4E';
        result.color = '#FFFFFF';
        break;
      case 'ц':
        result.backgroundColor = '#217F4E';
        result.color = '#FFFFFF';
        break;
      case 'b':
        result.backgroundColor = '#217F4E';
        result.color = '#FFFFFF';
        break;
      case 'o':
        result.backgroundColor = '#217F4E';
        result.color = '#FFFFFF';
        break;
      case '2':
        result.backgroundColor = '#217F4E';
        result.color = '#FFFFFF';
        break;
      case 'к':
        result.backgroundColor = '#FC532F';
        result.color = '#FFFFFF';
        break;
      case 'ч':
        result.backgroundColor = '#FC532F';
        result.color = '#FFFFFF';
        break;
      case 'c':
        result.backgroundColor = '#FC532F';
        result.color = '#FFFFFF';
        break;
      case 'p':
        result.backgroundColor = '#FC532F';
        result.color = '#FFFFFF';
        break;
      case '3':
        result.backgroundColor = '#FC532F';
        result.color = '#FFFFFF';
        break;
      case 'л':
        result.backgroundColor = '#FFA726';
        result.color = '#0D0939';
        break;
      case 'ш':
        result.backgroundColor = '#FFA726';
        result.color = '#0D0939';
        break;
      case 'd':
        result.backgroundColor = '#FFA726';
        result.color = '#0D0939';
        break;
      case 'q':
        result.backgroundColor = '#FFA726';
        result.color = '#0D0939';
        break;
      case '4':
        result.backgroundColor = '#FFA726';
        result.color = '#0D0939';
        break;
    }

    return result;
  }
}

export {IconHelper};
