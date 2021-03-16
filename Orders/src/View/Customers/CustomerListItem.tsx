import React from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { IconHelper } from '../../Common/HelperIcon';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { CHAT_ICONS } from '../../constants/icons';
import { Chat } from '../../functions/Chat';
import { UserIcon } from '../Chat/UserIcon';
import {navigator} from '../../Core/Navigator';

import {clientItem, reduxTypes} from "../../Types";
import { useDispatch, useSelector } from 'react-redux';
import { SelectClientChatAction } from '../../store/actions/Clients';

export const CustomerListItem = (props) => {
    const dispatch = useDispatch();
    const selectedUser = useSelector((state: reduxTypes) => state.clients.selectedChatUser);

    function selectUserChat(selectedChatUser = {
        userName: '',
        id: -1
    }){
        dispatch(SelectClientChatAction(selectedChatUser));
        navigator().navigate('ChatListScreen');
    }

    return (
        <View
        style={styles.containers}
        >
            {/*// container //*/}
            <View style={styles.wrap}>
                <TouchableOpacity style={styles.leftWrapper} onPress={() => {navigator().navigate('ClientScreen');}}>
                    {/*// Left //*/}
                    <View style={styles.leftContainer}>
                    {/*// user Icon //*/}
                        <UserIcon item={{clientName: props.item.name}} diameter={60} />
                    </View>

                    <View style={styles.centerContainer}>
                        <Text style={styles.clientName}>{props.item.name}</Text>
                        <Text style={styles.clientPhone}>{props.item.phone}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    selectUserChat({userName: props.item.name, id: props.item.id})
                    console.log(`Open chat with user: ${props.item.name} and id: ${props.item.id}`)
                }} style={[styles.phoneButton, IconHelper.iconDiameter(60)]}>
                    <Image source={CHAT_ICONS.chat} style={styles.img}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    Chat.goTell(props.item.phone)
                }} style={[styles.phoneButton, IconHelper.iconDiameter(60)]}>
                    <Image source={CHAT_ICONS.phone} style={styles.img}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containers: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        
        elevation: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        backgroundColor : "white",
        width: '95%',
        borderRadius: 2
    },
    wrap: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingVertical: 10,
    },
    leftContainer: {
        width: '15%',   
    },
    centerContainer:{
        width: '70%',
        paddingLeft: 20
    },
    rightContainer: {
        width: '15%',  
        justifyContent: 'center',
        alignItems: 'center'
    },
    phoneButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftWrapper: {
        width: '70%',
        flexDirection: 'row'
    },
    clientName: {
        fontSize: 16,
        lineHeight: 24,
        color: ' rgba(0, 0, 0, 0.87)'
    },
    clientPhone: {
        fontSize: 12,
        lineHeight: 16,
        color: '#828282',
    },
    img: {
        resizeMode:'contain',
        width:hp(25),
        height:hp(25),
    }
});
