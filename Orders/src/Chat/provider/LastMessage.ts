import { Base } from './Base';
import {store} from "./Store";

type lastMessageProps = {
    messageUserId: number;
    groupId?: string;
    uFromDate?: string;
    id?: number;
    messageId: number;
    messageType: number;
    message: any;
    messageDate: string;
    name: string;
    userId: number;
    isPublic: boolean;
    pairUser: {
        id: number;
        name: string;
    };
    uFrom?: number;
};

class LastMessage extends Base {
    public messageId: number;
    public messageType: number;
    public message: any;
    public messageDate: string;
    public name: string;
    public userId: number;
    public isPublic: boolean;

    constructor(model: lastMessageProps) {
        super(model.messageId.toString());
        this.init(model);
    }

    init(model: lastMessageProps) {
        this.messageId = model.messageId || model.id;
        this.message = model.message;
        this.messageDate = model.messageDate || model.uFromDate;
        this.messageType = model.messageType;
        // return
        this.name =
            model.messageUserId
                ? store().contactsItems.get(model.messageUserId) !== null && store().contactsItems.get(model.messageUserId).name
                : model.uFrom ? store().contactsItems.get(model.uFrom).name : null;
        // this.isPublic = model.isPublic || (model.groupId ? store().chats.get(model.groupId).isPublic : false);
        this.userId =
            model.messageUserId
                ? model.messageUserId
                : model.uFrom ? model.uFrom : null;
    }

    updateFromSend(){

    }

    update(model: lastMessageProps, forceUpdate: boolean = true) {
        if (this.messageId !== model.messageId || this.messageId !== model.id) {
            this.init(model);
            this.modified = true;
            if (forceUpdate) {
                this.forceUpdate();
            }
            return true;
        }
        return false;
    }
}

export { LastMessage };
