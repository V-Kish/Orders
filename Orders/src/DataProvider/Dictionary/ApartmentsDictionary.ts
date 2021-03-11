import {BaseDictionary} from './BaseDictionary';
import {loadData, UserDataProvider} from '../UserDataProvider';
import {DictionaryDataProvider} from '../DictionaryDataProvider';
import {baseResponse} from '../../DataTypes/BaseTypes';
import {osbbDictionaryTransactionType} from '../../DataTypes/DictionaryTypes';
import {osbbHousesApartmentsItem} from "../../DataTypes/osbbHousesApartmentsItem";
import {currentUser} from "../../Core/CurrentUser";

class ApartmentsDictionary extends BaseDictionary<any> {
    constructor(id: string) {
        super(id);
    }

    async query() {
        return await loadData<baseResponse<osbbHousesApartmentsItem>>(
            UserDataProvider.getAndSearchApartments,
            {
                osbbHash: currentUser().currentOsbb?.hash,
                pageIndex:1,
                pageSize: 100000
            },
        );
    }
}

export {ApartmentsDictionary};
