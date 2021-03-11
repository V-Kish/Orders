import { Base } from '../Base';

class NextButton extends Base {
    private _onPress: () => void;

    constructor({id,onPress}:{id:string,onPress: () => void}) {
        super(id);
        this._onPress = onPress;
    }

    onPress() {
        this._onPress();
    }
}

export { NextButton };
