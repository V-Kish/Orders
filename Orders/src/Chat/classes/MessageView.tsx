import React from 'react';
import { TypedBaseComponent } from '../../Common/BaseComponent';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { ContactIconViewModel } from './ContactIconViewModel';
import { getTime } from '../functions/getTime';
import { dateToString } from '../functions/dateToString';
import { dateParse } from '../functions/dateParse';
import { convertToUTCString } from '../functions/convertToUTCString';
import { COLORS } from '../../constants/colors';
import { currentUser } from '../../Core/CurrentUser';
import { MessageHelper } from '../provider/Messages/MessageHelper';
import { Message as MessageProvider } from '../provider/Message';
import {store} from '../provider/Store'
import {AppSettings} from "../../Common/AppSettings";
import { ICONS} from '../../constants/icons'
var i = 0
class MessageView extends TypedBaseComponent<MessageProvider> {
    constructor(props) {
        super(props);
    }

    capitalize(s) {
        if (typeof s !== 'string') {
            return '';
        }
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    formatter(string){
        if (typeof string !== 'string'){
            return
        }
        let fileName =  string.substring(0,30);
        if (fileName.length === 30){
            return   `${fileName}...${string.split('.')[1]}`
        }else {
            return   `${fileName}`
        }
    }


    messagesStatus(item) {
        if (item.uFromStatus === 1) {
            return (
                <Image
                    style={styles.iconStatus}
                    // source={require('../assets/img/messagesStatusIcon/success/success.png')}
                    source={ICONS.close}
                />
            );
        } else if (item.uFromStatus === null) {
            return (
                <Image
                    style={styles.iconStatus}
                    // source={require('../assets/img/messagesStatusIcon/wait/wait.png')}
                    source={ICONS.close}
                // source={require('../../assets/img/messagesStatusIcon/error/error.png')} DEFAULT error
                />
            );
        } else if (item.id < 0) {
            return (
                <Image
                    style={styles.iconStatus}
                    // source={require('../assets/img/messagesStatusIcon/error/error.png')}
                    source={ICONS.close}
                //source={require('../../assets/img/messagesStatusIcon/wait/wait.png')} DEFAULT wait
                />
            );
        } else {
            return null;
        }
    }

    textMessage(messageFrom) {
        const user = store().contactsItems.get(this.model.ownerUserFrom);
        const userName = user !== null ? user.name : ''
        if (!messageFrom) {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    delayLongPress={500}
                    onLongPress={this.model.onLongPress}
                    // onPress={this.model.onLongPress}
                    style={[
                        styles.incomingMessage,
                        {
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            paddingVertical: hp(2),
                        },
                        this.model.contactIcon !== null ? { marginBottom: hp(0) } : null,
                    ]}>
                    <View style={styles.wrapIcons}>
                        {this.model.contactIcon !== null && (
                            <ContactIconViewModel
                                model={this.model.contactIcon}
                                key={this.model.contactIcon.id}
                                id={`Message_${this.model.id}`}
                                type={'medium'}
                                contactIconDiameter={30}
                                hideIsOnline

                            />
                        )}
                    </View>
                    <View
                        style={[
                            styles.messageContainer,
                            this.model.userName !== null ? { marginTop: hp(5) } : null,
                            styles.incomingMessageContainer,
                            this.model.contactIcon !== null
                                ? styles.messageBubbleRight
                                : styles.defaultStyles,
                        ]}>
                        {/*{showCopy.isShow && copyAlert('right')}*/}
                        <View style={styles.messageContent}>
                            {this.model.userName !== null && this.model.ownerUserFrom === -1 &&(
                                <Text style={styles.contactText}>{this.model.userName}</Text>
                            )}
                            {this.model.ownerUserFrom !== -1 && (
                                <View>
                                    <Text style={styles.fromUser}>
                                        {'Переслане повідомлення від '}
                                    </Text>
                                    <Text
                                        style={[styles.fromUser, { fontFamily: 'Roboto-Medium' }]}>
                                        {userName}
                                    </Text>
                                </View>
                            )}
                            <Text style={[styles.messageText, { maxWidth: '100%' }]}>
                                {this.model.message}
                            </Text>
                            <View style={styles.containerTextDateIncoming}>
                                <Text style={[styles.messageTime]}>
                                    {this.model.isEdited && <Text>ред.</Text>}
                                    {getTime(
                                        dateToString(
                                            dateParse(
                                                convertToUTCString(
                                                    this.model.uFromDate,
                                                    global.__timeOffset__,
                                                ),
                                            ),
                                        ),
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    // onPress={this.model.onLongPress}
                    onLongPress={this.model.onLongPress}
                    delayLongPress={500}
                    style={styles.outgoingMessage}>
                    <View
                        style={[
                            styles.messageContainer,
                            styles.outgoingMessageContainer,
                            styles.transformBack,
                            this.model.contactIcon !== null
                                ? styles.messageBubbleLeft
                                : styles.defaultStyles,
                        ]}>
                        {/*{showCopy.isShow && copyAlert('left')}*/}
                        <View />
                        <View>
                            {/*for resented message*/}
                            {//this.model.uFromStatus === 1 &&
                                this.model.ownerUserFrom !== -1 && (
                                    <View>
                                        <Text style={styles.fromUser}>
                                            {'Переслане повідомлення від '}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.fromUser,
                                                { fontFamily: 'Roboto-Medium' },
                                            ]}>
                                            {userName}
                                        </Text>
                                    </View>
                                )}
                            <Text style={[styles.messageText, { maxWidth: '100%' }]}>
                                {this.model.message}
                            </Text>
                            <View style={styles.containerTextDate}>
                                {/*message time*/}
                                <Text style={styles.messageTimeMy}>
                                    {this.model.isEdited && <Text>ред.</Text>}
                                    {parseInt(this.model.id) > 0
                                        ? getTime(
                                            dateToString(
                                                dateParse(
                                                    convertToUTCString(
                                                        this.model.uFromDate,
                                                        global.__timeOffset__,
                                                    ),
                                                ),
                                            ),
                                        )
                                        : getTime(
                                            dateToString(
                                                dateParse(
                                                    convertToUTCString(
                                                        this.model.uFromDate,
                                                        global.__timeOffset__,
                                                    ),
                                                ),
                                            ),
                                        )}
                                </Text>
                                {this.messagesStatus(this.model)}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    fileOfficeMessage(messageFrom) {
        const user = store().contactsItems.get(this.model.ownerUserFrom);
        const userName = user !== null ? user.name : ''
        if (!messageFrom) {
            // State load Files
            return (
                <View
                    style={[
                        styles.incomingFiles,
                        {
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            paddingVertical: hp(2),
                        },
                    ]}>
                    <View style={styles.wrapIcons}>
                        {this.model.contactIcon !== null && (
                            <ContactIconViewModel
                                model={this.model.contactIcon}
                                key={this.model.contactIcon.id}
                                id={`Message_${this.model.id}`}
                                type={'medium'}
                                contactIconDiameter={30}
                                hideIsOnline
                            />
                        )}
                    </View>
                    <View
                        style={[
                            styles.messageContainer,
                            styles.incomingMessageContainer,
                            this.model.contactIcon !== null
                                ? [styles.messageBubbleRight, { marginBottom: hp(5) }]
                                : styles.defaultStyles,
                            this.model.contactIcon !== null ? { marginTop: hp(0) } : null,
                        ]}>
                        <TouchableOpacity
                            disabled={this.model.isLoading}
                            style={[styles.filesContent, { flexDirection: 'column' }]}
                            onLongPress={this.model.onLongPress}
                            delayLongPress={500}
                            onPress={this.model.onPress}>
                            {//this.model.uFromStatus === 1 &&
                                this.model.ownerUserFrom !== -1 && (
                                    <View style={styles.wrapResendImg}>
                                        <View>
                                            <Text style={styles.fromUser}>
                                                {'Переслане повідомлення від '}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.fromUser,
                                                    { fontFamily: 'Roboto-Medium' },
                                                ]}>
                                                {userName}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            <View
                                style={[
                                    styles.containerContent,
                                    { justifyContent: 'space-between' },
                                ]}>
                                {this.model.isLoading && (
                                    <View style={{ position: 'absolute', top: hp(10) }}>
                                        <ActivityIndicator size="large" color="#FF4E22" />
                                    </View>
                                )}
                                <Image
                                    style={[
                                        styles.filesImage,
                                        // this.model.isLoading ? { opacity: 0 } : null,
                                    ]}
                                    // source={require('../assets/img/FilesIcons/Files/files.png')}
                                    source={ICONS.close}
                                />
                                {!this.model.isLoading && (
                                    <Text style={styles.filesExtension}>
                                        {'.' +
                                            MessageHelper.getFileExtension(
                                                this.model.message.fileNmae,
                                            )}
                                    </Text>
                                )}
                                <View style={styles.wrapFilesText}>
                                    <Text numberOfLines={1} style={styles.fileText}>
                                        {this.model.message.fileNmae}
                                    </Text>
                                    <Text
                                        ellipsizeMode="head"
                                        numberOfLines={1}
                                        style={styles.filesText}>
                                        {MessageHelper.bytesToSize(this.model.message.size)}
                                    </Text>
                                </View>
                            </View>
                            {this.model.message.comment.length > 0 && (
                                <Text style={styles.commentFile}>
                                    {this.model.isEdited ? 'ред. ' : null}
                                    {this.model.message.comment}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            if (this.model.uFromStatus === 1) {
                return (
                    <View style={[styles.Files,]}>
                        <View
                            style={[
                                styles.messageContainer,
                                styles.incomingMessageContainer,
                                this.model.contactIcon !== null
                                    ? [styles.messageBubbleLeft, { marginBottom: hp(5) }]
                                    : [styles.defaultStyles, { marginBottom: hp(5) }],
                            ]}>
                            <TouchableOpacity
                                // disabled={this.model.isLoading}
                                style={[styles.filesContent, { flexDirection: 'column' }]}
                                onLongPress={this.model.onLongPress}
                                delayLongPress={500}
                                onPress={this.model.onPress}>
                                {this.model.ownerUserFrom !== -1 && (
                                    <View style={styles.wrapResendImg}>
                                        <View>
                                            <Text style={styles.fromUser}>
                                                {'Переслане повідомлення від '}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.fromUser,
                                                    { fontFamily: 'Roboto-Medium' },
                                                ]}>
                                                {userName}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                <View
                                    style={[
                                        styles.containerContent,
                                        { justifyContent: 'space-between' },
                                    ]}>
                                    {this.model.isLoading && (
                                        <View style={{ position: 'absolute', top: hp(10) }}>
                                            <ActivityIndicator size="large" color="#FF4E22" />
                                        </View>
                                    )}
                                    <Image
                                        style={[
                                            styles.filesImage,
                                            // this.model.isLoading ? { opacity: 0 } : null,
                                        ]}
                                        // source={require('../assets/img/FilesIcons/Files/files.png')}
                                        source={ICONS.close}
                                    />
                                    {!this.model.isLoading && (
                                        <Text style={styles.filesExtension}>
                                            {'.' +
                                                MessageHelper.getFileExtension(
                                                    this.model.message.fileNmae,
                                                )}
                                        </Text>
                                    )}
                                    <View style={styles.wrapFilesText}>
                                        <Text numberOfLines={1} style={styles.fileText}>
                                            {this.model.message.fileNmae}
                                        </Text>
                                        <Text
                                            ellipsizeMode="head"
                                            numberOfLines={1}
                                            style={styles.filesText}>
                                            {MessageHelper.bytesToSize(this.model.message.size)}
                                        </Text>
                                    </View>
                                </View>
                                {this.model.message.comment.length > 0 && (
                                    <Text style={styles.commentFile}>
                                        {this.model.isEdited ? 'ред. ' : null}
                                        {this.model.message.comment}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={[styles.Files, { marginBottom: hp(10) }]}>
                        <View
                            style={[
                                styles.messageContainer,
                                styles.incomingFilesContainer,
                                styles.messageBubbleLeft,
                            ]}>
                            <View style={styles.filesContent}>
                                {/*<View style={styles.loadingIndicator}>
                  <LoadingIndicator progress={this.model.progress} />
                </View>*/}
                                {this.model.isLoading && (
                                    <View style={styles.loadingIndicator}>
                                        <ActivityIndicator size="large" color="#FF4E22" />
                                    </View>
                                )}
                                <View style={styles.wrapFilesText}>
                                    <Text numberOfLines={1} style={styles.fileTextLoad}>
                                        {this.model.message.fileNmae}
                                    </Text>
                                    <Text
                                        ellipsizeMode="head"
                                        numberOfLines={1}
                                        style={styles.filesText}>
                                        {MessageHelper.bytesToSize(this.model.message.size)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            }
        }
    }

    messageSeparator() {
        return (
            <View style={[styles.date]}>
                <Text
                    style={[
                        styles.dateText
                        //theme !== null ? { color: theme.color } : null,
                    ]}>
                    {this.capitalize(getTime(this.model.uFromDate, true, true))}
                </Text>
            </View>
        );
    }

    serviceMessage() {
        return (
            <View style={styles.serviceContainer}>
                <Text
                    style={[
                        styles.serviceText,
                        //theme !== null ? { color: theme.color } : null,
                    ]}>
                    {this.model.message}
                </Text>
            </View>
        );
    }

    imageMessage(messageFrom) {
        const user = store().contactsItems.get(this.model.ownerUserFrom);
        const userName = user !== null ? user.name : ''
        console.log('uriIMG',`${AppSettings.chatEndpoint}/${
            currentUser().userToken
        }/${this.model.message.fileHash}/as-image-thumb`)
        if (!messageFrom) {
            return (
                <View
                    style={[
                        styles.incomingMessage,
                        {
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            paddingVertical: hp(3),
                        },
                        this.model.contactIcon !== null ? { marginBottom: hp(10) } : null,
                    ]}>
                    <View style={styles.wrapIcons}>
                        {this.model.contactIcon !== null && (
                            <ContactIconViewModel
                                model={this.model.contactIcon}
                                key={this.model.contactIcon.id}
                                id={`Message_${this.model.id}`}
                                type={'medium'}
                                contactIconDiameter={30}
                                hideIsOnline
                            />
                        )}
                    </View>
                    <View
                        style={[
                            styles.imgWrap,
                            { flexDirection: 'column' },
                            this.model.contactIcon !== null
                                ? styles.messageBubbleRightImg
                                : styles.defaultStyles,
                        ]}>
                        {this.model.ownerUserFrom !== -1 && (
                            <View style={{ padding: hp(5) }}>
                                <Text style={styles.fromUser}>
                                    {'Переслане повідомлення від '}
                                </Text>
                                <Text
                                    style={[styles.fromUser, { fontFamily: 'Roboto-Medium' }]}>
                                    {userName}
                                </Text>
                            </View>
                        )}
                        <View style={styles.messageContent}>
                            {this.model.userName !== null && this.model.ownerUserFrom === -1 &&(
                                <Text style={styles.contactTextImg}>{this.model.userName}</Text>
                            )}
                            <TouchableOpacity
                                style={[
                                    {
                                        padding: hp(1),
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        borderStyle: 'solid',
                                    },
                                    styles.defaultStyles,
                                ]}
                                onLongPress={this.model.onLongPress}
                                delayLongPress={500}
                                onPress={this.model.onPress}>
                                <Image
                                    style={typeof this.model.message !== 'undefined' && typeof  this.model.message.comment !== 'undefined' && this.model.message.comment !== '' ? styles.fileMessageImageNoBorders:  this.model.contactIcon !== null ? styles.fileMessageImage : styles.fileMessageImageBorder}
                                    source={{
                                        uri: `${AppSettings.chatEndpoint}/${
                                            currentUser().userToken
                                            }/${this.model.message.fileHash}/as-image-thumb`,
                                    }}
                                />
                            </TouchableOpacity>
                          {typeof this.model.message !== 'undefined' && typeof  this.model.message.comment !== 'undefined' && this.model.message.comment !== '' &&(
                            <Text style={styles.messageTextImg}>
                              {this.model.message.comment}
                            </Text>
                          )}
                            <View
                                style={ typeof this.model.message !== 'undefined' && typeof  this.model.message.comment !== 'undefined' && this.model.message.comment !== '' ? {
                                  alignItems: 'flex-end',
                                  marginRight: hp(15),
                                  marginBottom: hp(5),
                                }: styles.containerText}>
                                <Text style={typeof this.model.message !== 'undefined' && typeof  this.model.message.comment !== 'undefined' && this.model.message.comment !== '' ? styles.messageTime :[styles.messageTime,{color:'white'}]}>
                                    {this.model.isEdited && <Text>ред. </Text>}
                                    {getTime(
                                        dateToString(
                                            dateParse(
                                                convertToUTCString(
                                                    this.model.uFromDate,
                                                    global.__timeOffset__,
                                                ),
                                            ),
                                        ),
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            // console.log('imageSource', this.model)
            return (
                <View style={styles.outgoingMessage}>
                    <View
                        style={[
                            styles.imgWrap,
                            styles.outgoingMessageContainer,
                            this.model.contactIcon !== null
                                ? [styles.messageBubbleLeftImg]
                                : [styles.defaultStyles],
                        ]}>
                        <View>
                            <TouchableOpacity
                                style={[
                                    {
                                        padding: hp(1),
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        borderStyle: 'solid',
                                    },
                                    styles.defaultStyles,
                                ]}
                                onLongPress={this.model.onLongPress}
                                delayLongPress={500}
                                onPress={this.model.onPress}
                                // disabled={this.model.isLoading}
                            >
                                {this.model.isLoading && (
                                    <View
                                        style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex: 999, alignItems: 'center', justifyContent: 'center'}}>
                                        <ActivityIndicator size="large" color="#FF4E22" />
                                    </View>
                                )}
                                {//this.model.uFromStatus === 1 &&
                                    this.model.ownerUserFrom !== -1 && (
                                        <View style={{ padding: hp(5) }}>
                                            <Text style={styles.fromUser}>
                                                {'Переслане повідомлення від '}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.fromUser,
                                                    { fontFamily: 'Roboto-Medium' },
                                                ]}>
                                                {userName}
                                            </Text>
                                        </View>
                                    )}
                                <Image
                                    style={typeof this.model.message !== 'undefined' && typeof  this.model.message.comment !== 'undefined' && this.model.message.comment !== '' ? styles.fileMessageImageNoBorders:  this.model.contactIcon !== null ? styles.fileMessageImageNoBordersLeft : styles.fileMessageImageBorder}
                                    source={{
                                        uri:
                                            !this.model.isLoading
                                                ? `${AppSettings.chatEndpoint}/${
                                                    currentUser().userToken
                                                }/${this.model.message.fileHash}/as-image-thumb`
                                                : this.model.message.fileHash,
                                    }}
                                />
                            </TouchableOpacity>
                          {typeof this.model.message !== 'undefined' && typeof  this.model.message.comment !== 'undefined' && this.model.message.comment !== '' &&(
                            <Text style={styles.messageTextImg}>
                              {this.model.message.comment}
                            </Text>
                          )}
                            <View
                                style={[
                                    styles.containerTextDateNew,
                                    { marginRight: hp(7), marginBottom: hp(5) },
                                  typeof this.model.message !== 'undefined' && typeof  this.model.message.comment !== 'undefined' && this.model.message.comment !== '' ? {
                                      alignItems: 'flex-end',
                                      marginRight: hp(15),
                                      marginBottom: hp(5),
                                    }: styles.containerText
                                ]}>
                                <Text style={typeof this.model.message !== 'undefined' && typeof  this.model.message.comment !== 'undefined' && this.model.message.comment !== '' ? styles.messageTime :[{color:'white',paddingLeft:hp(5)}]} >
                                    {this.model.isEdited && <Text>ред. </Text>}
                                    {getTime(
                                        dateToString(
                                            dateParse(
                                                convertToUTCString(
                                                    this.model.uFromDate,
                                                    global.__timeOffset__,
                                                ),
                                            ),
                                        ),
                                    )
                                    }
                                </Text>
                                {this.messagesStatus(this.model)}
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }

    callMessage(messageFrom, type){
        let message = ''
        let icon = ''
        let timeIcon = ''
        let style = messageFrom ? 'in' : 'out'
        switch(type){
            case 10://successCall Успішний дзвінок
                if(messageFrom){
                    message = 'Вихідний дзвінок'
                    // icon = require('../assets/img/CallIcon/Notiffication/outCall.png')
                    icon = ICONS.close
                } else {
                    message = 'Вхідний дзвінок'
                    // icon = require('../assets/img/CallIcon/Notiffication/inCall.png')
                    icon = ICONS.close
                }
                // timeIcon = require('../assets/img/CallIcon/Notiffication/timeSuccess.png')
                timeIcon = ICONS.close
                break;
            case 11://missedСall Пропущений дзвінок
                if(messageFrom){
                    message = 'Вихідний дзвінок'
                } else {
                    message = 'Пропущений дзвінок'
                }
                // timeIcon = require('../assets/img/CallIcon/Notiffication/timeMissed.png')
                // icon = require('../assets/img/CallIcon/Notiffication/missed.png')
                icon = ICONS.close
                timeIcon = ICONS.close
                break;
            case 12://failedСall Відхилений дзвінок
                if(messageFrom){
                    message = 'Скасований виклик'
                } else {
                    message = 'Скасований виклик'
                }
                style = 'fail'
                // icon = require('../assets/img/CallIcon/Notiffication/failed.png')
                // timeIcon = require('../assets/img/CallIcon/Notiffication/timeFailed.png')
                icon = ICONS.close
                timeIcon = ICONS.close
                break;
        }
            return  <View style={{...styles.callView,...styles[`callView_${messageFrom ? 'in' : 'out'}`]}}>
                <View style={{...styles.callViewContainer,...styles[`callContainer_${style}`]}}>
                    <View style={styles.callIconView}>
                        <Image source={icon} style={styles.callIcon}/>
                    </View>
                    <View style={styles.callContent}>
                        <Text style={styles.callMessageText}>{message}</Text>
                        {this.model.message!=='' && <View style={styles.callLongerView}>
                                <Text style={styles.callLongerText}>тривалість: </Text>
                                <Text style={styles.callLongerContent}>{this.model.message}</Text>
                            </View>
                        }
                        <View style={styles.callDate}>
                            <Text style={styles.callDateText}>
                                {getTime(dateToString(dateParse(convertToUTCString(this.model.uFromDate,global.__timeOffset__,),),),)}
                            </Text>
                            <View style={styles.callDateIconView}>
                                <Image
                                    source={timeIcon}
                                    style={styles.callDateIcon}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
    }

    removedMessage(){

        return  <View style={styles.messageRemoved}>
                    <View style={styles.messageRemovedContainer}>
                        <Text style={styles.removedMessageText}>Повідомлення видалено</Text>
                    </View>
            </View>
    }

    mediaMessage(messageFrom){
        const user = store().contactsItems.get(this.model.ownerUserFrom);
        const userName = user !== null ? user.name : ''
        // console.log('this.model.message',this.model.message.comment)
        let style = messageFrom ? 'in' : 'out'
        return  <View style={{...styles.mediaMessageView,...styles[`mediaMessageView_${messageFrom ? 'in' : 'out'}`]}}>
            <View style={{...styles.mediaMessageViewContainer,...styles[`mediaMessageContainer_${style}`]}}>
                <TouchableOpacity
                    onPress={this.model.onPress}
                    onLongPress={this.model.onLongPress}
                >
                    {this.model.ownerUserFrom !== -1 && (
                            <View style={{ padding: hp(5) }}>
                                <Text style={styles.fromUser}>
                                    {'Переслане повідомлення від '}
                                </Text>
                                <Text
                                    style={[
                                        styles.fromUser,
                                        { fontFamily: 'Roboto-Medium' },
                                    ]}>
                                    {userName}
                                </Text>
                            </View>
                        )}
                    <View style={styles.mediaView}>
                        <View style={styles.mediaIconView}>
                            <Image source={ICONS.close} style={styles.mediaIcon}/>
                        </View>
                        <View style={styles.mediaNameView} >
                            <Text style={styles.mediaNameText}>{this.formatter(this.model.message.fileNmae)}</Text>
                            <Text style={styles.mediaNameTextComment}>{this.model.message.comment}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    }
    renderMessageType(messageType, messageFrom) {
        switch (messageType) {
            case 1:
                return this.textMessage(messageFrom);
            case 2:
                return this.fileOfficeMessage(messageFrom);
            case 3:
                //video
              return this.mediaMessage(messageFrom);
            case 4:
                //audio
              return this.mediaMessage(messageFrom);
            case 5:
                return this.imageMessage(messageFrom);
            case 8:
                return this.fileOfficeMessage(messageFrom);
            case 100:
                return this.serviceMessage();
            case 200:
                return this.messageSeparator();
            case 10:
                return this.callMessage(messageFrom, messageType);
            case 11:
                return this.callMessage(messageFrom, messageType);
            case 12:
                return this.callMessage(messageFrom, messageType);
            case 404:
              return this.removedMessage()
            default:
                return <View />;
        }
    }
    scrollEnd(){
        if (i > 0){
            return
        }
        if (store().settings.sizeAllItems === this.props.index){
            ++i
            store().chats.current.items.dataSource.scrollToEnd();


        }
    }
    render() {
        super.render();
        this.scrollEnd()
        return this.renderMessageType(
            this.model.messageType,
            currentUser().userId === this.model.uFrom,
        );
    }
}

export { MessageView };

const styles = StyleSheet.create({
    mediaNameText:{
        // maxWidth:'80%'
    },
    mediaNameTextComment:{
        justifyContent: 'flex-end',
        fontSize: hp(9),
    },
    transformBack: {
    },
    messageContainer: {
        maxWidth: wp(240),
        flexDirection: 'row',
        paddingHorizontal: wp(15),
        paddingVertical: wp(5),
    },
    imgWrap: {
        maxWidth: wp(240),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: COLORS.WHITE.bg,
    },
    fileMessageImage: {
        width: wp(220),
        height: wp(220),
        borderTopRightRadius: hp(15),
        borderTopLeftRadius: hp(15),
        borderBottomRightRadius: hp(15),
        zIndex: 1000,
    },
  fileMessageImageNoBorders:{
    width: wp(220),
    height: wp(220),
    zIndex: 1000,
    borderTopRightRadius: hp(15),
    borderTopLeftRadius: hp(15),
  },
  fileMessageImageNoBordersLeft:{
    width: wp(220),
    height: wp(220),
    zIndex: 1000,
    borderTopRightRadius: hp(15),
    borderTopLeftRadius: hp(15),
    borderBottomLeftRadius: hp(15),
  },
  fileMessageImageBorder: {
        width: wp(220),
        height: wp(220),
        borderTopRightRadius: hp(15),
        borderTopLeftRadius: hp(15),
        borderBottomLeftRadius: hp(15),
        borderBottomRightRadius: hp(15),
        zIndex: 1000,
    },
    defaultStyles: {
        borderTopRightRadius: hp(15),
        borderTopLeftRadius: hp(15),
        borderBottomRightRadius: hp(15),
        borderBottomLeftRadius: hp(15),
    },
    messageBubbleRight: {
        borderTopRightRadius: hp(20),
        borderTopLeftRadius: hp(20),
        borderBottomRightRadius: hp(20),
    },
    messageBubbleRightImg: {
        borderTopRightRadius: hp(15),
        borderTopLeftRadius: hp(15),
        borderBottomRightRadius: hp(15),
    },
    messageBubbleLeftImg: {
        borderTopRightRadius: hp(15),
        borderTopLeftRadius: hp(15),
        borderBottomLeftRadius: hp(15),
    },
    messageBubbleLeft: {
        borderTopRightRadius: hp(20),
        borderTopLeftRadius: hp(20),
        borderBottomLeftRadius: hp(20),
    },
    messageText: {
        // fontSize: hp(13.5),
        fontSize: wp(13),
        fontFamily: 'Roboto-Regular',
        maxWidth: '80%',
        //backgroundColor:'red'
    },
  messageTextImg: {
    fontSize: hp(13.5),
    fontFamily: 'Roboto-Regular',
    maxWidth: '80%',
    paddingLeft:hp(5)
    //backgroundColor:'red'
  },
    messageTime: {
        marginLeft: wp(5),
        justifyContent: 'flex-end',
        fontSize: hp(9),
    },
    messageTimeMy: {
        justifyContent: 'flex-end',
        fontSize: hp(9),
        alignSelf: 'center',
        textAlignVertical: 'center',
    },
    outgoingMessage: {
        alignItems: 'flex-end',
        paddingHorizontal: wp(12),
        marginBottom: hp(4),
    },
    outgoingMessageContainer: {
        justifyContent: 'flex-end',
        backgroundColor: COLORS.FONT_BLACK,
    },
    incomingMessage: {
        alignItems: 'flex-start',
        paddingHorizontal: wp(3),
        marginBottom: hp(0),
    },
    incomingMessageContainer: {
        justifyContent: 'flex-start',
        backgroundColor: '#D9EFF2',
        // backgroundColor: COLORS.GRAY.bg,
    },
    serviceContainer: {
        paddingHorizontal: wp(35),
        marginBottom: hp(20),
    },
    serviceText: {
        fontSize: hp(14),
        textAlign: 'center',
        color: COLORS.FONT_BLACK,
        fontFamily: 'Roboto',
    },
    contactText: {
        fontSize: hp(10),
        textAlign: 'left',
        color: '#0076BF',
        fontFamily: 'Roboto-Medium',
    },
  contactTextImg: {
    fontSize: hp(10),
    textAlign: 'left',
    color: '#0076BF',
    fontFamily: 'Roboto-Medium',
    paddingLeft:hp(10),
    paddingTop:hp(5),
    paddingBottom:hp(5),
  },
    messageContent: {
        maxWidth: '100%',
    },
    containerTextDate: {
        width: hp(50),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
  containerTextDateNew: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    containerTextDateOneLine: {
        width: hp(50),
        backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    containerTextDateIncoming: {
        height: hp(10),
        alignItems: 'flex-end',
    },
    iconStatus: {
        resizeMode: 'contain',
        marginLeft: hp(5),
    },
    imagePreloader: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreloaderAbsolute: {
        position: 'absolute',
    },
    modal: {
        flex: 1,
        padding: 40,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    modalImage: {
        width: '100%',
        height: 500,
        resizeMode: 'contain',
    },
    modalButtonText: {
        padding: 10,
        color: 'white',
    },
    // styles for FILES
    Files: {
        alignItems: 'flex-end',
        paddingHorizontal: wp(12),
        // marginBottom: hp(20),
    },
    incomingFiles: {
        alignItems: 'flex-start',
        paddingHorizontal: wp(3),
        // marginBottom: hp(20),
    },
    filesContent: {
        flexDirection: 'row',
    },
    wrapFilesText: {
        justifyContent: 'space-between',
        maxWidth: '76%',
    },
    filesImage: {
        resizeMode: 'contain',
        width: wp(45),
        height: hp(52),
        marginRight: hp(10),
    },
    filesText: {
        fontSize: hp(12),
        fontFamily: 'Roboto-Regular',
        textAlign: 'right',
        //backgroundColor: 'red',
        width: '100%',
        color: '#717C7D',
    },
    incomingFilesContainer: {
        justifyContent: 'flex-start',
        backgroundColor: '#F4C888',
    },
    filesExtension: {
        top: hp(6),
        left: wp(4),
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        position: 'absolute',
        fontSize: hp(9),
        textTransform: 'uppercase',
    },
    fileText: {
        fontSize: hp(10),
        color: '#0076BF',
        fontFamily: 'Roboto-Medium',
    },
    fileTextLoad: {
        fontSize: hp(16),
        fontFamily: 'Roboto-Regular',
        color: '#0076BF',
    },
    loadingIndicator: {
        marginRight: hp(10),
    },
    wrapIcons: {
        marginRight: hp(5),
        width: hp(30),
        height: hp(30),
        borderRadius: hp(30 / 2),
        // overflow: 'hidden',
    },
    textCommnet: {
        paddingHorizontal: hp(6),
        paddingTop: hp(5),
        width: wp(220),
    },
    copyStyles: {
        position: 'absolute',
        borderRadius: hp(50),
        paddingTop: hp(4),
        paddingBottom: hp(5),
        paddingLeft: hp(7),
        paddingRight: hp(7),
        zIndex: 33,
    },
    copyLeft: {
        left: hp(-40),
    },
    copyRight: {
        right: hp(-40),
    },
    imageCopy: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
    // fromUser
    fromUser: {
        fontSize: hp(10.5),
        fontFamily: 'Roboto-Regular',
        maxWidth: '100%',
        color: '#0076BF',
    },
    // img
    wrapResendImg: {
        marginBottom: hp(5),
    },
    containerContent: {
        flexDirection: 'row',
    },
    // files
    commentFile: {
        fontSize: hp(10.5),
        fontFamily: 'Roboto-Regular',
        color: COLORS.FONT_BLACK,
        paddingLeft: hp(5),
    },
    date: {
        marginVertical: hp(20),
        alignItems: 'stretch',
    },
    dateText: {
        textAlign: 'center',
        // color: 'white',
        // color: COLORS.GRAY.bg,
        color: 'hsl(0,0%,25%)',
        fontFamily: 'Roboto',
        fontSize: hp(14),
    },
  containerText:{
    backgroundColor:'rgba(107,107,107,0.5)',
    position:'absolute',
    bottom:0,
    right:0,
    marginRight: hp(10),
    paddingRight: hp(5),
    marginBottom: hp(5),
    alignItems: 'center',
    justifyContent:'center',
    borderRadius:50,
  },
  callView: {
    //   width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: hp(5),
  },
  callView_in: {
    // alignItems: 'flex-end',
    // marginRight: wp(12),
    alignItems: 'center',
  },
  callView_out: {
    // alignItems: 'flex-start',
    // marginLeft: wp(30),
    alignItems: 'center',
  },
  callViewContainer: {
    backgroundColor: 'white',
    paddingVertical: hp(5),
    paddingHorizontal: hp(5),
    borderRadius: 15,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '60%',
    justifyContent: 'center',
  },
  callMessageText: {
      color: 'rgba(83,83,83,1)',
      fontFamily: 'Roboto-Regular',
      fontSize: wp(13),
    //   paddingVertical: hp(5),
      marginHorizontal: wp(3),
  },
  callLongerView: {
    flexDirection: 'row',
    marginHorizontal: wp(3),
  },
  callLongerText: {
      color: 'rgba(0,0,0,.5)',
      fontSize: wp(10)
  },
  callLongerContent: {
      color: 'rgba(0,0,0,.7)',
      fontSize: wp(10)
  },
  callContainer_in: {

  },
  callContainer_out: {
    backgroundColor: COLORS.FONT_BLACK
  },
  callContainer_fail: {
    backgroundColor: 'rgba(255,212,213,.85)'
  },
  callIconView: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: wp(5)
  },
  callIcon: {
    width: wp(25),
    height: wp(20)
  },
  callContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // flex: 1,
    // width: '70%',
  },
  callDate: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  callDateText: {
    fontSize: hp(9),
  },
  callDateIconView: {
    marginHorizontal: wp(3)
  },
  callDateIcon: {
      width: wp(12),
      height: wp(12)
  },
  messageRemoved:{
      flexDirection: 'row',
      justifyContent: 'flex-end',

  },
  messageRemovedContainer: {
      backgroundColor: COLORS.FONT_BLACK,
      marginRight: wp(14),
      marginBottom: hp(4),
      padding: wp(5),
      borderRadius: 10
  },
  removedMessageText: {
      color: COLORS.GRAY.text,
  },

  mediaMessageView: {
    //   width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: hp(5),
  },
  mediaMessageView_in: {
    alignItems: 'flex-end',
    marginRight: wp(12),
  },
  mediaMessageView_out: {
    alignItems: 'flex-start',
    marginLeft: wp(30)
  },
  mediaMessageViewContainer: {
    // width: '70%',
    backgroundColor: 'white',
    paddingVertical: hp(5),
    paddingHorizontal: hp(5),
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaMessageContainer_in: {

  },
  mediaMessageContainer_out: {
    backgroundColor: '#D9EFF2',
    // backgroundColor: COLORS.GRAY.bg,
  },
  mediaView: {
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth:'80%',
  },
  mediaIconView: {
      padding: hp(5),
      borderRadius: 100,
      backgroundColor: COLORS.FONT_BLACK,
      marginHorizontal: hp(5)
  }
});
