import React from 'react';
import {MainStack} from './MainStack';
import {AuthStack} from './AuthStack';
import {useSelector} from 'react-redux';
import {reduxTypes} from '../Types';
import {NavigationContainer} from '@react-navigation/native';
import { navigator } from '../Core/Navigator';
export const MainNavigation = () => {
  const isAuthStack = useSelector(
    (state: reduxTypes) => state.start.isAuthStack,
  );
  return (
    <NavigationContainer ref={navigator().setNavigation.bind(navigator())}>
      {isAuthStack ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};
