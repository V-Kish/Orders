import React, {useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {OrderScreen} from '../screens/OrderScreen';
import {navigator} from '../Core/Navigator';
import {OptionsScreen} from '../screens/OptionsScreen';
import {ChatListScreen} from '../screens/Chat/ChatListScreen';
import {ChatScreen} from '../screens/Chat/ChatScreen';
import {CustomersScreen} from '../screens/Customers/CustomersScreen';
import {CustomersDetailsScreen} from '../screens/Customers/CustomersDetailsScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS} from '../constants/colors';
import {DrawerContainer} from './DrawerContainer/DrawerContainer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export const MainStack = () => {
  useEffect(() => {
    const backAction = () => {
      navigator().toGoBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="OptionsScreen"
      headerMode="none"
      openByDefault={false}
      drawerPosition={'left'}
      drawerType={'front'}
      drawerContent={() => <DrawerContainer />}
      drawerStyle={styles.drawerStyles}>
      <Drawer.Screen
        name="OptionsScreen"
        component={OptionsScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="CustomersScreen"
        component={CustomersScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="CustomersDetailsScreen"
        component={CustomersDetailsScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  drawerStyles: {
    backgroundColor: COLORS.FONT_WHITE,
    width: '90%',
  },
});
