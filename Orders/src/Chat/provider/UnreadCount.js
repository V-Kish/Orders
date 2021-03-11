import { Base } from './Base';

class UnreadCount extends Base {
  constructor(model) {
    super(model.id);
    this.unreadCount1 = model.unreadCount;
    }
    get unreadCount() {
        return this.unreadCount1;
    }
  update(model, forceUpdate = true) {
    if (this.unreadCount1 !== model.unreadCount) {
      this.unreadCount1 = model.unreadCount;
      this.modified = true;
      if (forceUpdate) {
        this.forceUpdate();
      }
      return true;
    }
    return false;
  }
}
export { UnreadCount };
