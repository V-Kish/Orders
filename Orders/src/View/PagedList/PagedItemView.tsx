import React from 'react';
import {View} from 'react-native';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import {STYLES} from '../../constants/styles';
import { PagedItemModel } from '../../Models/navigation/PagedList/PagedItem';

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
