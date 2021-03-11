import { Base } from "../Base";

class MainDrawer extends Base {
    constructor() {
        super('MainDrawer');
    }

    update() {
        this.modified = true;
        this.forceUpdate();
    }
}

export { MainDrawer };