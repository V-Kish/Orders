import * as React from 'react';
import {NativeModules } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigator} from '../Core/Navigator';
import {TypedBaseComponent} from '../Common/BaseComponent';
import {MainNavigation} from '../Models/navigation/MainNavigation';
import {AuthStack} from './AuthStack';
import {AppStateController} from '../Controllers/AppStateController';
import {ConfirmOssbStack} from './ConfirmOssbStack';
import {MainStack} from './MainStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {controllers} from '../Controllers/Controllers';
import {DrawerStack} from './DrawerStack';
import {PreloaderView} from '../View/Components/Preloader';
import {InformationView} from '../View/InformationView';
import {NoConnectionView} from '../View/NoConnectionView';
import {ExtensionView} from '../View/ExtensionView';
import {OsbbAdminStack} from './OsbbAdminStack';
import {SharedView} from '../View/Shared/SharedView';
import {AlertView} from '../View/AlertView/AlertView';
import {StatementOfResidentsStack} from './StatementOfResidentsStack';
import {UserCreateEventsStack} from './UserCreateEventsStack';
import {AboutProgramOSBB} from '../Screens/AboutProgramOSBB/AboutProgramOSBB';

const StackDrawer = createDrawerNavigator();

class MainNavigationView extends TypedBaseComponent<MainNavigation> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
      super.componentDidMount();
      NativeModules.SplashScreen.hide();
  }

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
                swipeEnabled: false,
              }}
            />
            <StackDrawer.Screen
              name="ConfirmOssbStack"
              component={ConfirmOssbStack}
              options={{
                swipeEnabled: false,
              }}
            />
            <StackDrawer.Screen
              name="MainStack"
              component={MainStack}
              options={{
                swipeEnabled: true,
              }}
            />
            <StackDrawer.Screen
              name="OsbbAdminStack"
              component={OsbbAdminStack}
              options={{
                swipeEnabled: true,
              }}
            />
            {/* Заявки від Мешканців */}
            <StackDrawer.Screen
              name="StatementOfResidentsStack"
              component={StatementOfResidentsStack}
              options={{
                swipeEnabled: true,
              }}
            />
            {/* Заявки від Мешканців */}
            <StackDrawer.Screen
              name="UserCreateEventsStack"
              component={UserCreateEventsStack}
              options={{
                swipeEnabled: true,
              }}
            />
            {/* Про програму */}
            <StackDrawer.Screen
              name="AboutProgramOSBB"
              component={AboutProgramOSBB}
              options={{
                swipeEnabled: true,
              }}
            />
          </DrawerStack>
        </NavigationContainer>
        <PreloaderView
          model={controllers().preloader}
          key={controllers().preloader.id}
        />
        <NoConnectionView
          model={controllers().noConnection}
          key={controllers().noConnection.id}
        />
        <ExtensionView
          model={controllers().extension}
          key={controllers().extension.id}
        />
        <InformationView
          model={controllers().information}
          key={'controllers().information.id'}
        />
        <SharedView
          model={controllers().sharedController.sharedModel}
          key={this.childId(controllers().sharedController.sharedModel)}
          id={this.childId(controllers().sharedController.sharedModel)}
        />
        <AppStateController
          model={controllers().appStateControllerModel}
          key={controllers().appStateControllerModel.id}
        />
        <AlertView
          model={controllers().sharedController.reminderAlert}
          key={controllers().sharedController.reminderAlert.id}
        />
      </>
    );
  }
}

export {MainNavigationView};
