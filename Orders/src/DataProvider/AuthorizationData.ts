import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';

class AuthorizationData {
  // Список регіонів
  static async AuthorizationFetch(body) {
    return fetchData(
      `/rest/v1/${currentUser().userToken}/dictionaries/regions`,
      'POST',
      body,
    );
  }
}
export {AuthorizationData};
