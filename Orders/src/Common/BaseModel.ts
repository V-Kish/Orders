import {Component} from 'react';


class BaseModel {
  private readonly _id: string;
  private _component: Component;
  private _modified: boolean;
  private _ref: any;

  constructor(id: string) {
    // Id
    this._id = id;
    // React Component
    this._component = null;
    //
    this._modified = false;
    // ref
    this._ref = null;
    // if(id!==undefined && typeof id === "string" && id.indexOf('Bottom')>-1){
    //   console.log('BaseModel', id)
    // }
  }

  get isRendered() {
    return this.component !== null;
  }

  get id() {
    return this._id;
  }

  get component() {
    return this._component;
  }
  set component(value: Component) {
    if(value==null){
      // console.log('BaseModelSet', this._id)
      return
    }
    this._component = value;
  }
  setNullComponent(){
    // console.log('BaseModelSet componentWillUnmount', this._id)
    this._component = null;
  }

  set modified(value: boolean) {
    this._modified = value;
  }
  get modified() {
    return this._modified;
  }

  set ref(value) {
    this._ref = value;
  }
  get ref() {
    return this._ref;
  }

  forceUpdate(callback?: () => void) {
    if (this.component !== null) {
      this.component.forceUpdate(callback);
    } else {
      if (typeof callback === 'function') {
        callback();
      }
    }
  }
}

class WrapComponent {
  private _key: string;
  private _component: Component;
  private _ref: any;
  private _modified: boolean;

  constructor(key: string, component: Component, ref: any) {
    this._key = key;
    this._component = component;
    this._ref = ref;
    this._modified = false;
  }

  get key() {
    return this._key;
  }

  get component() {
    return this._component;
  }

  get ref() {
    return this._ref;
  }
  set ref(value: any) {
    this._ref = value;
  }

  get modified() {
    return this._modified;
  }
  set modified(value) {
    this._modified = value;
  }
}

class MultiBase {
  private _id: string;
  private _components: Map<string, WrapComponent>;
  constructor(id: string) {
    this._id = id;
    this._components = new Map<string, WrapComponent>();
  }

  getComponent(key: string) {
    return this._components.get(key) || null;
  }

  setComponent(key: string, component: Component, ref: any = null) {
    this._components.set(key, new WrapComponent(key, component, ref));
  }

  setRef(key: string, ref: any) {
    const component = this.getComponent(key);
    if (component !== null) {
      component.ref = ref;
    }
  }

  setModified(key: string, value: boolean) {
    const component = this.getComponent(key);
    if (component !== null) {
      this.getComponent(key).modified = value;
    }
  }

  getModified(key: string) {
    const component = this.getComponent(key);
    if (component !== null) {
      return this.getComponent(key).modified;
    }
    return false;
  }

  set modified(value) {
    this._components.forEach((wrap) => {
      wrap.modified = value;
    });
  }

  get id() {
    return this._id;
  }

  forceUpdate(callback?: () => void) {
    this._components.forEach((wrap) => {
      if (wrap.component !== null) {
        wrap.component.forceUpdate(() => {});
      }
    });
    if (typeof callback === 'function') {
      callback();
    }
  }
}

export {BaseModel, MultiBase};
