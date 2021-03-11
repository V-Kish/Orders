import { Message } from './Message';
import { Base } from './Base';
import { currentUser } from '../../Core/CurrentUser';
import { fetchData } from '../../Common/fetchData';
import { dateParse } from '../../Common/dateParse';
import { convertToUTCString } from '../../Common/dateParse';
import moment from 'moment';
import { store } from './Store';
import { MessagePreloader } from './Messages/MessagePreloader';
import { ContactIcon } from './ContactIcon';
import { ContactItem } from './Contacts/ContactItem';
import {NewMessageIndicator} from "./Messages/NewMessageIndicator";

class MessageListIOS extends Base {

    private _preloader: MessagePreloader;
    private _firstPreloader: MessagePreloader;
    private _refreshing: boolean;
    private _storage: Array<Message>;
    private _isPublic: boolean;
    private _allDownloaded: boolean;
    private _firstLoad: boolean;
    private _appendTrigger: boolean;
    private _contentHeight: number;
    private _newMessageIndicator: NewMessageIndicator;
    private _goUp: boolean;
    private _contentSizeHeight: number;
    private _yValue: number;
    private _yPosition: number
    private _editing: boolean;
    constructor({ id, isPublic }: { id: number, isPublic: boolean }) {
        super(id.toString());
        this._storage = [];
        this.load = this.load.bind(this);
        this.loadOldMessages = this.loadOldMessages.bind(this);
        this.onContentSizeChange = this.onContentSizeChange.bind(this);
        this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);

        this._isPublic = isPublic;
        this._refreshing = false;
        this._allDownloaded = false;

        this._firstLoad = false;
        this._appendTrigger = false;
        this._contentSizeHeight = null;
        this._preloader = new MessagePreloader(`${id}_MessagePreloader`);
        this._firstPreloader = new MessagePreloader(`${id}_FirstPreloader`);
        this._firstPreloader.hidden = false;
        this._contentHeight = 0;
        this._yValue=null;
        this._yPosition=null;
        this._editing=false;
        //indicator of new incoming messages
        this._newMessageIndicator = new NewMessageIndicator({id: `${id}_NewMessageIndicator`, list: this})

        this._goUp = false;
    }

    set goUp(value){
        this._goUp =  value;
    }

    get goUp() {
        return this._goUp;
    }

    get newMessageIndicator() {
        return this._newMessageIndicator;
    }

    get preloader() {
        return this._preloader;
    }
    get firstPreloader() {
        return this._firstPreloader;
    }

    get refreshing() {
        return this._refreshing;
    }
    set refreshing(value) {
        this._refreshing = value;
    }

    get isPublic() {
        return this._isPublic;
    }

    get allDownloaded() {
        return this._allDownloaded;
    }
    set allDownloaded(value) {
        this._allDownloaded = value;
    }

    get firstLoad() {
        return this._firstLoad;
    }
    set firstLoad(value) {
        this._firstLoad = value;
    }

    get appendTrigger() {
        return this._appendTrigger;
    }
    set appendTrigger(value) {
        this._appendTrigger = value;
    }

    get contentHeight() {
        return this._contentHeight;
    }

    get lastMessage() {
        return this.storage[this.storage.length - 1];
    }

    get yPosition(){
        return this._yPosition;
    }

    get yValue(){
        return this._yValue;
    }
    set editing(value: boolean){
        this._editing=value
    }
    reset() {
        this._refreshing = false;
        this.preloader.hide();
    }

    async onMomentumScrollEnd({ nativeEvent }) {
        const contentOffset = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height
        this._yPosition = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
        this._contentSizeHeight = nativeEvent.contentSize.height;
        if (nativeEvent.contentSize.height - contentOffset > 100) {
            this._goUp = true;
        }else {
            this._goUp = false;
            this.newMessageIndicator.clearIndicator();
            this.newMessageIndicator.modified = true;
            this.newMessageIndicator.forceUpdate();
        }
        if (nativeEvent.contentOffset.y < 10) {
            await this.loadOldMessages();
        }
    }

    onContentSizeChange(contentWidth: number, contentHeight: number) {
        this._yValue = contentHeight;
        if (this.appendTrigger) {
            console.log('appendTrigger onContentSizeChange');
            this.appendTrigger = false;

            if (this.refreshing) {
                this.refreshing = false;
                store().chats.current.forceUpdate();
            }

            if (contentHeight - this._contentSizeHeight > 30) {
                this.scrollTo(contentHeight - this._contentSizeHeight);
            }
        }
        if(this._editing){
            this._editing=false;
            this.scrollToEnd();
        }
        if (this.firstLoad) {
            this.firstLoad = false;
            console.log('firstload onContentSizeChange');

            this.forceUpdate(() => {
                this.scrollToEnd();
                this.preloader.hide();
                store().preloader.visible = false;
            });
        }

        this._contentHeight = contentHeight;
    }

    scrollToEnd(value = false) {
        try {
            if (this.appendTrigger) {
                return;
            }
            store().chats.current.refOnScrollList.scrollToEnd({ animated: value });
            // store().chats.current.ref.scrollToEnd({ animated: value });
        }
        catch (ex) {
            console.error('MessageList.scrollToEnd error ->', ex);
        }
    }

    scrollTo(y: number) {
        try {
            store().chats.current.ref.scrollTo({ y: y, animated: false });
        }
        catch (ex) {
            console.error('MessageList.scrollTo error ->', ex);
        }
    }

    get storage() {
        return this._storage;
    }

    findIndex(id) {
        if (!id){
            return null;
        }
        const index = this.storage.findIndex(message => message.id === id || message.subId === id);
        return index !== -1 ? index : null;
    }

    get(id) {
        if(!id){
            return null;
        }
        const index = this.findIndex(id);
        return index !== null ? this.storage[index] : null;
    }

    delete(id) {
        const index = this.findIndex(id);
        this.storage.splice(index, 1);
        this.modified = true;
        this.forceUpdate();
    }

    add(model) {
        const message = new Message(model);
        this.storage.push(message);
        return message;
    }

    addOld(model) {
        const message = new Message(model, this);
        this.storage.unshift(message);
        return message;
    }

    update(model, forceUpdate = true) {
        let message = this.get(model.id) || this.get(model._id);
        if (message === null) {
            message = this.get(model.id.toString())
        }
        if (message !== null) {
            message.update(model, forceUpdate);
        }
        return message;
    }

    addOrUpdate(model, isLoadOld: boolean, forceUpdate = true) {
        if (!isLoadOld) {
            return this.update(model, forceUpdate) || this.add(model);
        } else {
            return this.update(model, forceUpdate) || this.addOld(model);
        }
    }

    static addOrUpdateSeparator(item, messageDate, list: MessageListIOS, isLoadOld: boolean) {
        const currentMessageDate = dateParse(
            convertToUTCString(item.date, global.__timeOffset__),
        ).getDay();
        const separatorId = moment(item.uFromDate, 'DD.MM.YYYYTHH:mm:ss').format(
            'DD.MM.YYYY',
        );
        const isExists = list.storage.findIndex(
            current => current.id === separatorId,
        );
        if (messageDate !== currentMessageDate && isExists === -1) {
            messageDate = currentMessageDate;
            const model = {
                id: separatorId,
                messageType: 200,
                groupId: item.groupId,
                ownerUserFrom: item.ownerUserFrom,
                status: item.status,
                uFrom: null,
                uFromStatus: item.uFromStatus,
                uFromDate: item.uFromDate,
                uFromToken: item.uFromToken,
                isEdited: item.isEdited,
                _subId: item._id,
            };
            if (list.get(separatorId) !== null) {
                list.update(model);
            }
            else {
                if (!isLoadOld) {
                    list.add(model);
                }
                else {
                    list.addOld(model)
                }
            }
            return messageDate;
        }
    }

    bodyForOld() {
        const pageSize = 20;
        const calcPageSize = parseInt(this.messageCount / pageSize, 10) + 1;
        const body = {
            pageSize: pageSize,
            pageIndex: calcPageSize,
        };
        return body;
    }
    get messageCount(): number {
        let counter = 0
        this.storage.forEach((item) => {
            if (item.messageType !== 200) {
                counter++;
            }
        })
        return counter;
    }
    async loadOneMessage(messageId: number) {
        const body = {
            pageIndex: 1,
            pageSize: this.messageCount,
        };
        const url = `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${this.id}/messages/load-from/${messageId}`;
        const response = await fetchData(url, 'post', body);
        this.update(response.result.items[response.result.items.length - 1], true);
    }
    async load(
        body = {
            pageIndex: 1,
            pageSize: 20,
        },
        // add new line messageFromId: null,
        isLoadOld: boolean = false,
        reload:boolean = false
    ) {
        try {
            let url = `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${this.id}/messages/load`;
            if (this.storage.length !== 0 && !isLoadOld && !reload) {
                let messageFromId = -1;
                for (let i = this.storage.length - 1; i >= 0; i--) {
                    //this.storage[i].id > 0
                    if (this.storage[i].messageType !== 200 && this.storage[i].id > 0) {
                        messageFromId = this.storage[i].id;
                        // messageFromId = this.storage[i].id;
                        break;
                    }
                }
                url = `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${this.id}/messages/load-from/${messageFromId}`;
                body.messageFromId = messageFromId;
            }
            console.log('load url', url);
            const response = await fetchData(url, 'post', body, null,null,true);
            console.log('response12',response)
            if (response.statusCode && response.statusCode === 200) {
                if (response.result.items.length < body.pageSize) {
                    console.log('load all', this.allDownloaded);
                    this.allDownloaded = true;
                }
                if (this.refreshing) {
                    this.refreshing = false;
                    store().chats.current.forceUpdate();
                }
                if (response.result.items.length !== 0) {
                    let messageDate = null;
                    const firstLoadSize = this.storage.length === 0
                    const list = firstLoadSize ?response.result.items.reverse() : response.result.items ;
                    list.forEach(item => {
                        console.log('forEach good',item)
                        if (!isLoadOld) {
                            messageDate = MessageListIOS.addOrUpdateSeparator(
                                item,
                                messageDate,
                                this,
                                false
                            );
                            console.log('messageDate',messageDate)
                            this.addOrUpdate(item, false, false);
                        }
                        else {
                            this.addOrUpdate(item, true, false);
                            messageDate = MessageListIOS.addOrUpdateSeparator(
                                item,
                                messageDate,
                                this,
                                true
                            );
                        }
                    });
                    await this.iconized();
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        catch (ex) {
            console.log('MessageList.load error ->', ex);
        }
        return false;
    }

    static isServiceMessage(message: Message) {
        return message.messageType === 200 || 100
    }

    async iconized() {
        try {
            await store().contactsItems.refresh(false);
            this.storage.forEach((item, i) => {
                const user = store().contactsItems.get(item.uFrom) || null;
                if (user === null) {
                    return;
                }
                if(i === 0 || (i > 0 && item.uFrom !== this.storage[i - 1].uFrom)
                    || (i > 0 && this.storage[i - 1].messageType === 100)
                    || (i > 0 && this.storage[i - 1].messageType === 200)){
                    item.userName = user.name;
                }else {
                    if(item.userName !== null) {
                        item.userName = null;
                        item.modified = true;
                        item.forceUpdate();
                    }
                }
                if (i === this.storage.length - 1) {
                    item.contactIcon = ContactItem.create(user).contactIcon;
                    return;
                }
                if (item.uFrom !== this.storage[i + 1].uFrom ||
                    this.storage[i + 1].messageType === 100 ||
                    this.storage[i + 1].messageType === 200) {
                    if (user !== null) {
                        item.contactIcon = ContactItem.create(user).contactIcon;
                    }
                } else {
                    if(item.contactIcon !== null){
                        item.contactIcon = null;
                        item.modified = true;
                        item.forceUpdate();
                    }
                }
            });
        }
        catch (ex) {
            console.error('MessageList.iconized error ->', ex);
        }
    }

    async showMessagesPreloader() {
        try {
            // const messages = [];
            // const len = Math.min(20, this.storage.length);
            // for (let i = 0; i < len; i++) {
            //     messages.push(Message.clone(this.storage[i],this.storage[i].chat));
            // }
            // this.preloader.show(messages);
        }
        catch (ex) {
            console.error('MessageList.showMessagesPreloader -> error', ex);
        }
    }

    async loadOldMessages() {
        this.refreshing = true;

        // await this.showMessagesPreloader();

        const body = this.bodyForOld();
        console.log('loadOldMessages body', body);

        this.load(body, true)
            .then(
                answer => {
                    if (answer) {
                        this.appendTrigger = true;
                        this.modified = true;
                        this.forceUpdate(() => {
                            this.preloader.hide();
                        });
                    }
                    else {
                        this.preloader.hide();
                    }
                },
                () => {
                    this.preloader.hide();
                },
            )
            .catch(
                () => {
                    this.preloader.hide();
                }
            );
    }

    async loadNewMessages(callback) {
        this.load()
            .then(
                (answer) => {
                    console.log('pushMessagesHandler._updateMessageListload answer ->', answer);
                    if (answer) {
                        this.modified = true;
                        this.forceUpdate(callback);
                    }
                },
                (error) => {
                    console.error('pushMessagesHandler._updateMessageList -> error ', error);
                }
            )
            .catch(
                (ex) => {
                    console.error('pushMessagesHandler._updateMessageList -> error ', ex);
                }
            );
    }
}

export { MessageListIOS };
