import React from 'react';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { navigator } from '../../Core/Navigator';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import {ChatHeader} from "../provider/Headers/ChatHeader";
import {IconButtonView} from "../../View/Components/IconButtonView";
import {ContactIconViewModel} from './ContactIconViewModel'
import { store} from '../provider/Store';
import { ContactIsOnlineView } from './ContactIsOnlineView';
import {BOTTOM_NAV, BOTTOM_NAVIGATION_ACTIVE_ICON, CHAT_ICONS, ICONS} from "../../constants/icons";
import {controllers} from "../../Controllers/Controllers";
// import {CallIcon} from "../components/Calls/CallIcon";
// import { TypingIndicatorView } from '../components/Indicator/TypingIndicatorView';
// import { controllers } from '../controllers/Controllers';

class ChatHeaderView extends TypedBaseComponent<ChatHeader> {
    private textArr: string[];
    constructor(props) {
        super(props);
        this.textArr = ['учасник', 'учасника', 'учасників'];
    }


    pronunciation(balls, txtArr) {
        let cases = [2, 0, 1, 1, 1, 2];
        return txtArr[
            balls % 100 > 4 && balls % 100 < 20
                ? 2
                : cases[balls % 10 < 5 ? balls % 10 : 5]
        ];
    }
    members() {
        if (this.model.chat.activeUsers !== 0) {
            return `${this.model.chat.membersCount} ${this.pronunciation(
                this.model.chat.membersCount,
                this.textArr,
            )} ` + this.model.chat.activeUsers + ' online';
        } else {
            return `${this.model.chat.membersCount} ${this.pronunciation(
                this.model.chat.membersCount,
                this.textArr,
            )} `;
        }
    }


    render() {
        super.render();
        if (this.model.chat === null) {
            return null;
        }
        const chat = store().chats.current;
        return (
            <>
            <View style={styles.container}>
                <View style={styles.contactContainer}>
                    <View style={styles.backBtnContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                store().chatSettings.hide()
                                navigator().toGoBack()
                            }}
                            style={styles.backBtn}>
                            <Image
                                // source={require('../assets/img/Icons/arrow-left-white/arrow-left-white.png')}
                                source={CHAT_ICONS.arrowLeft}
                            />
                            <Text style={styles.backBtnText}>Назад</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.contactHeader}
                        onPress={() => {
                            if (chat !== null && !chat.isPublic) {
                                return
                            }
                            this.model.toggleDrawer()
                            // store().drawerControlsChats.component.openDrawer()
                        }}>
                        <View style={styles.containerTextAnimation}>
                            <Text numberOfLines={1} style={styles.contactHeaderStatus}>
                                {this.model.chat.name.name}
                            </Text>
                        </View>
                        <Text style={styles.contactHeaderGroup}>
                            {(() => {
                                if (!this.model.chat.isPublic) {
                                  return (
                                      <ContactIsOnlineView
                                          model={this.model.isOnline}
                                          key={`Header_${this.id}_IsOnline_${this.model.isOnline.id}`}
                                          id={`Header_${this.id}_IsOnline_${this.model.isOnline.id}`}
                                          style={styles.headerIsOnline}
                                          type={true}
                                          headerModel={this.model}
                                      />
                                  )
                                } else {
                                    return this.members();
                                }
                            })()}
                        </Text>
                            {/*{!this.model.chat.isPublic && <TypingIndicatorView*/}
                            {/*    model={controllers().indicatorController.typingIndicator}*/}
                            {/*    key={controllers().indicatorController.typingIndicator.id}*/}
                            {/*/>}*/}
                    </TouchableOpacity>
                    {!this.model.chat.isPublic && (
                        <TouchableOpacity
                            style={styles.contactIconBox}
                            onPress={()=>{
                                console.log('userResponse', this.model.chat)
                                controllers().chatController.userDetailModel.getUserInfo(
                                    // this.model.chat?.pairUser.hash
                                    store().chats.current?.pairUser.hash
                                )
                                navigator().navigate('UserDetailScreen')
                            }}
                        >
                            <ContactIconViewModel
                                model={this.model.photo}
                                item={this.model.photo.id}
                                id={`ChatHeader_${this.model.photo.id}`}
                                contactIconDiameter={45}
                                type={'large'}
                                hideIsOnline={true}
                            />
                        </TouchableOpacity>
                    )}
                    {this.model.chat.isPublic && (<View style={styles.headerIconsContainer}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.model.toggleDrawer()
                            }}
                            style={styles.chatSettings}
                        >
                            <Image
                                source={BOTTOM_NAVIGATION_ACTIVE_ICON.settings}
                                style={styles.chatSettingImage}
                            />
                        </TouchableOpacity>
                        {/*<>*/}
                        {/*        <IconButtonView*/}
                        {/*            model={this.model.drawerButton}*/}
                        {/*            key={this.model.drawerButton.id}*/}
                        {/*        />*/}
                        {/*</>*/}
                    </View>)}
                </View>
            </View>
            </>
        );
    }
}

export {ChatHeaderView};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
      height:hp(60),
    // height: hp(102),
    // maxHeight: hp(102),
    // paddingHorizontal: wp(20),
    backgroundColor: COLORS.BLUE.bg,
    borderBottomWidth:2,
    borderColor:COLORS.GRAY_WHITE.bg,
    borderStyle:'solid',
    // marginTop: hp(-40),
    // paddingTop: hp(32),
      flex: 1
      // backgroundColor: 'yellow'
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(60),
    width: '100%',
      flex: 1,
      // backgroundColor: 'yellow'
  },
  contactHeader: {
    // alignItems: 'flex-start',
    alignItems: 'center',
    // minWidth: '60%',
    // backgroundColor: 'blue',
      flex: 4,
  },
  contactSearch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    backgroundColor: '#FFA726',
    borderRadius: 50,
    marginRight: wp(15),
    width: wp(40),
    height: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIconText: {
    fontSize: hp(24),
    color: COLORS.WHITE.bg,
  },
  contactHeaderName: {
    fontSize: hp(16),
    color: COLORS.WHITE.bg,
      // backgroundColor: 'red'
  },
  contactHeaderStatus: {
    fontSize: hp(20),
    color: COLORS.WHITE.bg,
    marginTop: hp(2),
    textAlign: 'center',
    maxWidth: '80%'
      // backgroundColor: 'red',
      // width: wp(200)
      // minWidth: '100%',
      // flex: 1,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  headerIcon: {
    marginLeft: hp(10),
  },
  contactIconBox: {
      // marginRight: wp(10),
      // backgroundColor: 'red',
      // width: '20%',
      alignItems: 'center',
      flex: 1
  },
  search: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    width: '90%',
  },
  searchImg: {
    alignSelf: 'center',
  },
  searchInput: {
    flexDirection: 'row',
    width: '75%',
    height: hp(40),
    alignSelf: 'center',
    paddingHorizontal: wp(10),
    backgroundColor: 'white',
  },
  btnClose: {
    alignSelf: 'center',
    height: hp(40),
    justifyContent: 'center',
  },
  containerTextOnline: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(10),
  },
  dateUserStatus: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(10),
    color: '#BBC4DD',
  },
  contactHeaderGroup: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(12),
    color: '#FFF',
      // backgroundColor: 'red'
    // marginLeft: wp(-50)
  },
  burgerMenu: {
    resizeMode: 'contain',
    width: hp(23),
    height: hp(23),
    marginLeft: hp(15),
  },
  containerTextAnimation: {
    // width: hp(160),
    // backgroundColor:'red',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  headerIsOnline: {
    backgroundColor: '#4CB684',
    position: 'relative',
    borderRadius: 50,
    width: hp(8),
    height: hp(8),
    borderStyle: 'solid',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnContainer: {
      height: hp(60),
      // minWidth: '10%',
      // backgroundColor: 'red',
      alignItems: 'center',
      paddingLeft: wp(10),
      flex: 1,
  },
    backBtn: {
      // paddingLeft: wp(5),
        // marginLeft: wp(-20),
        // paddingLeft: hp(20),
        // paddingRight: hp(20),
        height:'100%',
        justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtnText: {
        color: 'white',
        marginLeft: wp(5),
    },
    chatSettings: {
        borderRadius: 50,
        backgroundColor: 'white',
        width: wp(25),
        height: wp(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatSettingImage: {
      width: wp(20),
      height: wp(20)
    }
});
