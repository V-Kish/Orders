import { Base } from '../Base';

class SaveNewGroup extends Base {
    private _onPressBack: () => void
    constructor({id,onPress}:{id:string,onPress: () => void}) {
        super(id);
        this._onPressBack = onPress;
    }

    onPress() {
        //AppLog.log('onPress')
        this._onPressBack();
    }
}

export { SaveNewGroup };
