import { Base } from './Base';

class ChatTime extends Base {
  constructor(model) {
    super(model.messageId);
    this.messageId = model.messageId;
    this.messageDate = model.messageDate;
  }

  update(model) {
    if (this.messageId !== model.messageId) {
      this.messageId = model.messageId;
      this.messageDate = model.messageDate;
      this.modified = true;
      this.forceUpdate();
    }
  }
}

export { ChatTime };
