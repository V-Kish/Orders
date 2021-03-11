import { Base } from "../Base";
import { Message } from '../../provider/Message';

class MessagePreloader extends Base {
    private _hidden: boolean = true;
    private _messages: Array<Message>;

    constructor(id: string) {
        super(id);
        this._hidden = true;
        this._messages = new Array<Message>();
    }

    get hidden() {
        return this._hidden;
    }
    set hidden(value) {
         this._hidden = value;
    }
    get messages() {
        return this._messages;
    }

    show(messages: Array<Message>) {
        this._messages = messages;
        this._hidden = false;
        this.modified = true;
        this.forceUpdate();
    }

    hide() {
        if (!this._hidden) {
            setTimeout(() => {
                this._messages = [];
                this._hidden = true;
                this.modified = true;
                this.forceUpdate();
            }, 700)
        }
    }
}

export { MessagePreloader };
