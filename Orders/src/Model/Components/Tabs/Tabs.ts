import {BaseModel} from '../../../Common/BaseModel';
import {TabModel, tabProps} from "../../OsbbAdminStack/OsbbConrtollModel/TabModel";

type tabsProps = {
    id: string;
    tabs: Array<tabProps>;
    disableTabs?: boolean;
    onChangeTab: ()=>void;
};

class Tabs extends BaseModel {
    private _model: tabsProps
    private _tabs: Array<TabModel>
    private _initialTabs: Array<tabProps>;
    constructor(_model: tabsProps) {
        super(_model.id);
        this.changeTab = this.changeTab.bind(this)
        this._model = _model
        this._initialTabs = _model.tabs
        this._tabs = new Array()
        this.initTabs()
    }

    initTabs(){
        this._tabs = this._initialTabs.map((tab,index)=>
            new TabModel({
                ...tab,
                onBtnChange: this.changeTab,
            }))
    }

    get tabs(){
        return this._tabs
    }

    async changeTab(tabActive: TabModel) {
        if (this._model.disableTabs===true) {return;}
        const currentTab = this._tabs.find((t) => t.isActiveTab);
        this.modifyTab(currentTab, false);
        this.modifyTab(tabActive, true);
        this.forceUpdate();
        this._model.onChangeTab()
    }

    chooseTabByIndex(ind: number) {
        this._tabs.forEach((t,i)=>{t.isActiveTab = i===ind})
        this.forceUpdate();
    }

    modifyTab(tab: TabModel, value: boolean) {
        tab.modified = true;
        tab.isActiveTab = value;
        tab.tabButton.modified = true;
        tab.tabButton.isActive = value;
    }

    selectedTab() {
        return this._tabs.findIndex(t=>t.isActiveTab)
    }

    getCurrentTabId() {
        return this._tabs.find((t) => t.isActiveTab === true)?.id || null;
    }

}

export {Tabs};
