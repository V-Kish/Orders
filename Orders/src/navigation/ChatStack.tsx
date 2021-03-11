import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ChatListScreen} from "../Chat/ChatListScreen";
import {ChatScreen} from "../Chat/ChatScreen";
import {ContactsScreen} from "../Chat/ViewModel/Contacts/ContactsScreen";
import {NewChatScreen} from "../Chat/ViewModel/Group/NewChatScreen";
import {AddMembersScreen} from "../Chat/ViewModel/Group/AddMembersScreen";
import {DeleteMembersScreen} from "../Chat/ViewModel/Group/DeleteMembersScreen";


const Stack = createStackNavigator();

class ChatStack extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        // controllers().drawerSwitch.navigationRef = this.props.navigation;
    }

    render() {
        return (
            <Stack.Navigator headerMode="none" initialRouteName="ChatListScreen">
                {/*Список чатів*/}
                <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
                {/*Скрін чату*/}
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                {/*Скрін контактів*/}
                <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
                {/*Скрін контактів*/}
                <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
                {/*Скрін додавання мешканців у групу */}
                <Stack.Screen name="AddMembersScreen" component={AddMembersScreen} />
                {/*Скрін видалення мешканців з групи*/}
                <Stack.Screen name="DeleteMembersScreen" component={DeleteMembersScreen} />
            </Stack.Navigator>
        );
    }
}

export {ChatStack};
