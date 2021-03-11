import {Base} from "../Base";
import {Chat} from "../Chat";
import {store} from '../Store'
import { Keyboard } from 'react-native'
// import {CallIconModel} from "../../classes/Calls/CallIconModel";

type chatHeader = {
    id: string,
    chat?: Chat,
}

class ChatHeader extends Base{
    private _model: chatHeader;
    // public drawerButton: IconButton;
    // public _callIcon: CallIconModel;
    constructor(model: chatHeader) {
        super(model.id);
        this._model = model;
        this._model.chat = null;
        this.toggleDrawer = this.toggleDrawer.bind(this)
        // this.drawerButton = new IconButton({
        //     icon: require('../../assets/img/Icons/menu/Shape.png'),
        //     id: 'ChatHeader_DrawerButton',
        //     hidden: false,
        //     onPress: this.toggleDrawer,
        //     style: 'burgerMenu',
        // })
        // this._callIcon = new CallIconModel('ChatHeader_callIcon',require('../../assets/img/CallIcon/callWhite/call2.png'))
    }
    get chat(){
        return this._model.chat;
    }
    // get callIcon(){
    //     return this._callIcon;
    // }
    get photo(){
        return this._model.chat.photo;
    }

    get isOnline(){
        return this._model.chat.photo.isOnline;
    }

    toggleDrawer() {
        if(this.chat?.isPublic){
            store().chatSettings.toggle()
        }
        Keyboard.dismiss();
        // store().drawerControlsChat.component.openDrawer();
        // store().chats.keyboard.emojiChat.closeEmoji();
    }

    pronunciation(balls, txtArr)  {
        let cases = [2, 0, 1, 1, 1, 2];
        return txtArr[
            balls % 100 > 4 && balls % 100 < 20
                ? 2
                : cases[balls % 10 < 5 ? balls % 10 : 5]
            ];
    }

    update(chat: Chat) {
        this._model.chat = chat;
        this.modified = true;
        this.forceUpdate();
    }
}
export {ChatHeader};
