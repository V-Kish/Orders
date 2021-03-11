import { Base } from '../Base';
import {GroupContacts, SelectedContacts} from '../Contacts/SelectedContacts';
import { fetchData } from '../../../Common/fetchData';
import { currentUser } from '../../../Core/CurrentUser';
import { store } from "../Store";
// import { navigator } from '../../controllers/Navigator';
import {Button} from "../../../Models/Components/Button";
import {ICONS} from "../../../constants/icons";

class Group extends Base {
    id: string;
    private _addMembers: GroupContacts;
    private _button: Button;

    constructor({ id }: { id: string }) {
        super(id);
        this.onMembersSelected = this.onMembersSelected.bind(this);
        this._addMembers = new GroupContacts({ id: `${id}_ContactsHeaderAddMembers`, onMembersSelected: this.onMembersSelected });
        this.deleteMembers = this.deleteMembers.bind(this);
        this._button = new Button({
            id: `${id}_ButtonText`,
            title: '',
            onPress: this.deleteMembers,
            style: 'button',
            icon: ICONS.primary
            // icon: require('../../assets/img/Icons/checked/Shape.png')
        });

    }
    get buttonDeleteMembers() {
        return this._button;
    }
    deleteMembers() {
        //FETCH
        this.deleteMembersFromChat().then();
    }
    get addMembers() {
        return this._addMembers;
    }

    async deleteMembersFromChat() {
        // try {
        //     const response = await fetchData(
        //         `api-v1/${
        //             currentUser().userToken
        //         }/chat/${store().chats.selectedChatId}/members/${userID}/remove`,
        //         'post',
        //         { userId },
        //     );
        //     if (
        //         response.hasOwnProperty('statusCode') &&
        //         response.statusCode === 200
        //     ) {
        //         navigator().navigate('Chat')
        //         return true;
        //     }
        // } catch (e) {
        //     AppLog.log('getGroupInfo', e);
        //     if (e.statusCode === 403) {
        //         return false;
        //     } else {
        //         throw e.statusCode;
        //     }
        // }
    }
    onMembersSelected(selectedContacts: SelectedContacts) {
        this.addMembersInGroup(selectedContacts)
    }
    addMembersInGroup(selectedContacts: SelectedContacts) {
        let members = [];
        selectedContacts.items.forEach(item => members.push(item.id))
        fetchData(
            `${currentUser().userToken}/${currentUser().currentOsbb?.hash}/chat/${store().chats.selectedChatId}/members/add`,
            'post',
            { members },
            null,
            null,
            true
        ).then(
            (response) => {
                store().chats.current.onPress(true);

            },
            error => console.log('deleteUser', error),
        );
    }
}

export { Group };
