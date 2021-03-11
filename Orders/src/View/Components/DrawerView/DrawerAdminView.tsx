import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {TypedBaseComponent, IBaseProps} from '../../Common/BaseComponent';
import {ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {ButtonView} from '../Components/ButtonView';
import {DrawerAdminModel} from '../../Navigation/DrawerAdminModel';
import {currentUser} from '../../Core/CurrentUser';
import {ActivityIndicator} from 'react-native';
import {ContactIconViewModel} from '../../Chat/classes/ContactIconViewModel';
import {controllers} from '../../Controllers/Controllers';

class DrawerAdminView extends TypedBaseComponent<DrawerAdminModel> {
  constructor(props: IBaseProps<DrawerAdminModel>) {
    super(props);
  }

  render() {
    super.render();
    return (
      <SafeAreaView style={styles.wrapper}>
        {/*<View style={styles.wrapLogo}>*/}
        {/*  <Image source={ICONS.logo} style={styles.logoStyles}/>*/}
        {/*  <View style={styles.headerNameWithRole}>*/}
        {/*    <Text style={styles.textMyHouse}>OSBB.work</Text>*/}
        {/*  </View>*/}
        {/*  /!*<View style={styles.drawerIcon}>*!/*/}
        {/*  /!*  <ButtonView*!/*/}
        {/*  /!*    model={this.model.drawerBtn}*!/*/}
        {/*  /!*    key={this.model.drawerBtn.id}*!/*/}
        {/*  /!*  />*!/*/}
        {/*  /!*</View>*!/*/}
        {/*</View>*/}
        <View style={styles.containerUserInfo}>
          <View style={styles.wrapIcon}>
            <TouchableOpacity
              onPress={controllers().drawerSwitch.chooseDrawer.pickPhoto}>
              {this.model.loading && (
                <View style={styles.loader}>
                  <ActivityIndicator size="small" color={COLORS.BLUE.bg}/>
                </View>
              )}
              <ContactIconViewModel
                model={currentUser().contactIcon}
                key={this.childId(currentUser().contactIcon)}
                id={this.childId(currentUser().contactIcon)}
                contactIconDiameter={90}
                type={'large'}
              />
              <Image
                source={ICONS.cameraIcon}
                style={styles.iconCameraStyles}
              />
            </TouchableOpacity>
          </View>
          {/*//user information*/}
          <View style={styles.blockUserInfo}>
            <View style={styles.wrapUserName}>
              <Text numberOfLines={2} style={styles.userName}>
                {currentUser().user.name}
              </Text>
            </View>
            <View style={styles.wrapApartmentUser}>
              <Text numberOfLines={2} style={styles.apartmentText}>
                Голова ОСББ {currentUser().currentOsbb?.address}
              </Text>
            </View>
            <View style={styles.wrapPhoneUser}>
              <Text numberOfLines={1} style={styles.phoneText}>
                телефон:{' '}
                <Text style={styles.textNumber}>
                  {currentUser().user.phone === null
                    ? 'не вказано'
                    : currentUser().user.phone}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View>
          {/* <View> */}
          <Text style={styles.titleText}>Робота в додатку</Text>
          {/* </View> */}
          <View style={styles.containerBtns}>
            {/*//Події*/}
            <ButtonView
              model={this.model.calendar}
              key={this.childId(this.model.calendar)}
              id={this.childId(this.model.calendar)}
            />
            {/*//Новини*/}
            <ButtonView
              model={this.model.advertisement}
              key={this.childId(this.model.advertisement)}
              id={this.childId(this.model.advertisement)}
            />
            {/*//Опитування*/}
            <ButtonView
              model={this.model.votingAndPolls}
              key={this.childId(this.model.votingAndPolls)}
              id={this.childId(this.model.votingAndPolls)}
            />
            {/*//Оголошення*/}
            {/*<ButtonView*/}
            {/*  model={this.model.declaration}*/}
            {/*  key={this.model.declaration.id}*/}
            {/*/>*/}
            {/*//Рахунки та баланс*/}
            <ButtonView
              model={this.model.accountsAndBalance}
              key={this.childId(this.model.accountsAndBalance)}
              id={this.childId(this.model.accountsAndBalance)}
            />
            {/*//ЧАти*/}
            <ButtonView
              model={this.model.chats}
              key={this.childId(this.model.chats)}
              id={this.childId(this.model.chats)}
            />
          </View>
          <View style={styles.bottomContainerBtns}>
            {/*//Налаштування*/}
            <ButtonView
                model={this.model.infoOsbb}
                key={this.childId(this.model.infoOsbb)}
                id={this.childId(this.model.infoOsbb)}
            />
            <ButtonView
              model={this.model.debtors}
              key={this.childId(this.model.debtors)}
              id={this.childId(this.model.debtors)}
            />
            <ButtonView
              model={this.model.clock}
              key={this.childId(this.model.clock)}
              id={this.childId(this.model.clock)}
            />
            <ButtonView
                model={this.model.aboutProgram}
                key={this.childId(this.model.aboutProgram)}
                id={this.childId(this.model.aboutProgram)}
            />
            <ButtonView
              model={this.model.logoutBtn}
              key={this.childId(this.model.logoutBtn)}
              id={this.childId(this.model.logoutBtn)}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export {DrawerAdminView};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginHorizontal: hp(15),
    paddingVertical: hp(20),
    overflow: 'hidden',
   // marginLeft:20
  },
  logoBonus: {
    resizeMode: 'contain',
    width: wp(200),
    height: hp(62),
  },
  logoIcon: {
    marginLeft: hp(10),
    resizeMode: 'contain',
    width: wp(54),
    height: hp(63),
  },
  wrapLogo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  yellowLine: {
    backgroundColor: 'transparent',
    width: '100%',
    height: hp(15),
    //  borderColor: COLORS.FONT_YELLOW,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: hp(15),
    borderBottomRightRadius: hp(15),
  },
  iconDrawer: {
    resizeMode: 'contain',
    height: hp(24),
    width: wp(26),
    marginRight: wp(32),
  },
  iconDrawerExit: {
    resizeMode: 'contain',
    height: hp(24),
    width: wp(26),
    marginRight: wp(27),
  },
  containerBtnText: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(40),
    marginTop: hp(10),
    marginLeft: wp(16),
  },
  containerBtnTextExit: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(40),
    marginTop: hp(10),
    marginLeft: wp(21),
  },
  texts: {
    fontFamily: 'Roboto-Light',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: hp(20),
    // color: COLORS.FONT_WHITE,
  },
  logoStyles: {
    resizeMode: 'contain',
    width: hp(45),
    height: hp(45),
    marginRight: wp(20),
  },
  textMyHouse: {
    color: COLORS.FONT_BLACK,
    fontFamily: 'Roboto-Regular',
    fontSize: hp(26),
  },
  drawerIcon: {
    position: 'absolute',
    right: 0,
    top: hp(10),
  },
  containerUserInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: hp(15),
  },
  wrapIcon: {
    marginRight: wp(15),
  },
  blockUserInfo: {
    width: '70%',
  },
  wrapUserName: {},
  wrapApartmentUser: {},
  wrapPhoneUser: {},
  userName: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '600',
    fontSize: hp(20),
  },
  apartmentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(18),
    color: COLORS.FONT_GRAY,
  },
  phoneText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(18),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  textNumber: {
    fontFamily: 'Roboto-MediumItalic',
    fontSize: hp(16),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  containerSwitch: {
    marginLeft: '25%',
  },
  titleText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(20),
    paddingTop: hp(10),
  },
  containerBtns: {
    paddingBottom: hp(20),
    // marginTop: hp(10),
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.BORDER_COLOR_GRAY,
  },
  bottomContainerBtns: {
  },
  textMyRole: {
    fontSize: wp(12),
    color: COLORS.FONT_LIGHT_GRAY,
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 99,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  iconCameraStyles: {
    position: 'absolute',
    resizeMode: 'contain',
    width: hp(30),
    left: 0,
    height: hp(30),
  },
});
