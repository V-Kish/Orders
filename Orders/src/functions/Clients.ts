import {UserDataProvider} from '../DataProvider/UserDataProvider';
import {navigator} from '../Core/Navigator';
import {Dispatch} from 'redux';
import {PhoneInfo} from '../Core/PhoneInfo';
import {AuthBody, ChatList, ChatMessagesList, chatMessage} from '../Types';

import {Linking} from 'react-native';

class Clients {
    static async getClientsList(

    ) { 
        let body = {};
        const list = await UserDataProvider.getClients();
        console.log("REQUEST", list)
    }
};

export {Clients};