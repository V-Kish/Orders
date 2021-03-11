import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {COLORS} from '../../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { MultiFormBox } from '../../../Model/Components/MultiForm/MultiFormBox';

class MultiFormBoxView extends TypedBaseComponent<MultiFormBox> {
  constructor(props: any) {
    super(props);
  }
  render() {
    super.render();
    const value = this.model.value;
    const container = this.model.style ? [styles.container,styles[`${this.model.style}_container`]] : styles.container
    const boxText = this.model.style ? styles[`${this.model.style}`] : styles.boxText
    return (
      <TouchableOpacity
        style={container}
        onPress={this.model.onPress}
        activeOpacity={1}
        >
        <Text
          style={
            !this.model.editable ?
              [boxText, styles.uneditable]
            :
            value === '' ? [boxText, styles.grayText] : boxText
          }>
          {value === '' ? '8' : value}
        </Text>
      </TouchableOpacity>
    );
  }
}

export {MultiFormBoxView};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red',
    borderRadius: 5,
    paddingVertical: hp(5),
    marginHorizontal: wp(5),
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  boxText: {
    color: 'red',
    fontFamily: 'Roboto-Bold',
    fontSize: wp(50),
  },
  small_container: {
    paddingVertical: 0,
    backgroundColor: 'rgba(0,0,0,.0)',
    borderWidth: 0,
    padding: 0,
    marginHorizontal: 0,
  },
  small:{
    color: 'red',
    fontFamily: 'Roboto-Bold',
    fontSize: wp(28),
  },
  grayText: {
    color: 'red',
    fontWeight: '400',
  },
  uneditable: {
    color: 'red',
  }
});
