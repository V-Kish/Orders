import React from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {CHAT_ICONS, ICONS} from '../constants/icons';
import {COLORS} from '../constants/colors';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {OrderUserView} from '../View/OrderView/OrderUserView';
import {mockupHeightToDP as hp} from '../constants/Dimensions';

import {mockupWidthToDP as hw} from '../constants/Dimensions';
import {orderDataTypes, reduxTypes} from '../Types';
import {useDispatch, useSelector} from 'react-redux';
import {navigator} from '../Core/Navigator';
import { CustomerDetails } from '../View/Customers/CustomerDetails';
import { SelectClientChatAction } from '../store/actions/Clients';
import { Chat } from '../functions/Chat';
import { showModalCreateNewChat } from '../store/actions/AppStart';

export const ClientScreen = () => {
  function goBack() {
    navigator().toGoBack();
  }

  const dispatch = useDispatch();


  function selectUserChat(
    selectedChatUser = {
      userName: '',
      id: -1,
    },
) {
    dispatch(SelectClientChatAction(selectedChatUser));
    navigator().navigate('ChatListScreen');
    const body ={
      pageIndex: 1,
      pageSize: 10,
      isRead: -1,
      clientId: selectedChatUser.id,
    };
    console.log('getChatList succes start', body);
    Chat.getChatList(dispatch,'',body).then(
    (succes) => {
        console.log('getChatList succes', succes);
        console.log('getChatList succes body', body);
        if (selectedChatUser.id !== -1 && succes.Items.length === 0) {
        dispatch(showModalCreateNewChat(true))
        }
    },
    (error) => {},
    );
}

  function selectUserOrders(selectedUser = {
    userName: '',
    userId: -1,
  }){
    console.log(`OPEN ORDERS OF CLIENT: ${userName} WITH ID: ${userId}`)
      // dispatch(SelectClientChatAction(selectedChatUser));
      // navigator().navigate('ChatListScreen');
  }





  const selectedClientDetails = useSelector((state: reduxTypes) => state.clients.selectedUser);
  const selectedUserId = useSelector((state: reduxTypes) => state.clients.selectedClientId);
  let userPhone, userName, userId;

  if(selectedClientDetails.user !== undefined){
    userPhone = selectedClientDetails.user.phone;
    userName = selectedClientDetails.user.name;
    userId = selectedUserId.selectedClientId;
  } else{
    userPhone = '+3800000000';
    userName = '';
    userId = -1;
  }
  return (
    <View style={styles.container}>
      <HeaderView
        icon={ICONS.arrowBackWhite}
        title="Клієнт"
        color={COLORS.HEADER_BLUE}
        // desc={orderData.system.orderNum}
        ordersSettings={true}
        onPress={() => navigator().openDrawer()}
      />
      <ScrollView contentContainerStyle={styles.mainContainer}>
            <CustomerDetails />
      </ScrollView>

      <View style={styles.floatMenu}>
          <TouchableOpacity style={styles.floatButton} onPress={()=>{Chat.goTell(`${userPhone}`)}}>
            <Image source={CHAT_ICONS.detailsPhone} style={styles.img}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.floatButton} onPress={()=>{selectUserChat({userName: userName, id: userId})}}>
            <Image source={CHAT_ICONS.detailsChat} style={styles.img}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.floatButton} onPress={()=>{selectUserOrders({userName: userName, userId: userId})}}>
            <Image source={CHAT_ICONS.detailsOperation} style={styles.img}/>
          </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingHorizontal: hp(10),
  },
  floatMenu: {
    position: "absolute",
    right: 20,
    top: 80
},
floatButton: {
  height: hp(60),
  width: hw(60),
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
  borderColor: '#F2F2F2',
  borderWidth: 1,
  borderRadius: 8
},
img: {
  resizeMode:'contain',
  width:hw(25),
  height:hp(25),
},
});
