import { Base } from '../Base';


class GroupMembers extends Base {
    constructor({ id }: { id: string }) {
        super(id);
        this._groupMembers = [];
    }
    get groupMembers() {
        return this._groupMembers;
    }
}

export { GroupMembers };
