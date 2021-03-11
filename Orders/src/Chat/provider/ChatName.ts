import { Base } from './Base';

class ChatName extends Base {
    name: string;

    constructor(model) {
        super(model.id);
        this.name = model.name;
    }

    update(model: any, forceUpdate: boolean = true): boolean {
        if (this.name !== model.name) {
            this.name = model.name;
            this.modified = true;
            if (forceUpdate) {
                this.forceUpdate();
            }
            return true;
        }
        return false;
    }
}

export { ChatName };
