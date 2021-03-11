import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {COLORS} from '../../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {ICONS} from '../../../constants/icons';
import {MultiFormBox} from '../../../Models/Components/MultiForm/MultiFormBox';

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
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderRadius: 5,
    paddingVertical: hp(5),
    marginHorizontal: wp(5),
    borderColor: COLORS.BORDER_COLOR_GRAY,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  boxText: {
    color: COLORS.GRAY_WHITE.text,
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
    color: COLORS.GRAY_WHITE.text,
    fontFamily: 'Roboto-Bold',
    fontSize: wp(28),
  },
  grayText: {
    color: COLORS.PLACEHOLDER,
    fontWeight: '400',
  },
  uneditable: {
    color: COLORS.UNEDITABLE.text,
  }
});
