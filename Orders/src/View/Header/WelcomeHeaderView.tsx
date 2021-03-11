import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TypedBaseComponent, IBaseProps} from '../../Common/BaseComponent';

import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {LogoView} from '../Components/Logo';
import { WelcomeHeader } from '../../Model/Header/WelcomeHeader';


class WelcomeHeaderView extends TypedBaseComponent<WelcomeHeader> {
    constructor(props: IBaseProps<WelcomeHeader>) {
    super(props);
  }
    render() {
        super.render();
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
                <LogoView bigLogo={true} id={`${this.props.id}_LogoView`} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subTitle}>{this.model.subTitle}</Text>
          <Text style={styles.mainText}>{this.model.title}</Text>
        </View>
      </View>
    );
  }
}

export {WelcomeHeaderView};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp(10),
  },
  logoContainer: {
    width: '30%',
  },
  textContainer: {
    width: '60%',
  },
  mainText: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(35),
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(20),
    textAlign: 'center',
  },
});
