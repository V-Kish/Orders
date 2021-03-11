import { Base } from '../Base';

class Preloader extends Base {
    private _visible: boolean;

    constructor({ id, visible = false }: { id: string, visible?: boolean }) {
        super(id);
        this._visible = visible;

    }

    get visible(): boolean {
        return this._visible;
    }
    set visible(value) {
        if (this.visible === value) {
            return
        }
        this._visible = value;
        this.modified = true;
        this.forceUpdate();
    }

    async showWithCallback(callback: () => void) {
        if (this._visible) {
            return;
        }
        this._visible = true;
        this.modified = true;
        setTimeout(callback, 50)
        this.forceUpdate();
    }
}

export { Preloader };
