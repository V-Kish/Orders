import React from 'react';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import { PagedItemModel } from '../../Model/navigation/PagedList/PagedItem';

class PagedItemView extends TypedBaseComponent<PagedItemModel> {
  private _item: any;

  constructor(id: any) {
    super(id);
  }

  // @ts-ignore
  render() {
    super.render();
    return this.model.deleted ? null : this.props.children
  }
}

export {PagedItemView};
