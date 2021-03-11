import { Base } from "../Base";
import { navigator } from '../../controllers/Navigator';
import { store } from "../Store";
import { ChatDataProvider } from "../../DataProvider/ChatDataProvider";
import { AppLog } from "../../Common/AppLog";
import { Alert} from "react-native";
import {currentUser} from "../../controllers/CurrentUser";
import {RenameChat} from "../Group/RenameChat";
import {ContactsHeader} from "../Contacts/ContactsHeader";
import {CallIconModel} from "../../classes/Calls/CallIconModel";

type drawerContainerProps = {
    id: string;
};

class DrawerContainer extends Base {
    private _model: drawerContainerProps;
    private _renameChatName: RenameChat;
    private _callIcon: CallIconModel;

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

    update() {
        const chat = store().chats.current;
        if (chat !== null) {
            chat.chatMembersList.modified = true;
        }
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
            AppLog.log('error save name group',error)
        }

          this.renameChat.modified = true;
          this.renameChat.step = true;
        store().chatHeader.update(chat);
        store().chats.drawerContainer.update();
        store().drawerControlsChat.update();
        store().drawerControlsChat.component.closeDrawer();
        store().chats.current.onPress(true);
    }

    async onAddMembersPress() {
        await store().preloader.showWithCallback(() => {
            navigator().navigate('AddMembersScreen');
        });
        store().drawerControlsChat.component.closeDrawer()
    }

    async onDeleteMembersPress() {
        await store().preloader.showWithCallback(() => {
            navigator().navigate('DeleteMembersScreen');
        });
        store().drawerControlsChat.component.closeDrawer()
    }

    async onLeaveGroupPress() {
        store().drawerControlsChat.component.closeDrawer();
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
                            AppLog.log('Покинути групу response ->', response);
                            store().drawerControlsChat.component.closeDrawer();
                            store().chats.remove(chat.id);
                            await store().preloader.showWithCallback(() => {
                                store().chats.selectedChatId = null;
                                navigator().navigate('Contacts');
                                store().preloader.visible = false;
                            });
                        }
                        catch (ex) {
                            AppLog.error('DrawerContainer.onLeaveGroupPress error ->', ex);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }

    async onDeleteGroupPress() {
        store().drawerControlsChat.component.closeDrawer();
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
                            store().chats.remove(chat.id);
                            await store().preloader.showWithCallback(() => {
                                store().chats.selectedChatId = null;
                                store().drawerControlsChat.component.closeDrawer();
                                navigator().navigate('Contacts');
                                store().preloader.visible = false;
                            });
                        }
                        catch (ex) {
                            store().preloader.visible = false;
                            AppLog.error('DrawerContainer.onDeleteGroupPress error ->', ex);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }
}

export { DrawerContainer };
