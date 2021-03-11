import {MultiBase} from "../../../Common/BaseModel";
import {RefreshControllScroll} from "../../../View/Components/RefreshControll/RefreshControllScroll";


export class RefreshControllModel extends MultiBase {
    private _refreshing: boolean;
    constructor(id: string) {
        super(id);
        this._refreshing = false;
        this.onRefresh = this.onRefresh.bind(this)
    }
    get component(){
        return  RefreshControllScroll
    }

    get refreshing(){
        return this._refreshing;
    }
    set refreshing(value){
        if(this._refreshing!==value){
            this._refreshing = value;
            this.forceUpdate()
        }
    }
    async onRefresh(func: ()=>void){
        this.refreshing = true;
        await func();
        this.refreshing = false;
    }
}
