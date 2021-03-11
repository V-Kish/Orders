import {Base, MultiBase} from "./Base";

type contactIsOnline = {
    id: number,
    status?: boolean,
    date?: string,
}

class ContactIsOnline extends MultiBase {
    private _model: contactIsOnline;
    constructor(model: contactIsOnline) {
        super(model.id);
        this._model = model
        this._model.status = false
    }

    get model() {
        return this._model;
    }
    get status() {
        return this._model.status;
    }
    get date() {
        return this._model.date;
    }

    update({ isOnline, isOnlineDate }: { isOnline: boolean, isOnlineDate: string }, forceUpdate: boolean = true) {
        if (this._model.status !== isOnline || this._model.date !== isOnlineDate) {
            this._model.status = isOnline;
            this._model.date = isOnlineDate;
            if (forceUpdate) {
                this.modified = true;
                this.forceUpdate();
            }
        }
    }
}

export {ContactIsOnline};
