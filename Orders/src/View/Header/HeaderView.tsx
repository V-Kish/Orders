import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {TypedBaseComponent, IBaseProps} from '../../Common/BaseComponent';
import {Button} from '../../Models/Components/Button';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {ICONS} from '../../constants/icons';
import {LogoView} from '../Components/Logo';
import {Header} from '../../Models/Header/Header';
import {ButtonView} from '../Components/ButtonView';
import {COLORS} from '../../constants/colors';

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
    backgroundColor: COLORS.HEADER_GRAY.bg,
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
    color: COLORS.HEADER_GRAY.text,
  },
  drawerBtnView: {
    paddingRight: wp(20),
  },
});
