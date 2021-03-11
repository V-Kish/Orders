import {BaseMenu, BaseMenuPosition} from "./BaseMenu";
import {store} from "../Store";
import {ChatDataProvider} from "../../DataProvider/ChatDataProvider";
// import {console} from "../../Common/console";
import {navigator} from "../../../Core/Navigator";
import {currentUser} from "../../../Core/CurrentUser";
import {RenameChat} from "../Group/RenameChat";
import {Alert} from "react-native";

type drawerContainerProps = {
    id: string;
};

export class ChatMenu extends BaseMenu {
    private _model: drawerContainerProps;
    private _renameChatName: RenameChat;
    contentRef: any;
    easingFunc: any;

    constructor(model) {
        super(model.id);
        this._model = model;
        this.onRenameGroupPress = this.onRenameGroupPress.bind(this);
        this.onAddMembersPress = this.onAddMembersPress.bind(this);
        this.onDeleteMembersPress = this.onDeleteMembersPress.bind(this);
        this.onLeaveGroupPress = this.onLeaveGroupPress.bind(this);
        this.onDeleteGroupPress = this.onDeleteGroupPress.bind(this);
        this.onSave = this.onSave.bind(this);
        this._renameChatName = new RenameChat(`${model.id}_RenameChatName`, this.onSave);
    }
    get position() {
        return BaseMenuPosition.right
    }
    update() {
        this.modified = true;
        this.forceUpdate();
    }

    get renameChat() {
        return this._renameChatName;
    }

    onRenameGroupPress() {
        this.renameChat.buttonChangeStatePress();
    }

    async onSave(text: string) {
        if (text === ''){
            return
        }
        if (typeof text === 'undefined') {
            this.renameChat.update(true);
            return
        }
        const chat = store().chats.current;
        if (chat === null) {
            return;
        }
        const response = await ChatDataProvider.renameChat(parseInt(chat.id), text)
        if (response.statusCode !== 200) {
            Alert.alert('Увага!','Не вдалося змінити назву групи')
            return
        }
        try {
            store().chats.current.name.update({name:response.result.newName});
        }catch (error) {
            console.log('error save name group',error)
        }

        this.renameChat.modified = true;
        this.renameChat.step = true;

        store().chats.current.onPress(true);
    }

    async onAddMembersPress() {
        await store().preloader.showWithCallback(() => {
            navigator().navigate('AddMembersScreen');
        });
    }

    async onDeleteMembersPress() {
        await store().preloader.showWithCallback(() => {
            navigator().navigate('DeleteMembersScreen');
        });
    }

    async onLeaveGroupPress() {
        const chat = store().chats.current;
        if (chat === null) {
            return;
        }
        Alert.alert(
            'Увага',
            'Залишити групу ?',
            [
                {
                    text: 'Скасувати',
                    onPress: async () => {

                    },
                    style: 'cancel'
                },
                {
                    text: 'Так',
                    onPress: async () => {
                        try {
                            const response = await ChatDataProvider.deleteUserFromChat(store().chats.selectedChatId, currentUser().userId);
                            console.log('Покинути групу response ->', response);
                            // store().drawerControlsChat.component.closeDrawer();
                            store().chats.remove(chat.id);
                            await store().preloader.showWithCallback(() => {
                                store().chats.selectedChatId = null;
                                navigator().navigate('ChatListScreen');
                                store().preloader.visible = false;
                            });
                        }
                        catch (ex) {
                            console.log('DrawerContainer.onLeaveGroupPress error ->', ex);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }

    async onDeleteGroupPress() {
        const chat = store().chats.current;
        if (chat === null) {
            return;
        }
        Alert.alert(
            'Увага',
            'Видалити чат ?',
            [
                {
                    text: 'Скасувати',
                    onPress: async () => {

                    },
                    style: 'cancel'
                },
                {
                    text: 'Так',
                    onPress: async () => {
                        try {
                            const response = await ChatDataProvider.deleteChat(parseInt(chat.id));
                            console.log('responseDeleteChat',response)
                            store().chats.remove(chat.id);
                            //await store().preloader.showWithCallback(() => {
                                store().chats.selectedChatId = null;
                                //store().drawerControlsChat.component.closeDrawer();
                                navigator().navigate('ChatListScreen');
                                //store().preloader.visible = false;
                                //navigator().navigate('Contacts');
                            //});
                        }
                        catch (ex) {
                            store().preloader.visible = false;
                            console.error('DrawerContainer.onDeleteGroupPress error ->', ex);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }
}
