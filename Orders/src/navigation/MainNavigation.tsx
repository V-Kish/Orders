import React from 'react';
import {MainStack} from './MainStack';
import { AuthStack } from './AuthStack';
import {useSelector} from "react-redux";
import {reduxTypes} from "../Types";

export const MainNavigation = () => {
  const isAuthStack = useSelector((state: reduxTypes) => state.start.isAuthStack);
  return isAuthStack ? <AuthStack /> : <MainStack />;
};
