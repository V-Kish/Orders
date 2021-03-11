import {mockupHeightToDP as hp} from '../../../constants/Dimensions';

import {Platform, View} from 'react-native';
import React from 'react';

export const ModalStatusBar = () => {
  return Platform.OS === 'ios' ? (
    // for IOS
    <View style={{height: hp(25), width: '100%', backgroundColor: 'gray'}} />
  ) : // for Android
  null;
};
