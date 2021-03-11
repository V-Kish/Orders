import { Base } from "../Base";
import {Chat} from "../Chat";
import {AppLog} from "../../Common/AppLog";

type drawerContainerMessagesProps = {
    id: string;
    chat: Chat;
};

class DrawerContainerMessages extends Base {
    private _model: drawerContainerMessagesProps;

    constructor(model) {
        super(model.id);
        this._model = model;

        this.onEditGroupNamePress = this.onEditGroupNamePress.bind(this);
    }

    onEditGroupNamePress() {
        AppLog.log('onEditGroupNamePress')
    }
}

class EditGroupName extends Base {
    private _model: drawerContainerMessagesProps;

    constructor(model: drawerContainerMessagesProps) {
        super(model.id);
        this._model = model;
    }


}

export { DrawerContainerMessages, EditGroupName };
