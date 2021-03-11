import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import {Button} from '../../Models/Components/Button';
import {COLORS} from '../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {CounterView} from './CounterView';
import {navigator} from '../../Core/Navigator';
import Analytics from "../../Models/Analytics/Analytics";

export enum containers {
  container,
  icon,
  text,
  counterStyle,
  point,
}

class ButtonView extends TypedBaseComponent<Button> {
  constructor(props: any) {
    super(props);
  }

  isActive(value: containers) {
    switch (value) {
      case containers.container:
        if (this.model.isActive) {
          return styles[`${this.model.style}_active`]
            ? styles[`${this.model.style}_active`]
            : styles[this.model.style]
            ? styles[this.model.style]
            : null;
        } else {
          return styles[this.model.style] ? styles[this.model.style] : null;
        }
      case containers.icon:
        if (this.model.isActive) {
          return styles[`${this.model.style}_iconActive`]
            ? styles[`${this.model.style}_iconActive`]
            : styles[`${this.model.style}_icon`]
            ? styles[`${this.model.style}_icon`]
            : null;
        } else {
          return styles[`${this.model.style}_icon`]
            ? styles[`${this.model.style}_icon`]
            : null;
        }
      case containers.text:
        if (this.model.isActive) {
          return styles[`${this.model.style}_textActive`]
            ? styles[`${this.model.style}_textActive`]
            : styles[`${this.model.style}_text`]
            ? styles[`${this.model.style}_text`]
            : null;
        } else {
          return styles[`${this.model.style}_text`]
            ? styles[`${this.model.style}_text`]
            : null;
        }
      case containers.counterStyle:
        return styles[`${this.model.style}_counterStyle`];
      case containers.point:
        return styles[`${this.model.style}_point`];
    }
  }

  render() {
    super.render();
    if (!this.model.isVisible) {
      return <></>;
    }
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.95];
    const scale = animation.interpolate({inputRange, outputRange});

    const onPressIn = () => {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };
    const onPressOut = () => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };
    if (!this.model.textOut) {
      if (this.props.isShowDoubleButton) {
        return (
          <TouchableOpacity
            disabled={this.model.disabled}
            activeOpacity={this.model.activeOpacity}
            style={this.model.disabled ? styles.defaultDisableBtn : this.isActive(containers.container)}
            onPress={this.model.onPress}>
            {typeof this.model.icon !== 'undefined' && (
              <Image
                source={
                  typeof this.props.icon !== 'undefined'
                    ? this.props.icon
                    : this.model.icon
                }
                style={
                  this.props.isShowDoubleButton
                    ? styles.iconImg
                    : this.isActive(containers.icon)
                }
              />
            )}
            {typeof this.model.title !== 'undefined' && (
              <Text style={[this.isActive(containers.text), this.model.disabled ? styles.defaultDisableBtn_text : {}]}>
                {this.model.title}
              </Text>
            )}
            {typeof this.model.iconDouble !== 'undefined' && (
              <Image
                source={
                  typeof this.props.iconDouble !== 'undefined'
                    ? this.props.iconDouble
                    : this.model.iconDouble
                }
                style={
                  this.props.isShowDoubleButton
                    ? styles.doubleImg
                    : this.isActive(containers.icon)
                }
              />
            )}
            {typeof this.model.titleDouble !== 'undefined' && (
              <Text style={this.isActive(containers.text)}>
                {this.model.titleDouble}
              </Text>
            )}
          </TouchableOpacity>
        );
      } else {
        return (
          <Animated.View style={[{transform: [{scale}]}]}>
            <TouchableOpacity
              disabled={this.model.disabled}
              onPressIn={this.model.disabledAnimation ? () => {} : onPressIn}
              onPressOut={this.model.disabledAnimation ? () => {} : onPressOut}
              activeOpacity={
                this.model.disabledAnimation ? this.model.activeOpacity : 1
              }
              style={[
                {
                  backgroundColor: this.model.backgroundColor
                    ? this.model.backgroundColor
                    : null,
                },
                this.props.textStyle === true
                  ? styles.btnDrop
                  : this.isActive(containers.container),
                this.model.disabled ? styles.defaultDisableBtn : {}
              ]}
              onPress={this.model.onPress}>
              {this.model.preloader && (
                <View
                  style={[
                    {
                      zIndex: 99,
                      position: 'absolute',
                      alignSelf: 'center',
                      // right: hp(15),
                      // top: '50%',
                    },
                  ]}>
                  <ActivityIndicator
                    size="large"
                    color={this.model.colorPreloader}
                  />
                </View>
              )}
              <View style={this.isActive(containers.counterStyle)}>
                <CounterView
                  model={this.model.counterModel}
                  key={this.model.counterModel.id}
                  id={`${
                    this.model.counterModel.id
                  }_${navigator().getCurrentScreen()}_button`}
                />
              </View>
              {this.model.showPoint && (
                <View style={this.isActive(containers.point)} />
              )}
              {typeof this.model.icon !== 'undefined' && (
                <Image
                  source={
                    typeof this.props.icon !== 'undefined'
                      ? this.props.icon
                      : this.model.icon
                  }
                  style={this.isActive(containers.icon)}
                />
              )}
              {typeof this.model.title !== 'undefined' && (
                <Text
                  style={[
                    (this.props.textStyle === true
                      ? styles.textDrop
                      : this.isActive(containers.text)),
                    this.model.disabled ? styles.defaultDisableBtn_text : {},
                    this.model.textColor ? {color:this.model.textColor} : {}
                  ]}
                  numberOfLines={2}>
                  {this.model.title}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      }
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={this.model.activeOpacity}
            style={this.isActive(containers.container)}
            onPress={this.model.onPress}>
            {typeof this.model.icon !== 'undefined' && (
              <Image
                source={
                  typeof this.props.icon !== 'undefined'
                    ? this.props.icon
                    : this.model.icon
                }
                style={this.isActive(containers.icon)}
              />
            )}
          </TouchableOpacity>
          <Text style={this.isActive(containers.text)}>{this.model.title}</Text>
        </View>
      );
    }
  }
}

export {ButtonView};

const styles = StyleSheet.create({
  remindText:{
    justifyContent:'center',
    alignItems:'center',
  },
  remindText_text:{
    fontFamily: 'Roboto-Regular',
    color: COLORS.FONT_BLACK,
    fontSize: hp(20),
  },
  privacyPolicyStyles:{
  },
  privacyPolicyStyles_text:{
    fontFamily: 'Roboto-Regular',
    fontSize: hp(16),
    color: COLORS.FONT_BLACK,
  },
  dismissBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth:1,
    // borderStyle:'solid',
    // borderColor:COLORS.FONT_GRAY_TITLE.text
  },
  dismissBoxStyle_text: {
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  // redPoint
  filterBtnStyle_point: {
    position: 'absolute',
    backgroundColor: 'red',
    width: hp(15),
    height: hp(15),
    borderRadius: 50,
    left: -3,
    top: -3,
  },
  calendarBtnStyle_point: {
    position: 'absolute',
    backgroundColor: 'red',
    width: hp(15),
    height: hp(15),
    borderRadius: 50,
    left: -3,
    top: -3,
  },
  //add
  addBtnStyle: {
    backgroundColor: COLORS.YELLOW_BTN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    right: wp(15),
    bottom: hp(25),
    padding: wp(20),
  },
  addBtnStyle_icon: {
    resizeMode: 'contain',
    width: wp(20),
    height: wp(20),
  },
  reminderBtnStyle: {
    backgroundColor: COLORS.GREEN.bg,
    paddingHorizontal: wp(20),
    paddingVertical: hp(10),
    borderRadius: 5,
    marginTop: hp(10),
  },
  reminderBtnStyle_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(20),
    color: COLORS.FONT_WHITE,
  },
  //
  drawerButtonsStyles: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(20),
  },
  drawerButtonsStyles_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(20),
    color: COLORS.FONT_BLACK,
    fontWeight: '600',
  },
  drawerButtonsStyles_icon: {
    resizeMode: 'contain',
    width: wp(20),
    height: wp(20),
    marginRight: wp(20),
  },
  drawerButtonsStyles_counterStyle: {
    position: 'absolute',
    left: wp(35),
    top: hp(-10),
  },
  //
  homeBTNBottomNav_counterStyle: {
    position: 'absolute',
    right: wp(10),
    top: hp(-5),
  },
  downloadPhotoPicker: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(1),
    paddingTop: hp(5),
    paddingBottom: hp(5),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  downloadPhotoPicker_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(14),
    color: COLORS.FONT_WHITE,
    paddingHorizontal: hp(5),
    paddingVertical: hp(5),
  },
  drawerIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp(45),
    height: wp(45),
  },
  drawerIconStyle_icon: {
    resizeMode: 'contain',
    width: wp(25),
    height: wp(25),
  },
  doubleImg: {
    marginHorizontal: hp(10),
  },
  iconImg: {
    marginHorizontal: hp(5),
  },
  btnDrop: {
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.FONT_YELLOW,
    paddingHorizontal: hp(15),
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: hp(10),
    maxWidth: wp(200),
    borderRadius: wp(10),
  },
  textDrop: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp(18),
    textTransform: 'uppercase',
    textAlign: 'left',
    color: COLORS.FONT_BLACK,
    paddingHorizontal: hp(5),
  },
  drawerMain: {
    // width: '100%',
    paddingLeft: hp(35),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myCard: {
    backgroundColor: COLORS.HEADER_BACKGROUND,
    paddingHorizontal: hp(15),
    alignItems: 'center',
    paddingVertical: hp(10),
    width: wp(155),
  },
  myCard_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  drawerIconStyleHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: wp(15),
    // backgroundColor: 'red',
    height: hp(40),
    width: wp(60),
    // backgroundColor: 'red',
    // paddingLeft: wp(10),
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'black'
  },
  drawerIconStyleHeader_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  searchBtnStyle_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
    marginRight: hp(30),
  },
  myCard_text: {
    fontFamily: 'Roboto-Medium',
    fontSize: wp(10),
    textTransform: 'uppercase',
    marginTop: hp(3),
    color: COLORS.FONT_WHITE,
  },
  myCard_active: {
    backgroundColor: COLORS.BUTTON_BUY_SALE_YELLOW,
    paddingHorizontal: hp(15),
    alignItems: 'center',
    paddingVertical: hp(10),
    width: wp(155),
  },
  myCard_iconActive: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  myCard_textActive: {
    fontFamily: 'Roboto-Medium',
    fontSize: wp(10),
    textTransform: 'uppercase',
    marginTop: hp(3),
    color: COLORS.FONT_BLACK,
  },
  forgotPassword: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(10),
    alignItems: 'center',
    paddingHorizontal: hp(50),
    borderRadius: wp(25),
    width: '100%',
    //marginLeft:hp(-25)
  },
  forgotPassword_text: {
    fontFamily: 'Roboto-Medium',
    fontSize: wp(14),
    textAlign: 'center',
    color: 'rgba(80,80,80,.8)',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  forgotPassword_icon: {
    resizeMode: 'contain',
    width: hp(20),
    height: hp(20),
    marginRight: wp(5),
  },
  bonusProgram: {
    backgroundColor: COLORS.HEADER_BACKGROUND,
    paddingHorizontal: hp(15),
    alignItems: 'center',
    paddingVertical: hp(5),
    flex: 1,
  },
  bonusProgram_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  bonusProgram_text: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(12),
    textTransform: 'uppercase',
    marginTop: hp(3),
    color: COLORS.FONT_WHITE,
    textAlign: 'center',
  },
  bonusProgram_active: {
    backgroundColor: COLORS.BUTTON_BUY_SALE_YELLOW,
    paddingHorizontal: hp(15),
    alignItems: 'center',
    paddingVertical: hp(5),
    flex: 1,
  },
  bonusProgram_iconActive: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  bonusProgram_textActive: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(12),
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: hp(3),
    color: COLORS.FONT_WHITE,
  },
  score: {
    backgroundColor: COLORS.HEADER_BACKGROUND,
    paddingHorizontal: hp(15),
    alignItems: 'center',
    paddingVertical: hp(5),
  },
  score_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  score_text: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(12),
    textTransform: 'uppercase',
    marginTop: hp(3),
    color: COLORS.FONT_WHITE,
  },
  score_active: {
    backgroundColor: COLORS.BUTTON_BUY_SALE_YELLOW,
    paddingHorizontal: hp(15),
    alignItems: 'center',
    paddingVertical: hp(5),
  },
  score_iconActive: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  score_textActive: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(12),
    textTransform: 'uppercase',
    marginTop: hp(3),
    color: COLORS.FONT_WHITE,
  },
  buttonSendPassword: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(50),
    paddingTop: hp(10),
    paddingBottom: hp(10),
    borderRadius: wp(25),
    backgroundColor: COLORS.BUTTON_RED,
    marginTop: hp(30),
    marginBottom: hp(30),
  },
  buttonSendPassword_text: {
    color: COLORS.FONT_WHITE,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
  },
  //OUR STYLE
  startButton: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(60),
    paddingTop: hp(15),
    paddingBottom: hp(15),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  startButton_text: {
    fontSize: hp(16),
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto-Regular',
  },
  backButtonForm: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: hp(20),
    paddingBottom: hp(20),
    paddingHorizontal: hp(10),
    borderRadius: wp(10),
    width: wp(160),
    justifyContent: 'center',
    backgroundColor: COLORS.BLUE.bg,
  },
  backButtonForm_text: {
    fontSize: hp(16),
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto-Regular',
  },
  sendButtonForm: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: hp(20),
    paddingBottom: hp(20),
    paddingHorizontal: hp(10),
    borderRadius: wp(10),
    width: wp(160),
    backgroundColor: COLORS.GREEN.bg,
  },
  sendButtonForm_text: {
    fontSize: hp(16),
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto-Regular',
  },
  searchBTN: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp(20),
    width: '100%',
    // paddingHorizontal: hp(80),
    paddingTop: hp(20),
    paddingBottom: hp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  homeBTNBottomNav: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: hp(10),
    borderRadius: 50,
    backgroundColor: COLORS.BLUE.bg,
    marginRight: wp(20),
  },
  homeBTNBottomNav_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  defaultStylesNavigation: {
    alignItems: 'center',
    justifyContent:'space-between',
    width: hp(140),
    height: hp(140),
    borderRadius: 10,
    paddingBottom:hp(15),
    paddingTop:hp(30),
    paddingHorizontal:wp(5),
  },
  defaultStylesNavigation_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    textAlignVertical:'bottom',
    fontSize: hp(13),
  },
  defaultStylesNavigation_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  defaultStylesNavigation_counterStyle: {
    position: 'absolute',
    right: wp(-10),
    top: hp(-10),
  },
  blueButtonSerch: {
    // alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // flex: 1,
    width: '100%',
    // paddingHorizontal: hp(80),
    paddingTop: hp(20),
    paddingBottom: hp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  blueButtonSerch_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    //  paddingLeft: wp(20),
    fontSize: hp(16),
  },
  blueButtonSerch_icon: {
    marginRight: wp(10),
  },
  //EXTENSION BTNS
  blueButtonExtension: {
    // alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // flex: 1,
    width: '100%',
    // paddingHorizontal: hp(80),
    paddingTop: hp(10),
    paddingBottom: hp(10),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  blueButtonExtension_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    //  paddingLeft: wp(20),
    fontSize: hp(16),
    flex: 3,
    textAlign: 'center',
  },
  blueButtonExtension_icon: {
    // marginRight:wp(10)
    width: wp(30),
    height: wp(50),
    marginLeft: wp(15),
  },
  greenButtonExtension: {
    // alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // flex: 1,
    width: '100%',
    // paddingHorizontal: hp(80),
    paddingTop: hp(10),
    paddingBottom: hp(10),
    borderRadius: wp(10),
    backgroundColor: COLORS.GREEN.bg,
  },
  greenButtonExtension_text: {
    color: COLORS.GREEN.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    //  paddingLeft: wp(20),
    fontSize: hp(16),
    flex: 3,
    textAlign: 'center',
  },
  greenButtonExtension_icon: {
    // marginRight:wp(10),
    width: wp(50),
    height: wp(50),
    marginLeft: wp(5),
    // marginLeft: wp(10)
    // flex: 1
  },
  greenButtonAdmin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: hp(25),
    borderRadius: wp(10),
    backgroundColor: COLORS.GREEN.bg,
  },
  greenButtonAdmin_text: {
    color: COLORS.GREEN.text,
    fontFamily: 'Roboto-Regular',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: hp(18),
    textAlign: 'center',
  },
  greenButtonAdmin_icon: {
    // marginRight:wp(10),
    // width: wp(50),
    // height: wp(50),
    // marginLeft: wp(5)
    // marginLeft: wp(10)
    // flex: 1
  },
  darkGreenButtonAdmin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: hp(25),
    borderRadius: wp(10),
    backgroundColor: COLORS.DARK_GREEN.bg,
  },
  darkGreenButtonAdmin_text: {
    color: COLORS.DARK_GREEN.text,
    fontFamily: 'Roboto-Light',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: hp(18),
    textAlign: 'center',
  },
  darkGreenButtonAdmin_icon: {
    // marginRight:wp(10),
    // width: wp(50),
    // height: wp(50),
    // marginLeft: wp(5)
    // marginLeft: wp(10)
    // flex: 1
  },
  redButtonAdmin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: hp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.DANGER_EVENT.bg_dark,
  },
  redButtonAdmin_text: {
    color: COLORS.GREEN.text,
    fontFamily: 'Roboto-Regular',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: hp(18),
    textAlign: 'center',
  },
  editButtonAdmin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(15),
    paddingVertical: wp(10),
    borderRadius: wp(5),
  },
  editButtonAdmin_text: {
    color: COLORS.FONT_WHITE,
    fontFamily: 'Roboto-Regular',
    // textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: hp(18),
    textAlign: 'center',
  },
  greenCircleButtonAdmin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: wp(12),
  },
  greenCircleButtonAdmin_icon: {
    width: wp(30),
    height: wp(30),
    borderRadius: 50,
  },
  likeHeartButtonAdmin: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingVertical: wp(12),
  },
  likeHeartButtonAdmin_icon: {
    width: wp(17),
    height: wp(16),
  },
  likeHeartButtonAdmin_text: {
    fontFamily: 'Roboto-Light',
    fontSize: wp(12),
    paddingRight: wp(4),
  },
  disabledButtonAppDep: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: wp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
    opacity: 0.5,
  },
  disabledButtonAppDep_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto-Light',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: hp(18),
    textAlign: 'center',
  },
  disabledButtonLivers: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: hp(25),
    borderRadius: wp(10),
    backgroundColor: COLORS.DARK_BLUE.bg,
    opacity: 0.5,
  },
  disabledButtonLivers_text: {
    color: COLORS.DARK_BLUE.text,
    fontFamily: 'Roboto-Light',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: hp(18),
    textAlign: 'center',
  },
  smallBlueButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: wp(14),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  smallBlueButton_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp(20),
    // lineHeight: hp(19),
  },
  smallRedButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: wp(14),
    borderRadius: wp(10),
    backgroundColor: COLORS.DANGER_EVENT.bg_dark,
  },
  smallRedButton_text: {
    color: COLORS.RED.text,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp(20),
    // lineHeight: hp(19),
  },
  blueButtonAdmin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: wp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  blueButtonAdmin_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto-Regular',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: hp(18),
    textAlign: 'center',
  },
  blueButtonAdmin_icon: {
    // marginRight:wp(10),
    // width: wp(50),
    // height: wp(50),
    // marginLeft: wp(5)
    // marginLeft: wp(10)
    // flex: 1
  },

  darkBlueButtonAdmin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: hp(25),
    borderRadius: wp(10),
    backgroundColor: COLORS.DARK_BLUE.bg,
  },
  darkBlueButtonAdmin_text: {
    color: COLORS.DARK_BLUE.text,
    fontFamily: 'Roboto-Regular',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: hp(18),
    textAlign: 'center',
  },
  darkBlueButtonAdmin_icon: {
    // marginRight:wp(10),
    // width: wp(50),
    // height: wp(50),
    // marginLeft: wp(5)
    // marginLeft: wp(10)
    // flex: 1
  },
  greenButtonRefresh: {
    // alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // flex: 1,
    width: '100%',
    // paddingHorizontal: hp(80),
    paddingTop: hp(10),
    paddingBottom: hp(10),
    borderRadius: wp(10),
    backgroundColor: COLORS.GREEN.bg,
  },
  greenButtonRefresh_text: {
    color: COLORS.GREEN.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    //  paddingLeft: wp(20),
    fontSize: hp(16),
    // flex: 3,
    textAlign: 'center',
  },
  greenButtonRefresh_icon: {
    // marginRight:wp(10),
    width: wp(50),
    height: wp(50),
    marginLeft: wp(5),
    // marginLeft: wp(10)
    // flex: 1
  },
  //END EXTENSION BUTTONS
  disabledBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: hp(20),
    paddingBottom: hp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.HEADER_GRAY.bg,
  },
  disabledBtn_text: {
    color: COLORS.FONT_BLACK,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    fontSize: hp(16),
  },

  floatingActionButtonAdd: {
    position: 'absolute',
    // resizeMode: 'contain',
    backgroundColor: COLORS.YELLOW,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(64),
    height: wp(64),
    borderRadius: wp(32),
    margin: 20,
    shadowColor: 'rgba(0, 0, 0, .25)',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  floatingActionButtonAdd_icon: {
    // resizeMode: 'contain',
    width: wp(50),
    height: wp(50),
  },

  bottomMenuButton: {
    paddingLeft: wp(30),
    paddingTop: wp(15),
    paddingBottom: wp(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.BLUE.text,
    borderBottomWidth: 1,
  },

  bottomMenuButtonLast: {
    paddingLeft: wp(30),
    paddingTop: wp(15),
    paddingBottom: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomMenuButtonLast_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto-Regular',
    textTransform: 'uppercase',
    marginLeft: wp(5),
    fontSize: hp(20),
    paddingLeft: wp(25),
  },

  bottomMenuButton_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto-Regular',
    textTransform: 'uppercase',
    fontSize: hp(20),
    paddingLeft: wp(25),
  },

  bottomMenuButton_icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  blueButton: {
    // alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // flex: 1,
    width: '100%',
    // paddingHorizontal: hp(80),
    paddingTop: hp(20),
    paddingBottom: hp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  blueFlexButton: {
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 0.31,
    alignItems: 'center',
    paddingTop: hp(20),
    paddingBottom: hp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  searchBTN_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    paddingLeft: wp(20),
    fontSize: hp(16),
  },
  newOsbbBtn: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp(20),
    width: '100%',
    // paddingHorizontal: hp(80),
    paddingTop: hp(20),
    paddingBottom: hp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.GREEN.bg,
  },
  newOsbbBtn_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    paddingLeft: wp(20),
    fontSize: hp(16),
  },
  blueButton_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    // height: hp(100),
    // paddingLeft:wp(20),
    fontSize: hp(16),
  },
  blueFlexButton_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    // height: hp(100),
    // paddingLeft:wp(20),
    fontSize: hp(16),
  },
  greenButton: {
    // alignSelf: 'center',
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    // paddingHorizontal: hp(80),
    // paddingLeft:wp(20),
    paddingTop: hp(10),
    paddingBottom: hp(10),
    borderRadius: wp(10),
    backgroundColor: COLORS.GREEN.bg,
  },
  greenButton_text: {
    // backgroundColor: 'red',
    color: COLORS.GREEN.text,
    fontFamily: 'Lato-Bold',
    // paddingLeft:wp(20),
    textTransform: 'uppercase',
    fontSize: hp(16),
  },
  greenFlexButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.54,
    // paddingLeft:wp(20),
    paddingTop: hp(20),
    paddingBottom: hp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.GREEN.bg,
  },
  greenFlexButton_text: {
    // backgroundColor: 'red',
    color: COLORS.GREEN.text,
    fontFamily: 'Lato-Bold',
    // paddingLeft:wp(20),
    textTransform: 'uppercase',
    fontSize: hp(16),
  },
  textButton: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: hp(18),
    paddingBottom: hp(18),
  },
  textButton_text: {
    color: COLORS.GRAY_WHITE.text,
    fontFamily: 'Lato',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    // borderColor: COLORS.FONT_BLACK,
  },
  //END OUR STYLE
  registrationButton: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(80),
    paddingTop: hp(18),
    paddingBottom: hp(18),
    borderRadius: wp(25),
    backgroundColor: COLORS.BUTTON_RED,
  },
  registrationButton_text: {
    color: COLORS.FONT_WHITE,
    fontFamily: 'Lato-Bold',
  },
  registrationButtonActive: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(80),
    paddingTop: hp(18),
    paddingBottom: hp(18),
    borderRadius: wp(25),
    backgroundColor: COLORS.BUTTON_RED,
  },
  registrationButton_textActive: {
    color: COLORS.FONT_WHITE,
    fontFamily: 'Lato-Bold',
  },
  /// BonusProgram screen back arrow
  arrowBack: {
    flexDirection: 'row',
    marginLeft: wp(20),
    marginRight: wp(10),
    alignItems: 'center',
    paddingHorizontal: hp(10),
    borderRadius: 50,
  },
  arrowBack_text: {
    color: COLORS.FONT_WHITE,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp(15),
  },
  arrowBack_icon: {
    marginTop: wp(5),
    marginRight: wp(10),
    resizeMode: 'contain',
    height: hp(35),
    width: hp(35),
  },
  //exchangeButtons styles
  exchangeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(20),
    width: hp(80),
    height: hp(80),
    backgroundColor: COLORS.FONT_YELLOW,
    marginLeft: wp(20),
  },
  exchangeButton_active: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(20),
    width: hp(80),
    height: hp(80),
    borderWidth: wp(2),
    borderStyle: 'solid',
    borderColor: '#806A00',
    backgroundColor: COLORS.HEADER_BACKGROUND,
    marginLeft: wp(20),
  },
  exchangeButton_icon: {
    resizeMode: 'contain',
    width: wp(42),
    height: hp(42),
  },
  exchangeButton_text: {
    marginTop: hp(9),
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: COLORS.FONT_YELLOW,
    fontSize: hp(16),
    marginLeft: wp(20),
  },
  /// Chat screen
  // buttonAll
  buttonChatNavigation: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(10),
    paddingHorizontal: hp(20),
  },
  // button curs
  buttonCurs: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(7),
  },
  buttonCurs_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  submitButton: {
    backgroundColor: COLORS.BUTTON_GREEN,
    width: wp(211),
    height: hp(60),
    borderRadius: hp(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton_text: {
    color: COLORS.FONT_WHITE,
    //textTransform: 'uppercase',
    fontFamily: 'Lato-Regular',
    fontStyle: 'normal',
    fontSize: hp(22),
    fontWeight: '500',
  },
  closeButton: {
    width: wp(150),
    height: hp(30),
    marginTop: hp(20),
    backgroundColor: COLORS.BUTTON_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(10),
  },
  closeButton_text: {
    color: COLORS.FONT_WHITE,
    fontFamily: 'Lato-Regular',
    fontSize: hp(16),
  },
  // info btn understand
  btnUnderstand: {
    flexDirection: 'column',
    backgroundColor: 'rgba(67, 176, 92, 1)',
    borderRadius: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(120),
    padding: hp(3),
    marginTop: hp(10),
  },
  btnUnderstand_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(14),
    color: COLORS.FONT_WHITE,
    textTransform: 'uppercase',
  },
  btnUnderstand_active: {
    flexDirection: 'column',
    backgroundColor: 'rgb(121,119,119)',
    borderRadius: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(120),
    padding: hp(3),
    marginTop: hp(10),
  },
  btnUnderstand_textActive: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(14),
    color: COLORS.FONT_WHITE,
    textTransform: 'uppercase',
  },
  btnShowMore: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: hp(15),
  },
  btnShowMore_text: {
    backgroundColor: COLORS.BACKGROUND_DARK,
    borderRadius: hp(10),
    padding: hp(5),

    fontFamily: 'Roboto-Medium',
    fontSize: hp(14),
    color: COLORS.FONT_WHITE,
    textTransform: 'uppercase',
  },
  // curs button settings
  btnSettings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSettings_text: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(13),
    color: COLORS.FONT_WHITE,
    marginLeft: hp(5),
  },
  // create new chat sent btn
  btnSend: {
    width: '100%',
    backgroundColor: COLORS.FONT_YELLOW,
    paddingHorizontal: hp(10),
    paddingVertical: hp(10),
    borderRadius: hp(10),
  },
  btnSend_text: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.HEADER_BACKGROUND,
    fontSize: hp(18),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  //Archive Exchange Rates
  chooseBtn: {
    backgroundColor: COLORS.FONT_YELLOW,
    minWidth: wp(110),
    minHeight: hp(35),
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(10),
    paddingHorizontal: wp(5),
    flexDirection: 'row-reverse',
  },
  chooseBtn_text: {
    fontSize: hp(18),
    color: COLORS.FONT_BLACK,
    maxWidth: wp(110),
  },
  currencyCrossCurs: {
    backgroundColor: COLORS.FONT_YELLOW,
    // height: hp(60),
    borderRadius: hp(30),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    paddingHorizontal: hp(15),
    paddingVertical: hp(5),
  },
  currencyCrossCurs_text: {
    fontWeight: 'bold',
    fontSize: hp(28),
    color: COLORS.FONT_BLACK,
  },
  currencyCrossCurs_icon: {
    marginLeft: wp(3),
  },
  currencyBtn: {
    backgroundColor: COLORS.FONT_YELLOW,
    width: wp(110),
    height: hp(60),
    borderRadius: hp(30),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  currencyBtn_text: {
    fontWeight: 'bold',
    fontSize: hp(28),
    color: COLORS.FONT_BLACK,
  },
  currencyBtn_icon: {
    marginLeft: wp(3),
  },
  depDropdownBtn: {
    backgroundColor: COLORS.FONT_YELLOW,
    minWidth: wp(150),
    minHeight: hp(60),
    borderRadius: hp(25),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    paddingHorizontal: wp(10),
    paddingVertical: hp(5),
    //marginLeft: wp(-20),
  },
  depDropdownBtn_text: {
    fontSize: hp(18),
    color: COLORS.FONT_BLACK,
    maxWidth: wp(110),
    marginRight: wp(20),
  },
  depDropdownBtn_icon: {
    marginLeft: wp(3),
  },
  arrowBtn_icon: {
    height: hp(20),
    width: wp(20),
  },
  ////////////
  applyButton: {
    width: wp(270),
    height: hp(60),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(45),
    backgroundColor: '#57B460',
  },
  applyButton_text: {
    fontFamily: 'Lato-Regular',
    fontSize: hp(22),
    color: COLORS.FONT_WHITE,
  },
  btnCurrs: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fed400',
    borderRadius: 10,
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
  },
  btnCurrs_icon: {
    resizeMode: 'contain',
    width: wp(20),
    height: hp(20),
    marginRight: hp(10),
  },
  btnCalls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fed400',
    borderRadius: 10,
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
  },
  btnCalls_icon: {
    resizeMode: 'contain',
    width: wp(20),
    height: hp(20),
    marginRight: hp(10),
  },
  drawerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(40),
    marginTop: hp(10),
    marginLeft: wp(16),
  },
  drawerButton_icon: {
    resizeMode: 'contain',
    height: hp(24),
    width: wp(26),
    marginRight: wp(32),
  },
  drawerButton_text: {
    fontFamily: 'Roboto-Light',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: hp(20),
    color: COLORS.FONT_WHITE,
  },
  // Drawer Auth list
  buttonsAuthDrawer: {},
  buttonsAuthDrawer_text: {
    color: COLORS.BUTTON_BUY_SALE_YELLOW,
    fontFamily: 'Roboto-Regular',
    fontSize: hp(24),
  },
  // Alert Buttons
  alertButton: {
    backgroundColor: COLORS.FONT_GRAY_WHITE,
    alignItems: 'center',
    padding: hp(10),
    marginTop: hp(50),
    width: wp(100),
    borderRadius: hp(10),
    marginLeft: wp(5),
    marginRight: wp(5),
  },
  alertButton_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(14),
    color: COLORS.FONT_BLACK,
    textTransform: 'uppercase',
  },
  openBigDrawer: {
    height: hp(45),
    width: wp(50),
  },
  openSmallDrawer: {
    height: hp(60),
    justifyContent: 'center',
    width: wp(45),
  },
  // About program
  buttonPolicy_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(14),
    color: COLORS.FONT_YELLOW,
  },
  //send
  wrapBtnSend: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: 'red',
  },
  textBody_text: {
    marginTop: hp(15),
    marginBottom: hp(15),
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    color: COLORS.FONT_YELLOW,
    fontSize: hp(16),
  },

  // pay yellow btn
  yellowPayBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(15),
    paddingHorizontal: wp(25),
    borderRadius: wp(10),
    backgroundColor: '#F2C94C',
  },
  yellowPayBtn_text: {
    // textAlign: 'center',
    // fontFamily: 'Roboto-Light',
    // fontSize: wp(18),
    // letterSpacing: 0.8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp(18),
    lineHeight: hp(19),
    color: COLORS.GRAY_WHITE.text,
// border: 0.2px solid #FFFFFF;
  },
  // Calendar blue btn
  calendarBtnStyle: {
    backgroundColor: COLORS.PRIMARY.bg,
    padding: wp(10),
    borderRadius: 10,
  },
  calendarBtnStyle_icon: {
    width: wp(25),
    height: wp(25),
  },
  // Calendar blue btn
  filterBtnStyle: {
    backgroundColor: COLORS.PRIMARY.bg,
    padding: wp(15),
    borderRadius: 10,
  },
  filterBtnStyle_icon: {
    width: wp(15),
    height: wp(15),
  },
  // FLOAT BUTTON
  floatButton: {
    backgroundColor: COLORS.YELLOW_75,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(45),
    height: wp(45),
    borderRadius: 50,
  },
  floatButton_icon: {
    resizeMode: 'contain',
    width: wp(20),
    height: wp(20),
  },
  floatButton_revert: {
    backgroundColor: COLORS.YELLOW_75,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(45),
    height: wp(45),
    borderRadius: 50,
    transform: [{ rotate: "180deg" }],
  },
  floatButton_revert_icon: {
    resizeMode: 'contain',
    width: wp(20),
    height: wp(20),
  },
  //
  ossBtnSearch: {
    // alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // flex: 1,
    width: '100%',
    height: hp(60),
    // paddingHorizontal: hp(80),
    paddingTop: hp(15),
    paddingBottom: hp(15),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  ossBtnSearch_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    //  paddingLeft: wp(20),
    fontSize: hp(16),
  },
  ossBtnSearch_icon: {
    resizeMode: 'contain',
    width: hp(35),
    height: hp(35),
    marginRight: wp(10),
  },
  // user details btns
  newChatBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: hp(20),
    paddingTop: hp(15),
    paddingBottom: hp(15),
    borderRadius: wp(10),
    backgroundColor: COLORS.PURPLE.bg,
  },
  newChatBtn_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(18),
    fontWeight: '600',
    color: COLORS.FONT_WHITE,
    marginLeft: wp(3),
  },
  newChatBtn_icon: {
    width: wp(20),
    height: wp(16),
  },
  myAccountsBtnStyles: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  myAccountsBtnStyles_text: {
    color: COLORS.BLUE.bg,
    fontFamily: 'Roboto-Regular',
    fontSize: wp(14),
    marginRight: wp(10),
  },
  myAccountsBtnStyles_icon: {
    width: wp(15),
    height: wp(25),
  },
  chatBtnBackStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(50),
    marginRight: wp(15),
  },
  chatBtnBackStyles_text: {
    color: COLORS.BLUE.bg,
    fontFamily: 'Roboto-Regular',
    fontSize: wp(14),
    marginLeft: wp(8),
  },
  chatBtnBackStyles_icon: {
    resizeMode: 'contain',
    width: wp(15),
    height: wp(25),
  },
  blockUserBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // width: '80%',
    paddingHorizontal: hp(20),
    // paddingLeft:wp(20),
    paddingTop: hp(15),
    paddingBottom: hp(15),
    borderRadius: wp(10),
    backgroundColor: COLORS.FONT_GRAY_TITLE.text,
  },
  blockUserBtn_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(18),
    fontWeight: '600',
    color: COLORS.FONT_WHITE,
  },
  blockUserBtn_icon: {
    width: wp(15),
    height: wp(15),
  },

  showHideBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // width: '80%',
    // paddingHorizontal: hp(20),
    // paddingLeft:wp(20),
    // paddingTop: hp(10),
    // paddingBottom: hp(10),
    // borderRadius: wp(10),
    // backgroundColor: COLORS.GRAY.bg,
  },
  showHideBtn_text: {
    fontFamily: 'Roboto-Light',
    color: COLORS.FONT_DETAIL_GRAY,
    fontSize: wp(18),
    textDecorationLine: 'underline',
  },
  // showHideBtn_icon: {
  //   width: wp(15),
  //   height: wp(15),
  // },
  // detailButtons
  detailButtonsAccept: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(20),
    paddingHorizontal: hp(25),
    borderRadius: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },
  detailButtonsAccept_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    fontSize: hp(18),
  },
  detailButtonsCancel: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(20),
    paddingHorizontal: hp(25),
    borderRadius: wp(10),
    backgroundColor: COLORS.FONT_GRAY_TITLE.text,
  },
  detailButtonsCancel_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    fontSize: hp(18),
  },
  detailButtonsCancelOpacity: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(20),
    paddingHorizontal: hp(25),
    borderRadius: wp(10),
  },
  detailButtonsCancelOpacity_text: {
    color: COLORS.BLUE.bg,
    fontFamily: 'Lato-Regular',
    fontSize: hp(18),
  },
  detailButtonsFinish: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(20),
    paddingHorizontal: hp(25),
    borderRadius: wp(10),
    backgroundColor: COLORS.WARNING_EVENT.text,
  },
  detailButtonsFinish_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Lato-Bold',
    fontSize: hp(18),
  },
  blueTextBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueTextBtn_text: {
    color: COLORS.BLUE.bg,
    fontSize: wp(14),
    fontFamily: 'Roboto',
    // textDecorationLine: "underline"
  },
  greenButtonBorderBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: hp(20),
    paddingBottom: hp(20),
    borderBottomRightRadius: wp(10),
    borderBottomLeftRadius: wp(10),
    backgroundColor: COLORS.GREEN.bg,
  },
  greenButtonBorderBottom_text: {
    color: COLORS.BLUE.text,
    fontFamily: 'Roboto-Regular',
    textTransform: 'uppercase',
    fontSize: hp(18),
  },

  moreBtnStyle: {
    width: '100%',
    // height: hp(30),
    backgroundColor: COLORS.HEADER_GRAY.bg,
    paddingVertical: hp(10),
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: hp(10),
  },
  moreBtnStyle_text: {
    color: COLORS.FONT_DETAIL_GRAY,
    fontFamily: 'Roboto-Regular',
    fontSize: wp(18),
    textAlign: 'center',
  },
  defaultDisableBtn: {
    backgroundColor: 'hsl(0,0%,80%)',
    opacity: 0.7
  },
  defaultDisableBtn_text: {
    // color: 'red',
    color: COLORS.FONT_DETAIL_GRAY,
  },
  // user details btns
  btnBank: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: wp(15),
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY.bg,
  },
  btnBank_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(18),
    fontWeight: '600',
    color: COLORS.FONT_WHITE,
    marginLeft: wp(3),
  },
  btnBank_icon: {
    resizeMode:'contain',
    width: wp(23),
    height: wp(23),
  },
  urlerCloseBtn: {
    width: wp(30),
    height: wp(30),
    // backgroundColor: COLORS.WHITE.bg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  urlerCloseBtn_icon: {
    width:wp(30),
    height: wp(30),
  },
});
