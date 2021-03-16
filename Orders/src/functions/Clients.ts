import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody, ChatList, ChatMessagesList, chatMessage, ClientsList} from '../Types';

import { 
    ClientsListAction,
    ClientDetails,
    ClientsListPaginationAction
} from  '../store/actions/Clients';

import {Linking} from 'react-native';

class Clients {
    static async getClientsList(
        dispatch: Dispatch<any>,
        searchText = '',
        pagination = false,
        Data: ClientsList = {
            pageIndex: 1,
            PageSize: 10,
            query: "",
        }
    ) { 
        try {
            let body: AuthBody = Data;
            body.sQuery = searchText;
            console.log("KUSHI SEARCH",body)
            const list = await UserDataProvider.getClients(body);
            console.log(list.data);
            if (list.statusCode === 200) {
                if (pagination) {
                    // @ts-ignore
                    dispatch(ClientsListPaginationAction(list.data));
                } else {
                    // @ts-ignore
                    dispatch(ClientsListAction(list.data));
                }
                return false;
            }
            if (list.statusCode === 403 && list.statusMessage === 'forbidden') {
            // @ts-ignore
            navigator().navigate('ErrorScreen');
            // dispatch(PreloaderMain(false));
            return;
            }
            if (list.statusCode === 403) {
            // alert(list.data.message);
            navigator().navigate('ErrorScreen');
            // dispatch(PreloaderMain(false));
            return;
            }
            if (list.statusCode !== 200) {
            // @ts-ignore
            // alert(list.result.message);
            // dispatch(PreloaderMain(false));
            return false;
            }
        } catch(e){
            console.log(e);
            return;
        }

    }
};

export {Clients};
