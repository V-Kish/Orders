import {Base} from "../Base";

class DrawerControls extends Base {
    private _showMask: boolean;
    constructor(id) {
        super(id);
        this._showMask = false
    }
    set showMask(value) {
        if(this._showMask !== value){
            this._showMask = value;
            this.modified = true;
            this.forceUpdate();
        }
    }
    get showMask() {
        return this._showMask;
    }

    update() {
        this.modified = true;
        this.forceUpdate();
    }
}

export {DrawerControls}
