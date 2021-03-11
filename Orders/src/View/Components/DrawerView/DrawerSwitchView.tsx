import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerAdminView} from './DrawerAdminView';
import {DrawerUserView} from './DrawerUserView';
import { TypedBaseComponent, IBaseProps } from '../../../Common/BaseComponent';
import { ChooseDrawerModel } from '../../../Navigation/ChooseDrawerModel';


class DrawerSwitchView extends TypedBaseComponent<ChooseDrawerModel> {
  constructor(props: IBaseProps<ChooseDrawerModel>) {
    super(props);
  }
  render() {
    super.render();
    if (!this.model.isShowContent) {
      return null;
    }
    if (this.model.isDrawerAdmin) {
      return (
        <View style={styles.drawerContainer}>
          <DrawerAdminView
            model={this.model.drawerAdmin}
            key={this.childId(this.model.drawerAdmin)}
            id={this.childId(this.model.drawerAdmin)}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.drawerContainer}>
          <DrawerUserView
            model={this.model.drawerUser}
            key={this.childId(this.model.drawerUser)}
            id={this.childId(this.model.drawerUser)}
          />
        </View>
      );
    }
  }
}

export {DrawerSwitchView};
const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
  },
});
