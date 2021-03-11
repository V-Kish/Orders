import {BaseModel} from "../Common/BaseModel";


export class DrawerUserName extends BaseModel {
    private _name: string;
    constructor() {
        super('drawerUserName');
        this._name = ''
    }
    get name(){
        return this._name
    }
    set name(value){
        this._name = value
    }
}
