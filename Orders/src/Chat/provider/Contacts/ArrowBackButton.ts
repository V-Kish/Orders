import { Base } from '../Base';

class ArrowBackButton extends Base {
   private _onPressBack: () => void
    constructor({id,onPress}:{id:string,onPress: () => void}) {
        super(id);
        this._onPressBack = onPress;
    }

    onPress() {
        this._onPressBack();
    }
}

export { ArrowBackButton };
