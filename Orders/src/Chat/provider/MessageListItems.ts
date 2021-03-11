import { Base } from "./Base";
import { Message } from "./Message";

class MessageListItems extends Base {
    private _messages: Array<Message>;

    constructor(id: string) {
        super(id);
        this._messages = new Array<Message>();
    }

    get messages() {
        return this._messages;
    }
}

export { MessageListItems };