import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity, Platform,
} from 'react-native';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import {COLORS} from '../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {FormTextBox} from '../../Models/Components/FormTextBox';
import RNPickerSelect from 'react-native-picker-select';
import {ICONS, TEXT_INPUT_FIELDS} from '../../constants/icons';
import {controllers} from '../../Controllers/Controllers';
import {
  dateTimeToDateString,
  dateTimeToTimeString,
} from '../../Common/dateParse';
import DateTimePicker from "@react-native-community/datetimepicker";

const getDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

class FormTextBoxView extends TypedBaseComponent<FormTextBox> {
  constructor(props: any) {
    super(props);
  }
  render() {
    super.render();
    let input = null;
    const titleStyle = this.model.style
      ? styles[`${this.model.style}_title`]
      : styles.title;
    const textInputStyle = this.model.style
      ? styles[`${this.model.style}_textInput`]
      : styles.textInput;
    const containerStyle = this.model.style
      ? styles[`${this.model.style}_container`]
      : styles.container;
    const containerBlockStyle = this.model.style
      ? styles[`${this.model.style}_containerBlock`]
      : styles.containerBlock;
    const iconStyle = this.model.iconStyle
      ? styles[`${this.model.iconStyle}_icon`]
      : styles.icon;
    const textBoxStyle = this.model.style
      ? styles[`${this.model.style}_textBox`]
      : styles.textBox;
    const shouldToFiledStyle =
      this.model.style && this.model.isShouldToFiled
        ? styles[`${this.model.style}_shouldToFiled`]
        : styles.shouldToFiled;
    const shouldToFiledStyle_textInput =
      this.model.style && this.model.isShouldToFiled
        ? styles[`${this.model.style}_shouldToFiled_textInput`]
        : null;
    const textInput =
      this.model.showFocusStyles && this.model.focusStyles
        ? styles.textInput_Focus
        : null;
    switch (this.model.inputType) {
      case 'default':
        input = (
          <TextInput
            ref={(input) => (this.model.reference = input)}
            onChangeText={this.model.onChangeText}
            defaultValue={this.model.defaultValue}
            placeholder={this.model.placeholder}
            keyboardType={this.model.keyboardType}
            maxLength={this.model.maxLength}
            style={
              this.model.isShouldToFiled
                ? [textInputStyle, shouldToFiledStyle_textInput]
                : [textInputStyle, shouldToFiledStyle_textInput, this.model.staticValueInput !== '' ? {width: '80%'} : {}]
            }
            value={this.model.value}
            onSubmitEditing={this.model.onSubmitEditing}
            returnKeyType={this.model.returnKeyType}
            editable={this.model.editable}
            multiline={this.model.multiLine}
            numberOfLines={this.model.numberOfLines}
            keyboardAppearance={'light'}
            textAlignVertical={this.model.multiLine ? 'top' : 'center'}
            onFocus={this.model.Focus}
            onBlur={this.model.Blur}
          />
        );
        break;
      case 'select':
        input = (
          <RNPickerSelect
            ref={(input) => (this.model.reference = input)}
            onValueChange={this.model.onChangeText}
            placeholder={
              this.model.placeholder !== '' ? this.model.placeholder : {}
            }
            items={this.model.selectItems}
            style={{
              viewContainer: [textInputStyle, shouldToFiledStyle_textInput],
              inputIOS: {color: 'black'},
              inputAndroid: {color: 'black'},
            }}
          />
        );
        break;
      case 'date':
        if(Platform.OS ==='ios'){
          input = (<DateTimePicker
              testID="dateTimePicker"
              value={this.model.datePick}
              mode={'date'}
              is24Hour={true}
              display="default"
              minimumDate={this.model.minimumDate}
              maximumDate={this.model.maximumDate}
              onChange={(event, selectDate)=>{
                this.model.datePick = selectDate;
                const date = dateTimeToDateString(selectDate);
                this.model.onChangeText(date);
              }}
          />)
        } else {
          input = (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                controllers().sharedController.datePicker.selectDate(
                  this.model.datePick,
                  (selectDate) => {
                    this.model.datePick = selectDate;
                    const date = dateTimeToDateString(selectDate);
                    this.model.onChangeText(date);
                  },
                  {
                    minimumDate: this.model.minimumDate,
                    maximumDate: this.model.maximumDate,
                  },
                );
              }}>
              <View style={[textInputStyle, {minWidth: '70%'}]}>
                <Text style={{textAlign: 'center'}}>{this.model.value}</Text>
              </View>
            </TouchableOpacity>
          );
        }
        break;
      case 'time':
        if(Platform.OS ==='ios'){
          input = (<DateTimePicker
              testID="dateTimePicker"
              value={this.model.datePick}
              mode={'time'}
              is24Hour={true}
              display="default"
              minimumDate={this.model.minimumDate}
              maximumDate={this.model.maximumDate}
              onChange={(event, selectDate)=>{
                this.model.datePick = selectDate;
                const date = dateTimeToDateString(selectDate);
                this.model.onChangeText(date);
              }}
          />)
        } else {
          input = (
              <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    controllers().sharedController.datePicker.selectTime(
                        this.model.datePick,
                        (selectDate) => {
                          this.model.datePick = selectDate;
                          console.log('selectDate', selectDate);
                          const date = dateTimeToTimeString(selectDate);
                          this.model.onChangeText(date);
                        },
                    );
                  }}>
                <View style={[textInputStyle, {minWidth: '70%'}]}>
                  <Text style={{textAlign: 'center'}}>{this.model.value}</Text>
                </View>
              </TouchableOpacity>
          );
        }
        break;
    }
    if (!this.model.visible){
      return null
    }
    return (
      <View>
        <View
          ref={(viewRef) => (this.model.refView = viewRef)}
          style={
            this.model.isShouldToFiled
              ? [containerStyle, styles.shouldToFiled, shouldToFiledStyle]
              : [containerStyle]
          }>
          <View
            style={
              this.model.iconOrder
                ? [containerBlockStyle, styles[this.model.iconOrder]]
                : containerBlockStyle
            }>
            <View
              style={[
                textBoxStyle,
                this.model.icon === '' ? {width: '100%'} : {},
              ]}>
              {this.model.title !== '' && this.model.title !== undefined && (
                <View style={styles.containerText}>
                  <Text numberOfLines={2} style={titleStyle}>
                    {this.model.title}{' '}
                  </Text>
                  <Text style={{fontSize: hp(11), lineHeight: hp(18)}}>
                    {this.model.necessarily}
                  </Text>
                </View>
              )}
              {/*{typeof this.model.necessarily !== 'undefined' &&*/}
              {/*  this.model.necessarily !== '' && (*/}
              {/*  */}
              {/*  )}*/}
              <View style={styles.textBoxContainer}>
                {this.model.staticValueInput !== '' && (
                  <View style={styles.wrapInputs}>
                    <TextInput
                      style={[
                        textInputStyle,
                        shouldToFiledStyle_textInput,
                        {paddingRight: 0},
                      ]}
                      editable={false}
                      selectTextOnFocus={false}
                      value={this.model.staticValueInput}
                    />
                    {input}
                  </View>
                )}
                {this.model.staticValueInput === '' && input}
                {typeof this.model.subStrOne !== 'undefined' &&
                  this.model.subStrOne !== '' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        position: 'absolute',
                        right: '50%',
                        bottom: '51%',
                      }}>
                      <Text style={{fontSize: hp(16), lineHeight: hp(30)}}>
                        {this.model.subStrOne}
                      </Text>
                      <Text style={{fontSize: hp(11), lineHeight: hp(18)}}>
                        {this.model.subStrTwo}
                      </Text>
                    </View>
                  )}
              </View>
            </View>
            {this.model.showFocusStyles && this.model.isShouldToFiled && (
              <View style={{position: 'absolute', right: 5}}>
                <Image source={TEXT_INPUT_FIELDS.error} />
              </View>
            )}
            {this.model.icon !== '' && this.model.icon !== undefined && (
              <View style={styles.iconBox}>
                <TouchableOpacity
                  style={styles.iconView}
                  activeOpacity={1}
                  onPress={this.model.onPressIcon}>
                  <Image source={this.model.icon} style={iconStyle} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {typeof this.model.errorComment !== 'undefined' &&
          this.model.errorComment !== '' && (
            <View style={styles.errorComment}>
              <View style={styles.errorCommentImageView}>
                <Image
                  style={styles.errorCommentImage}
                  source={ICONS.warning}
                />
              </View>
              <Text style={styles.errorCommentText}>
                {this.model.errorComment}
              </Text>
            </View>
          )}
      </View>
    );
  }
}

export {FormTextBoxView};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(10),
  },
  wrapInputs: {
    flexDirection: 'row',
  },
  containerBlock: {
    padding: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR_GRAY,
  },
  title: {
    color: COLORS.GRAY_WHITE.text,
    fontFamily: 'Roboto-Regular',
    paddingLeft: wp(3.5),
  },
  textBoxContainer: {},
  textInput: {
    paddingVertical: wp(5),
    color: COLORS.TEXT_INPUT_TEXT,
    fontFamily: 'Roboto-Bold',
  },
  textInputLogin_containerBlock: {
    padding: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR_GRAY,
  },
  textInputLogin_textInput: {
    paddingLeft: 0,
    paddingVertical: wp(5),
    color: COLORS.TEXT_INPUT_TEXT,
    fontFamily: 'Roboto-Bold',
  },
  iconView: {
    paddingVertical:hp(5),
  },
  icon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
    marginLeft: hp(20),
    marginRight: hp(20),
  },
  big_icon: {
    width: wp(30),
    height: wp(30),
    resizeMode: 'contain',
    marginLeft: hp(20),
    marginRight: hp(20),
  },
  iconBox: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    width: '90%',
  },
  end: {
    flexDirection: 'row',
  },
  first: {
    flexDirection: 'row-reverse',
  },
  shouldToFiled: {
    // backgroundColor: COLORS.ERROR.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.ERROR.border,
    // backgroundColor: 'rgba(200,0,0,.1)'
  },
  smallAdminInput_shouldToFiled: {
    borderWidth: 0,
  },
  smallAdminInput_shouldToFiled_textInput: {
    // backgroundColor: COLORS.RED_WHITE.bg
    borderWidth: 1,
    borderColor: COLORS.ERROR.border,
  },
  adminInput_shouldToFiled: {
    borderWidth: 0,
  },
  adminInput_shouldToFiled_textInput: {
    // backgroundColor: COLORS.RED_WHITE.bg
    borderWidth: 1,
    borderColor: COLORS.ERROR.border,
  },
  errorComment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  errorCommentImageView: {
    // width: '20%'
  },
  errorCommentImage: {
    width: wp(35),
    height: wp(30),
  },
  errorCommentText: {
    width: '85%',
    textAlign: 'left',
    color: COLORS.ERROR.text,
    marginLeft: wp(20),
  },
  tariffsListStyles_textBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tariffsListStyles_title: {
    width: '40%',
    paddingLeft: wp(5),
    //backgroundColor:'red'
  },
  DetailOrderStyles_containerBlock:{
  },
  DetailOrderStyles_container:{
  },
  DetailOrderStyles_textInput:{
    alignItems:'flex-start',
    fontFamily: 'Roboto-Regular',
    fontSize: hp(20),
    color: COLORS.FONT_BLACK,
    paddingTop:hp(10),
    paddingBottom:hp(15),
  },
  tariffsListStyles_containerBlock: {
    backgroundColor: COLORS.FONT_WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR_GRAY,
  },
  tariffsListStyles_container: {},
  tariffsListStyles_textInput: {
    width: '100%',
    backgroundColor: COLORS.FONT_WHITE,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.BORDER_COLOR_GRAY,
    borderStyle: 'solid',
  },
  tariffsStyles_title: {
    fontSize: wp(12),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  tariffsStyles_container: {
    width: '100%',
    marginBottom: hp(15),
    height: hp(60),
    justifyContent: 'center',
    padding: wp(5),
  },
  tariffsStyles_containerBlock: {},
  tariffsStyles_textInput: {
    color: 'black',
    paddingVertical: hp(8),
    paddingHorizontal: hp(8),
    backgroundColor: COLORS.FONT_WHITE,
    borderRadius: 5,
    borderColor: COLORS.BORDER_COLOR_GRAY,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  adminInput_textInput: {
    backgroundColor: COLORS.FONT_WHITE,
    color: 'black',
    paddingLeft: 0,
    paddingVertical: hp(8),
  },
  adminInput_container: {
    width: '100%',
    marginBottom: hp(28),
  },
  adminInput_containerBlock: {
    padding: 0,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER_COLOR_GRAY,
    justifyContent: 'space-between',
  },
  adminInput_title: {
    fontSize: wp(12),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  smallAdminInput_textInput: {
    width: '60%',
    // paddingRight: wp(25),
    marginBottom: hp(28),
    color: 'black',
    paddingVertical: hp(8),
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER_COLOR_GRAY,
    backgroundColor: 'white',
    // backgroundColor:'red',
  },
  smallAdminInput_container: {
    width: '100%',
    justifyContent: 'center',
    margin: 0,

    // borderColor: COLORS.BORDER_COLOR_GRAY,
  },
  smallAdminInput_containerBlock: {},

  smallAdminInput_title: {
    fontSize: wp(12),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  defaultInputStyle_textInput: {
    paddingHorizontal: wp(10),
  },
  defaultInputStyle_container: {
    borderRadius: wp(7),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.FONT_WHITE,
    paddingVertical: hp(15),
  },
  defaultInputStyle_containerBlock: {},
  containerText: {
    flexDirection: 'row',
  },
  contentAdminInput_textInput: {
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderRadius: 10,
    color: 'black',
    borderColor: COLORS.BORDER_COLOR_GRAY_DARK,
    borderWidth: 1,
    paddingLeft: wp(5),
    paddingVertical: hp(8),
    height: hp(90),
    // width: '90%',
    // flex: 1,
  },
  subjectStyles_container: {
    paddingLeft: wp(5),
    marginBottom: wp(5),
    borderRadius: 10,
  },
  subjectStyles_textInput: {
    paddingHorizontal: wp(5),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.BORDER_COLOR_GRAY,
    // paddingVertical: hp(10),
  },
  contentStyles_title: {
    fontSize: wp(12),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  contentStyles_container: {
    // paddingLeft: wp(5),
    marginBottom: hp(10),
    width: '100%',
    // backgroundColor: 'red',
  },
  contentStyles_textInput: {
    // backgroundColor: COLORS.GRAY_WHITE.bg,
    // borderRadius: 10,
    color: 'black',
    // paddingLeft: wp(5),
    paddingVertical: hp(8),
    // height: hp(90),
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER_COLOR_GRAY,
    width: '100%',
    // backgroundColor: 'red'
  },
  contentAdminInput_container: {
    width: '100%',
    marginBottom: hp(28),
  },
  contentAdminInput_containerBlock: {
    padding: 0,
    justifyContent: 'space-between',
  },
  contentAdminInput_title: {
    fontSize: wp(12),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  //
  stylesForSearchForm_container: {
    borderRadius: wp(7),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.FONT_WHITE,
  },
  stylesForSearchForm_textInput: {
    maxWidth: '90%',
    minWidth: '90%',
    alignItems: 'center',
    fontSize: hp(16),
    paddingVertical: hp(15),
  },
  stylesForSearchForm_icon: {},
  stylesForSearchForm_textBox: {},
  textInput_Focus: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.INPUT_FOCUS,
  },
});
