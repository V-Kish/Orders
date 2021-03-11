import {ChatInput} from "../Models/Components/ChatInput/ChatInput";

class TestController {
    private _chatInput: ChatInput;
    constructor() {
        this._chatInput = new ChatInput({id: 'testChatInput'})
    }
    get chatInput(){
        return this._chatInput
    }
}

export {TestController};
