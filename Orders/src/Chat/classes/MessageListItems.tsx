import * as React from 'react';
import { TypedBaseComponent } from "../../Common/BaseComponent";
import { MessageList } from "../provider/MessageList";
import { MessageView } from './MessageView';

class MessageListItemsView extends TypedBaseComponent<MessageList> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.model.storage.map(item => <MessageView model={item} key={`Message_${item.id}`} />)}
            </>
        );
    }
}

export { MessageListItemsView };
