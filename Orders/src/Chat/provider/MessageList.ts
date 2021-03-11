import {Message} from './Message';
import {Base} from './Base';
import {currentUser} from '../../Core/CurrentUser';
import {fetchData} from '../../Common/fetchData';
import {dateParse} from '../../Common/dateParse';
import {convertToUTCString} from '../../Common/dateParse';
// @ts-ignore
import moment from 'moment';
import {store} from './Store';
import {MessagePreloader} from './Messages/MessagePreloader';
import {ContactItem} from './Contacts/ContactItem';
import {NewMessageIndicator} from "./Messages/NewMessageIndicator";
import DataSource from "../ViewModel/DataSource";
import {GoBottomModel} from "./Messages/GoBottom";
import { exists } from 'react-native-fs';


class MessageList extends Base {
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
    private _dataSource: DataSource;
    private _firstVisibleItem: number;
    private _lastVisibleItem: number;
    private _goBottom: GoBottomModel;
    private _inverted: boolean

    constructor({id, isPublic}: { id: number, isPublic: boolean }) {
        super(id.toString());
        this._storage = [];

        this._dataSource = new DataSource(this._storage, (item, index) => item.id);
        this._firstVisibleItem = 0;
        this._lastVisibleItem = 0;

        this.load = this.load.bind(this);
        this.loadOldMessages = this.loadOldMessages.bind(this);
        this.onContentSizeChange = this.onContentSizeChange.bind(this);
        this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
        this.scrollToEnd = this.scrollToEnd.bind(this);
        this.showNewMessageIndicator = this.showNewMessageIndicator.bind(this);
        this.separatorListener = this.separatorListener.bind(this)
        this.iconizedListener = this.iconizedListener.bind(this)

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
        this._yValue = null;
        this._yPosition = null;
        this._editing = false;
        //indicator of new incoming messages
        this._newMessageIndicator = new NewMessageIndicator({id: `${id}_NewMessageIndicator`, list: this})
        this._goBottom = new GoBottomModel({id: `${id}_GoBottom`})

        this._goUp = true;
        this._inverted = store().recyclerViewInverted
        // this._recyclerModel = new RecyclerModel({id: 'recyclerModel'})
    }

    set goUp(value) {
        this._goUp = value;
    }

    get goUp() {
        return this._goUp;
    }
    get goBottom() {
        return this._goBottom;
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

    get inverted() {
        return this._inverted
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

    get yPosition() {
        return this._yPosition;
    }

    get yValue() {
        return this._yValue;
    }

    set editing(value: boolean) {
        this._editing = value
    }

    clearData() {
        this._storage = []
        this.dataSource.clearData()
    }

    reset() {
        this._refreshing = false;
        this.preloader.hide();
    }

    async showNewMessageIndicator(){
        this._goUp = true;
        //this.goBottom.isVisible = false;
    }

    async onMomentumScrollEnd({nativeEvent}) {
        const contentOffset = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
        this._yPosition = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
        this._contentSizeHeight = nativeEvent.contentSize.height;
        if (nativeEvent.contentSize.height - contentOffset > 100) {
        } else {
        }
        if (nativeEvent.contentOffset.y < 10) {
            await this.loadOldMessages();
        }
    }

    onContentSizeChange(contentWidth: number, contentHeight: number) {
        this._yValue = contentHeight;
        if (this._editing) {
            this._editing = false;
            // this.scrollToEnd();
        }
        if (this.firstLoad) {
            this.firstLoad = false;
            // console.log('first load onContentSizeChange');

            this.forceUpdate(() => {
                // this.scrollToEnd();
                this.preloader.hide();
                store().preloader.visible = false;
            });
        }

        this._contentHeight = contentHeight;
    }
    //PushMsgHandler
    scrollToEnd(value = false) {
        try {
            if (this.appendTrigger) {
                return;
            }
            console.log('scrollToEnd', this.dataSource.size());
            // store().chats.current.items.dataSource.scrollToEnd();
            // this.goUp = false;
            // this.newMessageIndicator.clearIndicator();
            // this.newMessageIndicator.modified = true;
            // this.newMessageIndicator.forceUpdate();
            // store().chats.current.refOnScrollList.scrollToEnd({animated: value});
            // ^76778687ggff1122222
            // store().chats.current.ref.scrollToEnd({ animated: value });
        } catch (ex) {
            // console.error('MessageList.scrollToEnd error ->', ex);
        }
    }

    scrollTo(y: number) {
        try {
            store().chats.current.ref.scrollTo({y: y, animated: false});
        } catch (ex) {
            // console.error('MessageList.scrollTo error ->', ex);
        }
    }

    get storage() {
        return this._storage;
    }

    get dataSource() {
        return this._dataSource;
    }

    get firstVisibleItem() {
        let visibleItems = this._dataSource.visibleItems();
        return visibleItems[0];
    }

    get lastVisibleItem() {
        let visibleItems = this._dataSource.visibleItems();
        return visibleItems[1];
    }

    get recyclerModel(){
        return this._recyclerModel
    }

    findIndex(id) {
        if (!id) {
            return null;
        }
        const index = this.storage.findIndex(message => message.id === id || message.subId === id);
        return index !== -1 ? index : null;
    }

    get(id) {
        if (!id) {
            return null;
        }
        const index = this.findIndex(id);
        return index !== null ? this.storage[index] : null;
    }

    delete(id) {
        const index = this.findIndex(id);
        this.storage.splice(index, 1);
        // this._dataSource[index].message = "Повідомлення видалено"
        // this._dataSource[index].modified = true
        // this._dataSource.forceUpdate()
        // this._dataSource.splice(index, 1);

        this.modified = true;
        this.forceUpdate();
    }

    add(model) {
        const message = new Message(model, this);
        // this.storage.push(message);
        this._dataSource.push(message);

        return message;
    }

    addOld(model) {
        const message = new Message(model, this);
        // this.storage.unshift(message);
        if(store().recyclerViewInverted){
            this._dataSource.push(message)
        } else {
            this._dataSource.unshift(message);
        }


        return message;
    }

    unShift(model){
        try{
            this.separatorListener(model, false, true)
        } catch(e){
            console.log(e)
        }
        const message = new Message(model, this);
        try{
            this.iconizedListener(message, true)
        } catch(e){
            console.log('addOrUpdate error', e)
        }
        // this.storage.unshift(message);
        this._dataSource.unshift(message);
        // this._dataSource.unshift(message);


        return message;
    }

    update(model, forceUpdate = true) {
        let message = this.get(model.id) || this.get(model._id);
        if (message === null) {
            message = this.get(model.id.toString())
        }
        if (message !== null) {
            message.update(model, forceUpdate);
            this._dataSource.set(this.findIndex(model.id), message)
        }
        return message;
    }

    addOrUpdate(model, isLoadOld: boolean, forceUpdate = true) {
        try{
            this.separatorListener(model, isLoadOld)
            this.iconizedListener(model)
        } catch(e){
            console.log('addOrUpdate error', e)
        }
        if (!isLoadOld) {
            return this.update(model, forceUpdate) || this.add(model);
        } else {
            return this.update(model, forceUpdate) || this.addOld(model);
        }
    }

    addOrUnShift(model, isLoadOld: boolean, forceUpdate = true){
        return this.update(model, forceUpdate) || this.unShift(model);
    }

    static addOrUpdateSeparator(item, messageDate, list: MessageList, isLoadOld: boolean) {
        const currentMessageDate = dateParse(
            convertToUTCString(item.date, global.__timeOffset__),
        ).getDay();
        const separatorId = moment(item.uFromDate, 'DD.MM.YYYYTHH:mm:ss').format(
            'DD.MM.YYYY',
        );
        const isExists = list.storage.findIndex(
            current => current.id === separatorId,
        );
        let nextItemDateChanged = false
        let nextItemDateValue = ''
        // recyclerItemRevert
        try{
            // const currentIndex = list.storage.findIndex(
            //     current => current._id == item.id
            // )
            const nextItemDate = moment(list.storage[list.storage.length-1].uFromDate, 'DD.MM.YYYYTHH:mm:ss').format(
                'DD.MM.YYYY',
            );
            if(separatorId!== nextItemDate){
                nextItemDateChanged = true
                nextItemDateValue = nextItemDate
            }
        } catch(e){
            console.log('addOrUpdateSeparator error', e)
        }
        const shouldToAddSeparator = store().recyclerViewInverted
            ? nextItemDateChanged
            : messageDate !== currentMessageDate && isExists === -1
        if (shouldToAddSeparator) {
            messageDate = currentMessageDate;
            const model = {
                id: separatorId,
                messageType: 200,
                groupId: item.groupId,
                ownerUserFrom: item.ownerUserFrom,
                status: item.status,
                uFrom: null,
                uFromStatus: item.uFromStatus,
                uFromDate: store().recyclerViewInverted ? nextItemDateValue : item.uFromDate,
                uFromToken: item.uFromToken,
                isEdited: item.isEdited,
                _subId: item._id,
            };
            if (list.get(separatorId) !== null) {
                list.update(model);
            } else {
                if (!isLoadOld) {
                    list.add(model);
                } else {
                    list.addOld(model)
                }
            }
            return messageDate;
        }
    }

    bodyForOld() {
        const pageSize = 20;
        // @ts-ignore
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
        reload: boolean = false
    ) {
        try {
            let url = `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${this.id}/messages/load`;
            if (this.storage.length !== 0 && !isLoadOld && !reload) {
                let messageFromId = -1;
                for (let i = this.storage.length - 1; i >= 0; i--) {
                    //this.storage[i].id > 0
                    // @ts-ignore
                    if (this.storage[i].messageType !== 200 && this.storage[i].id > 0) {
                        // @ts-ignore
                        messageFromId = this.storage[i].id;
                        break;
                    }
                }
                url = `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${this.id}/messages/load-from/${messageFromId}`;
                // @ts-ignore
                body.messageFromId = messageFromId;
            }
            const response = await fetchData(url, 'post', body, null,null,true);
            if (response.statusCode && response.statusCode === 200) {
                if (response.result.items.length < body.pageSize) {
                    this.allDownloaded = true;
                }
                if (this.refreshing) {
                    this.refreshing = false;
                    store().chats.current.forceUpdate();
                }
                if (response.result.items.length !== 0) {
                    let messageDate = null;
                    store().settings.sizeAllItems =  response.result.items.length;
                    // my list depends on recyclerVievInverted
                    // false = reverse list
                    // true = default list
                    const recyclerList = store().recyclerViewInverted
                        ? response.result.items
                        : response.result.items.reverse()
                    const firstLoadSize = this.storage.length === 0
                    // console.log('initBody start')
                    recyclerList.forEach(item => {
                        // console.log('visible item', this._dataSource.visibleItems())
                        if (!isLoadOld) {
                            // messageDate = MessageList.addOrUpdateSeparator(
                            //     item,
                            //     messageDate,
                            //     this,
                            //     false
                            // );
                            // console.log('isLoadOldFALSE', item)
                            // console.log('firstLoadSize',firstLoadSize)
                            // if(store().recyclerViewInverted && !firstLoadSize){
                            if(!firstLoadSize){
                                this.addOrUnShift(item, false, false)
                            } else {
                                this.addOrUpdate(item, false, false);
                            }
                            // } else {
                            //     this.addOrUpdate(item, false, false);
                            // }
                        } else {
                            // if(!store().recyclerViewInverted){
                            //     this.addOrUpdate(item, true, false);
                            // }
                            // messageDate = MessageList.addOrUpdateSeparator(
                            //     item,
                            //     messageDate,
                            //     this,
                            //     // this,
                            //     true
                            // );
                            // if(store().recyclerViewInverted){
                            this.addOrUpdate(item, true, false);
                            // }
                            console.log('messageDate old', messageDate)
                        }
                    });
                    // console.log('initBody')
                    // this.recyclerModel.initBody(0,15)
                    // await this.iconized();
                    return true;
                } else {
                    return false;
                }
            }
        } catch (ex) {
            console.log('MessageList.load error ->', ex);
        }
        return false;
    }

    static isServiceMessage(message: Message) {
        return message.messageType === 200 || 100
    }

    async iconized() {
        // try {
        await store().contactsItems.refresh(false);
        this.storage.forEach((item, i) => {
            const user = store().contactsItems.get(item.uFrom) || null;
            if (user === null) {
                return;
            }
            if (user !== null) {
                // const nextItem = store().recyclerViewInverted ? i+1 : i-1
                const prevItem = store().recyclerViewInverted ? i+1 :i-1
                const firstItem = store().recyclerViewInverted ? i === this.storage.length-1 : i === 0
                if (firstItem || (i > 0 && item.uFrom !== this.storage[prevItem].uFrom)
                    || (i > 0 && this.storage[prevItem].messageType === 100)
                    || (i > 0 && this.storage[prevItem].messageType === 200)) {
                    item.contactIcon = ContactItem.create(user).contactIcon;
                    item.userName = user.name;
                }
                item.modified = true;
                item.forceUpdate();
            }
            return;

        });
        // } catch (ex) {
        //     console.error('MessageList.iconized error ->', ex);
        // }
    }
    async showMessagesPreloader() {
        try {
            const messages = [];
            const len = Math.min(20, this.storage.length);
            for (let i = 0; i < len; i++) {
                messages.push(Message.clone(this.storage[i], this.storage[i].chat));
            }
            this.preloader.show(messages);
        } catch (ex) {
            console.error('MessageList.showMessagesPreloader -> error', ex);
        }
    }

    async loadOldMessages() {
        this.refreshing = true;

        // await this.showMessagesPreloader();

        const body = this.bodyForOld();
        // console.log('loadOldMessages body', body);

        this.load(body, true)
            .then(
                answer => {
                    if (answer) {
                        // this.appendTrigger = true;
                        this.modified = true;
                        this.forceUpdate(() => {
                            this.preloader.hide();
                        });
                    } else {
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

    // make separator message
    makeSeparator(item, date = null){
        const separatorId = moment(date===null ? item.uFromDate : date, 'DD.MM.YYYYTHH:mm:ss').format(
            'DD.MM.YYYY',
        );
        const model = {
            id: separatorId,
            messageType: 200,
            groupId: item.groupId,
            ownerUserFrom: item.ownerUserFrom,
            status: item.status,
            uFrom: null,
            uFromStatus: item.uFromStatus,
            uFromDate: date,
            uFromToken: item.uFromToken,
            isEdited: item.isEdited,
            _subId: item._id,
        };
        return model
    }

    // check if should to add date separator
    separatorListener(item, isLoadOld, isNewMessage = false){
        const storage = this.storage
        const separatorId = moment(item.uFromDate, 'DD.MM.YYYYTHH:mm:ss').format(
            'DD.MM.YYYY',
        );
        const lastIndex = isNewMessage ? 0 : storage.length-1
        if(storage[lastIndex] === undefined){
            return
        }
        //get last item in storage
        const lastItemInStorage = moment(storage[lastIndex].uFromDate, 'DD.MM.YYYYTHH:mm:ss').format(
            'DD.MM.YYYY',
        );
        // if date changed
        if(separatorId!== lastItemInStorage){
            // make separator model
            const separatorModel = this.makeSeparator(item, lastItemInStorage)
            //if separator exist update
            if (this.get(lastItemInStorage) !== null) {
                this.update(separatorModel);
            } else {
                // add separator into chat
                if(isNewMessage){
                    const newSeparator = this.makeSeparator(item, separatorId)
                    const message = new Message(newSeparator, this)
                    this.storage.unshift(message)
                } else if (!isLoadOld) {
                    this.add(separatorModel);
                } else {
                    this.addOld(separatorModel)
                }
            }
        }
    }

    makeIconInUser(item, user){
        item.contactIcon = ContactItem.create(user).contactIcon;
        item.userName = user.name;
        item.modified = true
    }

    iconizedListener(item, isNewMessage = false){
        // find message user
        const user = store().contactsItems.get(item.uFrom) || null;
        // if user exists
        if (user !== null) {
            const storage = this.storage
            const lastItemInStorage = isNewMessage ? storage[0] : storage[storage.length-1]
            if(lastItemInStorage===undefined){
                return
            }
            // check if user changed
            if(item.uFrom !== lastItemInStorage.uFrom // check if user changed
                || lastItemInStorage.messageType === 200 // last message type system
                || lastItemInStorage.messageType === 100
            ){
                if(isNewMessage){
                    this.makeIconInUser(item, store().contactsItems.get(item.uFrom)) //make icon
                } else {
                    this.makeIconInUser(lastItemInStorage, store().contactsItems.get(lastItemInStorage.uFrom)) //make icon
                }
            }
        }
    }
}

export {MessageList};
