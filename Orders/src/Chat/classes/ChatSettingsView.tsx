import React from 'react';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import {ChatSettings} from '../provider/ChatSettings';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MembersChatListView} from '../ViewModel/Group/MembersChatList';
import {store} from '../provider/Store';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {ModalDeleteGroupView} from '../components/Modal/ModalDeleteGroup';
import {currentUser} from '../../Core/CurrentUser';
import {DrawerButtonComponent} from '../components/DrawerButtonComponent';
import {COLORS} from '../../constants/colors';
import {ContactIconViewModel} from './ContactIconViewModel';
import {RenameChatView} from '../ViewModel/Group/RenameChatView';
import {ICONS} from '../../constants/icons';

class ChatSettingsView extends TypedBaseComponent<ChatSettings> {
  constructor(props) {
    super(props);
  }
  render() {
    super.render();
    const chat = store().chats.current;
    if (chat === null) {
      return null;
    }
    const visibleStyle = this.model.isVisible
      ? styles.container
      : styles.hidden;
    return (
      <View style={visibleStyle}>
        <View style={styles.mainContent}>
          <View style={styles.closeModalView}>
            <TouchableOpacity onPress={this.model.hide}>
              <View style={styles.closeModalBtn}>
                <Image source={ICONS.close} style={styles.closeIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <ModalDeleteGroupView
              model={chat.modalDeleteGroup}
              key={chat.modalDeleteGroup.id}
            />
          </View>
          <View style={styles.concatContainer}>
            <View style={styles.concatImageContainer}>
              <ContactIconViewModel
                model={chat.photo}
                key={chat.photo.id}
                id={`Drawer_${currentUser().contactIcon.id}`}
                contactIconDiameter={100}
                type={'large'}
              />
            </View>
            <View style={styles.containerTextAnimation}>
              <RenameChatView
                model={this.model.renameChat}
                key={this.model.renameChat.id}
              />
              <Text
                style={
                  styles.membersText
                }>{`Учасники: ${chat.membersCount}`}</Text>
            </View>
          </View>
          <View style={styles.lastContainer}>
            {chat.ownerUser.id === currentUser().userId && (
              <DrawerButtonComponent
                imgStyles={styles.imgAbc}
                onPress={this.model.onRenameGroupPress}
                padding={10}
                // imgURL={require('../../assets/img/DrawerNavigationMessagesIcon/ABC/ABC.png')}
                imgURL={ICONS.close}
                text={'Перейменувати групу'}
                additionalContainerStyle={styles.drawerButtonContainer}
              />
            )}
            {/*<DrawerButtonComponent*/}
            {/*  imgStyles={styles.imgAbc}*/}
            {/*  // imgURL={require('../../assets/img/DrawerNavigationMessagesIcon/userIcon/ic_person_add_black_24px.png')}*/}
            {/*  imgURL={CHAT_ICONS.userIcon}*/}
            {/*  text={'Додати учасників'}*/}
            {/*  onPress={this.model.onAddMembersPress}*/}
            {/*  padding={10}*/}
            {/*  additionalContainerStyle={styles.drawerButtonContainer}*/}
            {/*/>*/}
            {/*{chat.ownerUser.id === currentUser().userId && (*/}
            {/*  <DrawerButtonComponent*/}
            {/*    imgStyles={styles.imgAbc}*/}
            {/*    // imgURL={require('../../assets/img/Icons/remove-circle/gray/removeCircleGray.png')}*/}
            {/*    imgURL={CHAT_ICONS.removeGray}*/}
            {/*    text={'Видалити учасників'}*/}
            {/*    onPress={this.model.onDeleteMembersPress}*/}
            {/*    padding={10}*/}
            {/*    additionalContainerStyle={styles.drawerButtonContainer}*/}
            {/*  />*/}
            {/*)}*/}
            {/*{chat.ownerUser.id !== currentUser().userId && (*/}
            {/*  <DrawerButtonComponent*/}
            {/*    // imgURL={require('../../assets/img/DrawerNavigationMessagesIcon/ArrowBackLeftGrey/Back.png')}*/}
            {/*    imgURL={CHAT_ICONS.arrowBackLeft}*/}
            {/*    imgStyles={styles.imgAbc}*/}
            {/*    text={'Залишити групу'}*/}
            {/*    onPress={this.model.onLeaveGroupPress}*/}
            {/*    padding={10}*/}
            {/*  />*/}
            {/*)}*/}
            {/*{chat.ownerUser.id === currentUser().userId && (*/}
            {/*  <DrawerButtonComponent*/}
            {/*    // imgURL={require('../../assets/img/DrawerNavigationMessagesIcon/Trash/trash.png')}*/}
            {/*    imgURL={CHAT_ICONS.drawerTrash}*/}
            {/*    imgStyles={styles.imgAbc}*/}
            {/*    text={'Видалити групу'}*/}
            {/*    onPress={this.model.onDeleteGroupPress}*/}
            {/*    padding={10}*/}
            {/*  />*/}
            {/*)}*/}
          </View>
          <ScrollView contentContainerStyle={styles.chatUsersContainer}>
            <Text style={styles.membersTitle}>Користувачі</Text>
            <MembersChatListView
              model={chat.chatMembersList}
              key={chat.chatMembersList.id}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
export {ChatSettingsView};
const styles = StyleSheet.create({
  container: {
    zIndex: 999999999,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    // backgroundColor: 'white'
    // backgroundColor: 'red'
    // backgroundColor: 'black'
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'hsl(0,0%,99%)',
    // height: '100%',
    // width: '100%',
    // backgroundColor: 'red',
  },
  hidden: {
    overflow: 'hidden',
    width: 0,
    height: 0,
  },
  concatContainer: {
    paddingTop: hp(10),
    // paddingLeft: wp(7.5),
    // paddingBottom: hp(10),
    // marginBottom: hp(1),
    // borderBottomWidth: 1,
    // borderColor: COLORS.BLACK_70.bg,
    // flexDirection: 'row',
    // backgroundColor: COLORS.WHITE.bg,
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: hp(-60),
    paddingBottom: hp(20),
  },
  concatImageContainer: {
    // backgroundColor: 'blue',
    width: '100%',
    alignItems: 'center',
    paddingLeft: wp(15),
  },
  contactTextBox: {
    //alignItems: 'center',
    //paddingLeft: wp(15),
    fontSize: hp(14),
    fontWeight: '500',
    // color: COLORS.TEXT_USER_NAME,
    width: wp(140),
    fontFamily: 'Roboto-Regular',
  },
  imageUser: {
    width: hp(40),
    height: hp(40),
    borderRadius: hp(40 / 2),
  },
  wrapper: {
    flex: 1,
    alignItems: 'stretch',
  },
  // container: {
  //     paddingLeft: wp(15),
  //     paddingTop: hp(15),
  //     borderBottomWidth: 1,
  //     // borderColor: COLORS.BLACK_70.bg,
  // },
  lastContainer: {
    paddingLeft: wp(15),
    paddingTop: hp(15),
    // marginTop: hp(1),
    flexDirection: 'row',
    backgroundColor:'red',
  },
  drawerButtonWrapper: {
    paddingLeft: wp(5),
  },
  LogOutImg: {
    width: wp(24),
    height: hp(24),
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    right: wp(20),
    bottom: hp(20),
  },
  containerTextAnimation: {
    textAlign: 'center',
    width: hp(160),
    marginLeft: wp(15),
  },
  imgAbc: {
    resizeMode: 'contain',
    width: wp(24),
    height: hp(24),
  },

  chatUsers: {
    flex: 1,
  },
  chatUsersText: {
    textAlign: 'center',
    fontSize: hp(14),
  },
  chatUsersContainer: {
    backgroundColor: 'white',
    paddingVertical: hp(10),
    alignItems: 'flex-start',
    marginHorizontal: wp(8),
  },
  chatUserContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: hp(5),
    alignItems: 'center',
  },
  chatUsersTextContainer: {
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    paddingBottom: hp(10),
  },
  drawerButtonContainer: {
    paddingBottom: hp(15),
  },
  membersText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(10),
    fontWeight: 'bold',
    // color: '#BBC4DD',
    textAlign: 'center',
    color: COLORS.FONT_WHITE,
  },
  closeModalView: {
    position: 'absolute',
    zIndex: 999999,
    top: -45,
    // left: 10,
    right: 10,
  },
  closeModalBtn: {
    // backgroundColor: 'red',
    width: wp(50),
    height: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalText: {
    color: COLORS.FONT_WHITE,
  },
  membersTitle: {
    color: 'red',
    paddingBottom: hp(10),
    // textAlign: 'right',
    width: '100%',
    fontWeight: '600',
    fontFamily: 'Roboto-Light',
  },
});
