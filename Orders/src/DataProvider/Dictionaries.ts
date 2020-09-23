import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';

class Dictionaries {
  // Список регіонів
  static async listRegions() {
    return fetchData(
      `/rest/v1/${currentUser().userToken}/dictionaries/regions`,
      'GET',
    );
  }
}
export {Dictionaries};
