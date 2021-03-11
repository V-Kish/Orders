import React from 'react';
import {MultiBase} from "../Common/BaseModel";


export class AnonimusModelCollection {
    private _storage: Map<typeof React.Component, Map<string, MultiBase>>
    constructor() {
        this._storage = new Map<typeof React.Component, Map<string, MultiBase>>();
    }

    public getOrAdd(component: typeof React.Component, key:string, model: typeof MultiBase|null = null): MultiBase{
        let models = this._storage.get(component)
        if(models===void 0){//models === undefined - create empty models
            models = new Map<string, MultiBase>()
            this._storage.set(component, models)
        }
        let _model = models.get(key)
        if(_model===void 0){ //one model === undefined - create empty model
            _model = model!==null ? new model(key) : new AnonimusModel(key)
            models.set(key, _model)
        }
        return _model
    }
}

class AnonimusModel extends MultiBase {
    constructor(id: string) {
        super(id);
    }
}
