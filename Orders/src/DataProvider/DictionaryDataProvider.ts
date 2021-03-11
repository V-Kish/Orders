import {fetchData} from '../Common/fetchData';
import {currentUser} from '../Core/CurrentUser';

import {
  baseResponse,
  dictionaryBaseResponse,
  requestBodyType,
} from '../DataTypes/BaseTypes';
import {tariffType} from '../DataTypes/osbbTariff';

class DictionaryDataProvider {
  // FOR EXAMPLE
  static async getTariffTypes(): Promise<dictionaryBaseResponse<tariffType>> {
    return fetchData(
      `/rest/v1/${currentUser().userToken}/dictionary/dic_tariffsType`,
      'GET',
    );
  }
}

export {DictionaryDataProvider};
