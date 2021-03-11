import React from 'react';
import {AppState, View} from 'react-native';
import {TypedBaseComponent} from '../Common/BaseComponent';
import {AppStateControllerModel} from '../Models/AppStateControllerModel/AppStateControllerModel';
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';
import {UserDataProvider} from "../DataProvider/UserDataProvider";
import { navigator } from '../Core/Navigator';
import {controllers} from "./Controllers";

class AppStateController extends TypedBaseComponent<AppStateControllerModel> {
  private messageListener: any;
  private backgroundMessageListener: any;
  private notificationMessageListener: any;
  constructor(props: any) {
    super(props);
    this.messageListener = null;
    this.backgroundMessageListener = null;
    this.notificationMessageListener = null;
  }
  async componentDidMount() {
    super.componentDidMount();
    AppState.addEventListener('change', this.model.handleBackground);
    await UserDataProvider.requestUserPermission();
    this.messageListener = messaging().onMessage(async (message) => {
      console.log('onMessage message', message);
      // @ts-ignore
      global.pushMessagesHandler.setBackground(false);
      // @ts-ignore
      global.pushMessagesHandler.checkMessageType(message);
    });
    this.backgroundMessageListener = messaging().setBackgroundMessageHandler(
      async (message) => {
        // @ts-ignore
        global.pushMessagesHandler.setBackground(true);
        console.log('setBackgroundMessageHandler message', message);
        // @ts-ignore
        global.pushMessagesHandler.checkMessageType(message);
      },
    );
    messaging()
      .getInitialNotification()
      .then((message) => {
        console.log('message getInitialNotification',message)
        if (message !== null && message !== undefined) {
          global.pushMessagesHandler.setBackground(false);
          navigator().startAppWithBackground = true;
          global.pushMessagesHandler.checkMessageNotificationOpenedAppType(
            message,
          );
        }
      });
    await this.model.handleBackground('start');
  }
  async componentWillUnmount() {
    super.componentWillUnmount();
    console.log('componentWillUnmount', this.messageListener);
    AppState.removeEventListener('change', this.model.handleBackground);
    if (this.messageListener !== null) {
      try {
        this.messageListener();
      } catch (ex) {
        console.error('messageListener', ex);
      }
    }
    if (
      this.backgroundMessageListener !== null &&
      typeof this.backgroundMessageListener === 'function'
    ) {
      try {
        this.backgroundMessageListener();
      } catch (ex) {
        console.error('backgroundMessageListener', ex);
      }
    }
    if (this.notificationMessageListener !== null) {
      try {
        this.notificationMessageListener();
      } catch (ex) {
        console.error('notificationMessageListener', ex);
      }
    }
  }
  // @ts-ignore
  render() {
    return <View />;
  }
}
export {AppStateController};
