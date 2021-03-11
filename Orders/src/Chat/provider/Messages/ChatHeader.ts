import { Base } from "../Base";
import { Chat } from "../Chat";

class ChatHeader extends Base {
	private _chat: Chat;

	constructor(chat: Chat) {
		super(`Chats_${chat.id}_Header`);
		this._chat = chat;
	}

	totalMembers() {
		 
	}
}