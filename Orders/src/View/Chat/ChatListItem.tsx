import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {UserIcon} from './UserIcon';
import {ChatTime} from './ChatTime';
import {CHAT_COLORS, COLORS} from '../../constants/colors';
import {currentUser} from '../../Core/CurrentUser';

export const ChatListItem = ({item}) => {
  return (
   <View>
     <TouchableOpacity style={styles.containers} onPress={() => alert('sa')}>
       {/*// container //*/}
       <View style={styles.wrap}>
         {/*// Left //*/}
         <View style={styles.leftContainer}>
           {/*// user Icon //*/}
           <UserIcon item={item} diameter={60} />
         </View>
         {/*// Right // */}
         <View style={styles.rightContainer}>
           {/*// theme // */}
           <View style={styles.themeWrap}>
             <View style={styles.themeLeft}>
               <Text style={styles.themeText} numberOfLines={1}>
                 {item.theme}
               </Text>
             </View>
             <View style={styles.themeRight}>
               <ChatTime date={item.date} />
             </View>
           </View>
           {/*// content // */}
           <View style={styles.wrapLastMessage}>
             <Text numberOfLines={2} style={styles.lastMessageText}>
               {item.fromUserIsClient && (
                   <Text style={styles.userName}>{currentUser().userName} </Text>
               )}
               {!item.fromUserIsClient && (
                   <Text style={styles.userName}>{item.clientName} </Text>
               )}
               — {item.message}
               sad sadas das dsd 1232132 asnd asnd mdasd ,masnd j,ash d asdk
               daskd jaskd jasl S
             </Text>
           </View>
         </View>
       </View>
     </TouchableOpacity>
     <View style={styles.lineBottom}/>
   </View>
  );
};
const styles = StyleSheet.create({
  containers: {
    marginTop: hp(10),
    paddingVertical: hp(15),
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  lineBottom:{
    position:"absolute",
    bottom:0,
    left: '15%',
    marginLeft: wp(10),
    width: '100%',
    borderColor:CHAT_COLORS.BORDER_COLOR,
    borderStyle:'solid',
    borderWidth:0.5,
  },
  wrap: {
    width: '100%',
    flexDirection: 'row',
  },
  leftContainer: {
    width: '15%',
  },
  rightContainer: {
    width: '85%',
  },
  themeLeft: {
    width: '70%',
  },
  themeRight: {
    width: '20%',
  },
  themeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeText: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp(18),
    color: COLORS.FONT_BLACK,
  },
  wrapLastMessage: {
    width: '95%',
  },
  lastMessageText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(16),
    color: CHAT_COLORS.FONT_GRAY,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp(15),
    color: COLORS.FONT_BLACK,
  },
});
