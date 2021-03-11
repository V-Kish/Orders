import * as React from 'react';
import {Props} from 'react';
import {BaseModel, MultiBase} from './BaseModel';

interface IBaseProps<T> extends Props<any> {
  model: T;
  key: string;
  id?: string;
  style?: object;
}

interface IScreenProps extends React.Props<any> {
  id: string;
  padding?: boolean;
  withBackground?: boolean;
}

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.model.setComponent(this);
  }

  get model() {
    return this.props.model;
  }

  get style() {
    return this.props.style;
  }

  shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any,
  ): boolean {
    if (this.props.model.id !== nextProps.model.id) {
      return true;
    }
    return this.props.model.modified;
  }

  render() {
    this.props.model.modified = false;
    return null;
  }
}

class TypedBaseComponent<T extends BaseModel> extends React.Component<IBaseProps<T>> {
  constructor(props: IBaseProps<T>) {
    super(props);
    if (this.props?.model?.component) {
      this.props.model.component = this;
    }
  }

  get model(): T {
    return this.props.model;
  }

  get style() {
    return this.props.style;
  }

  get id() {
    return this.props.id;
  }

  public childId(model: BaseModel | MultiBase) {
    return `${this.props.id}_${model.id}`;
  }

  shouldComponentUpdate(nextProps: Readonly<IBaseProps<T>>): boolean {
    if (this.props.model.id !== nextProps.model.id) {
      return true;
    }
    return this.props.model.modified;
  }

  componentDidMount() {
    // console.log('BaseModelSet componentDidMount', this.model.id);
    this.props.model.component = this;
  }

  // componentDidUpdate(prevProps: Readonly<IBaseProps<T>>, prevState: Readonly<{}>, snapshot?: any) {
  //   // console.log('BaseModel componentDidUpdate', this.model.id)
  //   if(this.props.model.component!==this){
  //     this.props.model.component = this;
  //   }
  // }
  // componentWillMount() {
  //   // console.log('BaseModel componentWillMount', this.model.id)
  //   if(this.props.model.component!==this){
  //     this.props.model.component = this;
  //   }
  // }

  componentWillUnmount() {
    // console.log('componentWillUnmount', this.model.id);
    this.props.model.setNullComponent();
    // this.props.model.counterUnmount = this._counter++;
  }

  render(): JSX.Element | null {
    this.props.model.modified = false;
    if (this.props.model.component !== this) {
      this.props.model.component = this;
    }
    return null;
  }
}

class MultiTypedBaseComponent<T extends MultiBase> extends React.Component<IBaseProps<T>> {
  constructor(props: IBaseProps<T>) {
    super(props);
    this.model.setComponent(this.id, this);

  }

  get model(): T {
    return this.props.model;
  }

  get id() {
    return this.props.id;
  }

  public childId(model: BaseModel | MultiBase) {
    return `${this.props.id}_${model.id}`;
  }

  get style() {
    return this.props.style;
  }

  shouldComponentUpdate(nextProps: Readonly<IBaseProps<T>>): boolean {
    if (this.model.id !== nextProps.model.id) {
      return true;
    }
    return this.model.getModified(this.id);
  }

  componentDidMount() {
    //AppLog.trace('componentDidMount', this.model.id);
    if (this != null)
    this.model.setComponent(this.id, this);
  }

  componentWillUnmount() {
    //AppLog.trace('componentWillUnmount', this.model.id);
    this.model.setComponent(this.id, null);
  }

  render(): JSX.Element | null {
    this.model.setModified(this.id, false);
    this.model.setComponent(this.id, this);
    return null;
  }
}

export {
  TypedBaseComponent,
  IBaseProps,
  IScreenProps,
  MultiTypedBaseComponent,
  BaseComponent,
};
