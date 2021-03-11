import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import ChatUnreadCount from './ChatUnreadCount';
import { LastMessageView } from './LastMessage';
import ChatTime from './ChatTime';
import ChatName from './ChatName';
import { ContactIconViewModel } from './ContactIconViewModel';
import { BaseComponent } from '../../Common/BaseComponent';
import {CHAT_ICONS} from "../../constants/icons";

class ChatItem extends BaseComponent {
    constructor(props) {
        super(props);
        // this.typePublic = this.props.model.isPublic;
        this.onPress = this.props.onPress;
    }

    renderPublic(item, index) {
        return (
            <TouchableOpacity
                            style={[
                                { width: '100%', height: hp(60)},
                            styles.contact,
                            // { backgroundColor: 'red' },
                            item.unreadCount === 0
                                ? { backgroundColor: 'rgba(255, 255, 255, 0.5)' } //'rgba(255, 255, 255, 0.5)'
                                : null,
                ]} onPress={this.model.onPressChat}>
            <View style={styles.contactContainer}>
                <View style={[styles.contactImgContainer]}>
                    <ContactIconViewModel
                        model={this.model.photo}
                        key={this.model.photo.id}
                        contactIconDiameter={50}
                        type={'large'}
                        hideIsOnline
                    />
                    <View style={styles.unreadCountBox}>
                        <ChatUnreadCount
                            model={this.props.model.unreadCount}
                            key={`chats_${this.props.model.id}_unreadCount`}
                        />
                    </View>
                </View>
                <View style={[styles.containerNamelastMes]}>
                    <View
                        style={[styles.textContainer]}>
                        <ChatName
                            model={this.props.model.name}
                        key={`chats_${this.props.model.id}_name`}
                        iconGroup
                        />
                        <View
                            style={{
                            flexDirection: 'row',
                                width: '100%',
                                marginTop: hp(5),
                        }}>
                            <View style={{ width: '50%', justifyContent: 'flex-end' }}>
                                <LastMessageView
                                    model={this.props.model.lastMessage}
                                width={55}
                                key={`chats_${this.props.model.id}_lastMessage`}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.rightSide}>
                    <View style={styles.wrapTime}>
                        <ChatTime
                            model={this.props.model.chatTime}
                        key={`chats_${this.props.model.id}_chatTime`}
                        />
                    </View>
                    <View style={[styles.groupIconBox, {flexDirection:'row-reverse'}]}>
                        <Image
                            style={styles.groupIcon}
                            // source={require('../assets/img/Icons/people-red/Group.png')}
                            source={CHAT_ICONS.groupRed}
                        />
                        {this.props.leader && <View style={styles.leaderStarBox}>
                            <Image source={CHAT_ICONS.starBlue} style={styles.leaderStar}/>
                        </View>}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
    }

    renderPrivate(item, index) {
        return (
            <TouchableOpacity
                style={[
                    { width: '100%', height: hp(60) },
                styles.contact,
                // { backgroundColor: 'green' },
                item.unreadCount === 0
                    ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                    : null,
            ]}
            onPress={this.model.onPressChat}>
            <View style={styles.contactContainer}>
                <View
                    style={[
                        styles.contactImgContainer,
                    styles.imgCont,
                    { justifyContent: 'center' },
                ]}>
                    <ContactIconViewModel
                        model={this.model.photo}
                        key={`ChatItem_ContactItem_${this.model.photo.id}`}
                        contactIconDiameter={45}
                        type={'large'}
                    />
                    <View style={styles.unreadCountBox}>
                        <ChatUnreadCount
                            model={this.props.model.unreadCount}
                            key={`chats_${this.props.model.id}_unreadCount`}
                        />
                    </View>
                </View>
                <View style={styles.containerNamelastMes}>
                    <View
                        style={[styles.textContainer]}>
                        <View>
                            <ChatName
                                    model={this.props.model.name}
                                key={`chats_${this.props.model.id}_name`}
                            />
                            <View style={{ marginTop: hp(5) }}>
                                <LastMessageView
                                    model={this.props.model.lastMessage}
                                key={`chats_${this.props.model.id}_lastMessage`}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.wrapTime}>
                    <ChatTime
                        model={this.props.model.chatTime}
                    key={`chats_${this.props.model.id}_chatTime`}
                    />
                    {this.props.leader && <View style={styles.leaderStarBox}>
                        <Image source={CHAT_ICONS.starBlue} style={styles.leaderStar}/>
                    </View>}
                </View>
            </View>
        </TouchableOpacity>
    );
    }

    render() {
        super.render();
        if (this.model.isPublic) {
            return this.renderPublic(this.props.model, this.index);
        } else {
            return this.renderPrivate(this.props.model, this.index);
        }
    }
}

export { ChatItem };

const styles = StyleSheet.create({
    contact: {
        backgroundColor: COLORS.FONT_WHITE,
        borderTopColor: COLORS.FONT_WHITE,
        borderLeftColor: COLORS.FONT_WHITE,
        borderRightColor: COLORS.FONT_WHITE,
        marginBottom: hp(5),
        overflow:'hidden',
        // height: hp(70)
        // flex: 1
    },
    contactContainer: {
        paddingVertical: hp(5),
        paddingHorizontal: hp(5),
        marginBottom: hp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 5,
    },
    contactImgContainer: {
        //flex: 3,
        // backgroundColor: 'red',
        maxWidth: wp(50),
        // marginRight: wp(5),
        marginHorizontal: wp(10),
    },
    contactImgTextContainer: {
        backgroundColor: '#D8D8D8',
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 50,
    },
    contactImgText: {
        fontSize: hp(8),
        fontFamily: 'Roboto-Medium',
        opacity: 0.5,
        paddingHorizontal: wp(5),
        paddingVertical: hp(5),
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    unreadCounts: {
        position: 'absolute',
        zIndex: 22,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: COLORS.WHITE.bg,
        bottom: hp(2),
        right: hp(3),
        backgroundColor: '#4CB684',
        borderRadius: hp(13 / 2),
        width: hp(13),
        height: hp(13),
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameUserGroup: {
        maxWidth: hp(80),
        // fontSize: hp(12),
        lineHeight: hp(12),
        // fontFamily: 'Roboto-Medium',
        // color: 'rgba(0, 0, 0, 1)',
        fontSize: hp(12),
        fontFamily: 'Roboto-Regular',
        color: 'rgba(0, 0, 0, 0.38)',
    },
    containerNamelastMes: {
        // borderBottomColor: 'rgba(186,186,186,0.5)',
        // borderBottomWidth: hp(1),
        //flexShrink: 1,
        flex: 7,
        paddingVertical: hp(5),
        marginLeft: wp(5),
    },
    containerGroupName: {
        height: hp(57),
        // paddingTop: hp(5),
        // borderBottomColor: 'rgba(186,186,186,0.5)',
        // borderBottomWidth: hp(1),
        backgroundColor: 'black',
    },
    wrapTime: {
        flex: 1.5,
        minWidth: wp(15),
        // borderBottomColor: 'rgba(186,186,186,0.5)',
        // borderBottomWidth: hp(1),
    },
    groupIconBox: {
        // position: 'absolute',
        // right: wp(25),
        // bottom: wp(10),
        // backgroundColor: 'red'
    },
    groupIcon: {
        resizeMode: 'contain',
        height: hp(20)
    },
    unreadCountBox: {
        position: 'absolute',
        right: -3,
        bottom: -3,
    },
    rightSide: {
        paddingRight: wp(20)
    },
    leaderStarBox: {
      // width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red',
    },
    leaderStar: {
      width: wp(10),
      height: wp(10),
    },
});
