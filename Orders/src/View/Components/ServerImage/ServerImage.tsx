import React from 'react';
import {Image} from 'react-native';
import {ICONS} from '../../../constants/icons';

export const ServerImage = ({source, ...rest}) => {
  return (
    <Image
        source={source}
        defaultSource={ICONS.errorScreenLogo}
        resizeMode='contain'
        {...rest} />
  );
};
