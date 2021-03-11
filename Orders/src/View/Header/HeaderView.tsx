import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TypedBaseComponent, IBaseProps} from '../../Common/BaseComponent';

import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

import {LogoView} from '../Components/Logo';

import {COLORS} from '../../constants/colors';
import {Header} from "../../Model/Header/Header";

class HeaderView extends TypedBaseComponent<Header> {
    constructor(props: IBaseProps<Header>) {
    super(props);
    }

    render() {
        super.render();
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
                <LogoView id={`${this.props.id}_LogoView`} />
          <Text style={styles.logoText}>{this.model.appName}</Text>
        </View>
      </View>
    );
  }
}

export {HeaderView};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: wp(10),
    backgroundColor: 'red',
    // backgroundColor: COLORS.RED_WHITE.bg,
    paddingVertical: hp(15),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 999,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
      // width: '30%'
  },
  logoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(25),
    textAlign: 'center',
    marginLeft: wp(12),
    color: 'red',
  },
  drawerBtnView: {
    paddingRight: wp(20),
  },
});
