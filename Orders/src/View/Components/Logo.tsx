import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { ICONS } from '../../constants/icons';

export enum containers {
  container,
  icon,
  text,
}

class LogoView extends React.Component{
  constructor(props: any) {
    super(props);
  }
  render() {
    const logoStyle = this.props.bigLogo===undefined ? 'smallLogo'
    : (this.props.bigLogo ? 'bigLogo' : 'smallLogo')
    return <View style={{...styles.container, ...styles[logoStyle]}}>
        <Image source={ICONS.logo} style={{...styles.container, ...styles[logoStyle]}}/>
    </View>
  }
}

export { LogoView };

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      padding: wp(3)
    },
    iconImg:{
      width: '100%'
    },
    smallLogo: {
      width: wp(50),
      height: wp(50)
    },
    bigLogo: {
      width: wp(100),
      height: wp(100)
    }
});
