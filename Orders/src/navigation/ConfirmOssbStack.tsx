import React from 'react';
import {ChooseOssbScreen} from '../Screens/ChooseOssbStack/ChooseOssbScreen';
import {FindOssbScreen} from '../Screens/ChooseOssbStack/FindOssbScreen';
import {MakeOssbScreen} from '../Screens/ChooseOssbStack/MakeOssbScreen';
import {VerifyInOssbScreen} from '../Screens/ChooseOssbStack/VerifyInOssbScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {controllers} from '../Controllers/Controllers';
import {WaitingScreen} from '../Screens/WaitingScreen/WaitingScreen';
import {InformationScreen} from '../Screens/InformationScreen';
import {VerificationResultView} from '../View/ChooseOssbStack/VerificationResult/VerificationResultView';
import {VerificationResultScreen} from '../Screens/ChooseOssbStack/VerificationResultScreen';
import {ChatListScreen} from '../Chat/ChatListScreen';
import {ChatScreen} from '../Chat/ChatScreen';
import {horizontalAnimation} from './AuthStack';
import {ShowBottomNavigation} from "../Core/ShowBottomNavigation";
const Stack = createStackNavigator();

class ConfirmOssbStack extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    // @ts-ignore
    controllers().drawerSwitch.navigationRef = this.props.navigation;
  }
  render() {
    return (
      <Stack.Navigator
        headerMode="none"
        initialRouteName={'ChooseOssbScreen'}
        screenOptions={horizontalAnimation}
      >
        {/*<Stack.Screen name="ChatListScreen" component={ChatListScreen} />*/}
        {/*<Stack.Screen name="ChatScreen" component={ChatScreen} />*/}
        <Stack.Screen
          name="ChooseOssbScreen"
          component={ChooseOssbScreen}
        />
        <Stack.Screen
          name="FindOssbScreen"
          component={FindOssbScreen}
        />
        <Stack.Screen
          name="MakeOssbScreen"
          component={MakeOssbScreen}
        />
        <Stack.Screen
          name="VerifyInOssbScreen"
          component={VerifyInOssbScreen}
        />
        <Stack.Screen
          name="VerificationResultScreen"
          component={VerificationResultScreen}
        />
        <Stack.Screen
          name="WaitingScreen"
          component={WaitingScreen}
        />
      </Stack.Navigator>
    );
  }
}
export {ConfirmOssbStack};
