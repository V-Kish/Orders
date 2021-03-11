import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View,Image} from 'react-native';
import {
  IBaseProps,
  MultiTypedBaseComponent,
} from '../../../Common/BaseComponent';
import {COLORS} from '../../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {ICONS} from '../../../constants/icons';
import {STYLES} from '../../../constants/styles';
import {RadioInput} from "../../../Model/Components/RadioForm/RadioInput";


class RadioInputView extends MultiTypedBaseComponent<RadioInput> {
  constructor(props: IBaseProps<RadioInput>) {
    super(props);
  }

  render() {
    // console.log('RadioInputView withVisualScale', this.model.withVisualScale);
    // console.log('RadioInputView disable', this.model.disable);
    let containerStyle;
    let mainTwitStyle;
    if (this.model.disable === null) {
      containerStyle = styles.container;
      mainTwitStyle = styles.twit;
    } else {
      mainTwitStyle = [styles.twit, {marginRight: 0}];
    }
    if (this.model.disable === false) {
      containerStyle = [styles.container, {opacity: 0.4}];
    }
    const mainTextStyle = this.model.disable
      ? {
          fontFamily: 'Roboto-Bold',
          fontSize: wp(14),
          letterSpacing: 0.6,
        }
      : {};
    let styleSelected;
    if (this.model.selected && this.model.type === 'checkbox') {
      styleSelected = [styles.twitContainer, styles.twitSelected];
    } else {
      styleSelected = styles.twitContainer;
    }
    if (this.model.selected && this.model.type === 'radiobox') {
      styleSelected = [styles.twitContainer_radio, styles.twitSelected_radio];
    }
    if (!this.model.selected && this.model.type === 'radiobox') {
      styleSelected = styles.twitContainer_radio;
    }
    const twitContainerStyle =
      this.model.disable !== null && this.model.type === 'radiobox'
        ? {}
        : styleSelected;
    const textStyle =
      this.model.style !== undefined ? styles[`${this.model.style}_text`] : {};
    const twitStyle =
      this.model.style !== undefined ? styles[`${this.model.style}_twit`] : {};
    /////
    super.render();
    if (!this.model.visible){
      return  null
    }
    return (
      <View style={containerStyle}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={this.model.onSelect}
          activeOpacity={1}>
          <View style={[styles.twit, twitStyle, mainTwitStyle,{width:'10%'}]}>
            <View style={twitContainerStyle}>
              {this.model.selected && this.model.type === 'checkbox' && (
                <View>
                  <Image source={ICONS.twit} style={styles.twitImg} />
                </View>
              )}
              {this.model.selected &&
                this.model.type === 'radiobox' &&
                this.model.disable === null && (
                  <View
                    style={[
                      styles.twitContainer_radio,
                      {
                        borderColor: this.model.getColor(),
                      },
                    ]}>
                    <View
                      style={[
                        styles.twitSelectedCircle_radio,
                        {
                          backgroundColor: this.model.getColor(),
                        },
                      ]}
                    />
                  </View>
                )}
            </View>
          </View>
          <View style={styles.content}>
            <Text
              style={[
                STYLES.robotoMiddle,
                styles.title,
                textStyle,
                mainTextStyle,
                {width:'90%'}
              ]}>
              {this.model.title}
            </Text>
            {this.model.withVisualScale && (
              <View style={{
                 //backgroundColor: 'green',
              }}>
                <View
                  style={{
                    height: wp(20),
                    marginVertical: wp(3),
                    backgroundColor: 'red',
                    justifyContent:'center',
                    width: this.model.disable ===null ? '90%' : '100%',
                  }}>
                  <View
                    style={{
                      height: wp(20),
                      width: `${this.model.percent}%`,
                      backgroundColor: this.model.getColor(),
                    }}
                  />
                  {this.model.description !== '' && (
                    <Text style={[STYLES.robotoSmall, styles.desc]}>
                      {this.model.description}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export {RadioInputView};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
    // opacity: 0.4,
  },
  touchable: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    paddingVertical: hp(7),
  },
  twit: {
    marginRight: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  twitContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: wp(20),
    height: wp(20),
    // backgroundColor: 'red',
    borderRadius: 3,
  },
  twitSelected: {
    borderWidth: 0,
  },
  twitContainer_radio: {
    borderWidth: 2,
    borderColor:'red',
    width: wp(20),
    height: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    // backgroundColor: 'red',
  },
  twitSelected_radio: {
    borderWidth: 0,
  },
  twitSelectedCircle_radio: {
    width: wp(10),
    height: wp(10),
    borderRadius: 20,
  },
  twitImg: {
    width: wp(20),
    height: wp(20),
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: hp(4),
  },
  title: {},
  desc: {
    color: 'red',
    paddingLeft: wp(10),
    position: 'absolute',
  },
  scale: {
    height: wp(2),
  },

  comissionForm_text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    marginTop: hp(5),
    fontSize: hp(12),
    lineHeight: hp(16),
    /* identical to box height */
    letterSpacing: -0.165,
    textTransform: 'uppercase',
    /* Gray 2 */
    color: 'red',
  },
  comissionForm_twit: {
    width: '10%',
  },
});
