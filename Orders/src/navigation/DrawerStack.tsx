import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TypedBaseComponent} from '../Common/BaseComponent';
import {controllers} from '../Controllers/Controllers';
import {StyleSheet, View} from 'react-native';
import {DrawerSwitchModel} from './DrawerSwitchModel';
import {DrawerSwitchView} from '../View/DrawerView/DrawerSwitchView';
const StackDrawer = createDrawerNavigator();
class DrawerStack extends TypedBaseComponent<DrawerSwitchModel> {
  constructor(props) {
    super(props);
  }

  // @ts-ignore
  render() {
    super.render();
    return (
      <StackDrawer.Navigator
        headerMode="none"
        openByDefault={false}
        drawerPosition={'right'}
        drawerType={'front'}
        drawerStyle={styles.drawerStyles}
        drawerContent={() => (
          <DrawerSwitchView
            model={controllers().drawerSwitch.chooseDrawer}
            key={this.childId(controllers().drawerSwitch.chooseDrawer)}
            id={this.childId(controllers().drawerSwitch.chooseDrawer)}
          />
        )}>
        {this.props.children}
      </StackDrawer.Navigator>
    );
  }
}
export {DrawerStack};
const styles = StyleSheet.create({
  drawerStyles: {
    backgroundColor: 'transparent',
    width: '95%',
  },
});
