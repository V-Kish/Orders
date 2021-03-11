import { Base } from "../Base";
import { fetchData } from '../../../Common/fetchData';
import { currentUser } from '../../../Core/CurrentUser';
import { listChatsProvider } from '../../components/ChatListProvider';
import { store } from '../Store';
import {navigator} from "../../../Core/Navigator";
import {Button} from "../../../Models/Components/Button";
// import {console} from "../../Common/console";
type modalDeleteGroupProps ={
    id:string;
    chatId:string;
    groupName:string;
    hidden?:boolean;

}
class ModalDeleteGroup extends Base {
    private _model: modalDeleteGroupProps;
    private _deleteButton: Button;
    private _cancelButton: Button;

    constructor(model: modalDeleteGroupProps) {
        super(model.id);
        this._model = model;
        this.onDeletePress = this.onDeletePress.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this._deleteButton = new Button({
            id: `${model.id}_DeleteButton`, title: 'Так', style: 'btnYes', onPress: this.onDeletePress });
        this._cancelButton = new Button({ id: `${model.id}_CancelButton`, title: 'Ні', style: 'btnNo', onPress: this.onCancel });
    }
    get deleteButton() {
        return this._deleteButton;
    }
    get cancelButton() {
        return this._cancelButton;
    }
    get isModalShow() {
        return this._model.isModalShow;
    }
    get groupName() {
        return this._model.groupName;
    }
    get hidden() {
        return this._model.hidden || true;
    }
    set hidden(value: boolean) {
        if (this._model.hidden !== value) {
            this._model.hidden = value;
            this.modified = true;
            this.forceUpdate();
        }
    }
    onCancel() {
        this.hidden = true;
    }
    onDeletePress() {
        this.hidden = true;
        this.deleteChat().then(() => {
            listChatsProvider().Init(
                currentUser().userToken,
                function (data) {
                    store().chats.selectedChatId = null;
                    store().preloader.visible = true;
                    navigator().navigate('Contacts');
                },
                function (data) {
                    console.log(
                        'error delete chat',
                        data,
                    );
                },
            );
        });
    }
    deleteChat() {
        return new Promise((resolve, reject) => {
            fetchData(
                `${currentUser().userToken}/${currentUser().currentOsbb?.hash}/chat/${this._model.chatId}/remove`,
                'post',
                {
                    userId: currentUser().userId,
                },
                null,
                null,
                true
            ).then(
                response => {
                    console.log('responseDelteChat',response)
                    if (response.statusCode === 200) {
                        resolve();
                    } else {
                        reject();
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

export { ModalDeleteGroup };
