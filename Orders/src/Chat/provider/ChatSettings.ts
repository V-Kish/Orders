
import {BaseModel} from "../../Common/BaseModel";
import {RenameChat} from "./Group/RenameChat";
import {ChatDataProvider} from "../DataProvider/ChatDataProvider";
import {store} from "./Store";
import {navigator} from "../../Core/Navigator";
import {Alert} from "react-native";
import {currentUser} from "../../Core/CurrentUser";

type chatSettingsProps = {
    id: string
}
class ChatSettings extends BaseModel {
    private _model: chatSettingsProps
    private _isVisible: boolean
    private _renameChatName: RenameChat;
    constructor(_model:chatSettingsProps) {
        super(_model.id);
        this._model = _model
        this._isVisible = false
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.toggle = this.toggle.bind(this)
        this.onRenameGroupPress = this.onRenameGroupPress.bind(this);
        this.onAddMembersPress = this.onAddMembersPress.bind(this);
        this.onDeleteMembersPress = this.onDeleteMembersPress.bind(this);
        this.onLeaveGroupPress = this.onLeaveGroupPress.bind(this);
        this.onDeleteGroupPress = this.onDeleteGroupPress.bind(this);
        this.onSave = this.onSave.bind(this);
        this._renameChatName = new RenameChat(`${_model.id}_RenameChatName`, this.onSave);
    }

    get isVisible(){
        return this._isVisible
    }

    show(){
        if(!this._isVisible){
            this._isVisible = true
            this.forceUpdate()
        }
    }

    hide(){
        if(this._isVisible){
            this._isVisible = false
            this.forceUpdate()
        }
    }

    toggle(){
        this._isVisible = !this._isVisible
        this.forceUpdate()
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
        console.log('response', response)
        try {
            const newName = response.result.newName
            store().chats.current.photo.update({name:newName})
            // store().chats.current?.photo.modified = true
            store().chats.current.name.update({name:newName});
            store().chatHeader.modified = true
            store().chatHeader.forceUpdate()
        }catch (error) {
            console.log('error save name group',error)
        }
        this.renameChat.modified = true
        this.forceUpdate()

        // this.renameChat.modified = true;
        // this.renameChat.step = true;

        // store().chats.current.onPress(true);
    }

    async onAddMembersPress() {
        await store().preloader.showWithCallback(() => {
            store().addGroupChatMembers.canRemoveUsers = false
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
                            navigator().toGoBack()
                            // navigator().navigate('ChatListScreen');
                            // await store().preloader.showWithCallback(() => {
                            //     store().chats.selectedChatId = null;
                            //     navigator().navigate('ChatListScreen');
                            //     store().preloader.visible = false;
                            // });
                        }
                        catch (ex) {
                            console.warn('DrawerContainer.onLeaveGroupPress error ->', ex);
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
                            store().chats.selectedChatId = null;
                            navigator().toGoBack();
                        }
                        catch (ex) {
                            store().preloader.visible = false;
                            console.log('DrawerContainer.onDeleteGroupPress error ->', ex);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }
}

export {
    ChatSettings
}
