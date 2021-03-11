import { Base } from '../Base';

class CloseButton extends Base {
   private _onPressBack: () => void
    constructor({id,onPress}:{id:string,onPress: () => void}) {
        super(id);
        this._onPressBack = onPress;
    }

    onPress() {
        this._onPressBack();
    }
}

export { CloseButton };
