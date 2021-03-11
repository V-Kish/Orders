import { Base } from "./Base";

type iconButtonProps = {
    id: string;
    icon?: any;
    style?: string;
    text?: string;
    onPress?: () => void;
    hidden?:  boolean;
};

class IconButton extends Base {

    private _model: iconButtonProps;
    private _lastPressedTimestamp: number;

    constructor(model: iconButtonProps) {
        super(model.id);
        this._model = model;
        this._lastPressedTimestamp = 0;
    }

    get icon() {
        return this._model.icon;
    }

    get style() {
        return this._model.style;
    }

    get hidden() {
        return this._model.hidden || false;
    }
    set hidden(value) {
        this.update(value, true);
    }

    get text() {
        return this._model.text;
    }

    onPress() {
        if (new Date().getTime() - this._lastPressedTimestamp < 1000) {
            console.log('timestamp passed');
            return;
        }
        this._lastPressedTimestamp = new Date().getTime();
        if (typeof this._model.onPress !== 'undefined') {
            this._model.onPress();
        }
    }

    update(hidden: boolean, forceUpdate: boolean) {
        if (this.hidden !== hidden) {
            this._model.hidden = hidden;
            this.modified = true;
            if (forceUpdate) {
                this.forceUpdate();
            }
            return true;
        }
        return false;
    }
}

export { IconButton };
