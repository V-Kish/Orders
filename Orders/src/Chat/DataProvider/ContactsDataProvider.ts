import { currentUser } from "../../Core/CurrentUser";
import { fetchData } from "../../Common/fetchData";
import { RawContactItem } from "../provider/Contacts/ContactItem";

class ContactsDataProvider {

    static LoadContacts(pageIndex: number = 1, pageSize: number = 10000): Promise<Array<RawContactItem>> {
        return new Promise((resolve, reject) => {
            fetchData(`${currentUser().userToken}/${currentUser().currentOsbb.hash}/contacts/load`, 'post', {
                pageIndex: pageIndex,
                pageSize: pageSize,
            },
                null,
                null,
                true
            )
                .then(
                    response => {
                        console.log('contacts/load respose', response)
                        if (response.result && response.result.items) {
                            resolve(response.result.items.map(item => new RawContactItem(item)));
                        }
                        else {
                            resolve([]);
                        }
                    },
                    error => {
                        reject(error);
                    },
                )
                .catch(error => {
                    reject(error);
                });
        });
    }

    static SearchContacts(term: string): Promise<Array<RawContactItem>> {
        return new Promise((resolve, reject) => {
            fetchData(`${currentUser().userToken}/${currentUser().currentOsbb.hash}/contacts/search`, 'post', {
                    pageIndex: 1,
                    pageSize: 1000,
                    sQuery: term,
                },
                null,
                null,
                true
            )
                .then(
                    response => {
                        if (response.result && response.result.items) {
                           resolve(response.result.items.sort(function(a, b) {
                                return  ('' + a.name.toLowerCase()).localeCompare(b.name.toLowerCase());
                            }).map(item => new RawContactItem(item)));
                        }
                        else {
                            resolve([]);
                        }
                    },
                    error => {
                        reject(error);
                    },
                )
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export { ContactsDataProvider };
