import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigator} from '../Core/Navigator';
import {TypedBaseComponent} from '../Common/BaseComponent';
import {AuthStack} from './AuthStack';
import {AppStateController} from '../Controllers/AppStateController';
import {MainStack} from './MainStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {controllers} from '../Controllers/Controllers';
import {DrawerStack} from './DrawerStack';
import {AboutProgramOSBB} from '../Screens/AboutProgramOSBB/AboutProgramOSBB';
import { MainNavigation } from '../Model/navigation/MainNavigation';

const StackDrawer = createDrawerNavigator();

class MainNavigationView extends TypedBaseComponent<MainNavigation> {
  constructor(props: any) {
    super(props);
  }
  // componentDidMount() {
  //     super.componentDidMount();
  //     NativeModules.SplashScreen.hide();
  // }

    render() {
    super.render();
    return (
      <>
        <NavigationContainer ref={navigator().setNavigation.bind(navigator())}>
          <DrawerStack
            model={controllers().drawerSwitch}
            key={this.childId(controllers().drawerSwitch)}
            id={this.childId(controllers().drawerSwitch)}>
            <StackDrawer.Screen
              name="AuthStack"
              component={AuthStack}
              options={{
                swipeEnabled: true,
              }}
            />
            {/*<StackDrawer.Screen*/}
            {/*  name="MainStack"*/}
            {/*  component={MainStack}*/}
            {/*  options={{*/}
            {/*    swipeEnabled: true,*/}
            {/*  }}*/}
            {/*/>*/}
            {/*/!* Про програму *!/*/}
            {/*<StackDrawer.Screen*/}
            {/*  name="AboutProgramOSBB"*/}
            {/*  component={AboutProgramOSBB}*/}
            {/*  options={{*/}
            {/*    swipeEnabled: true,*/}
            {/*  }}*/}
            {/*/>*/}
          </DrawerStack>
        </NavigationContainer>
        <AppStateController
          model={controllers().appStateControllerModel}
          key={controllers().appStateControllerModel.id}
        />
      </>
    );
  }
}

export {MainNavigationView};
