import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {CHAT_ICONS, ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {mockupWidthToDP as hw} from '../../constants/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Chat } from '../../functions/Chat';
import { SelectClientChatAction } from '../../store/actions/Clients';



export const CustomerDetails = (client) => {



  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <View style={styles.propsWrapper}>
        <View style={[styles.propContainer, {alignItems: 'center',}]}>
            <Image source={CHAT_ICONS.detailsInfo} style={styles.imgProp}/>
            <Text style={[styles.value, {lineHeight: 26, marginLeft: 10}]}>Микола VIP</Text>
        </View>

        <View style={styles.propContainer}>
            <Text style={styles.propName}>Група:</Text>
            <Text style={styles.value}>VIP Група1</Text>
        </View>

        <View style={styles.propContainer}>
              <Text style={styles.propName}>Картка:</Text>
              <Text style={styles.value}>60777777</Text>
        </View>

        <View style={styles.propContainer}>
          <Text style={styles.propName}>Телефон:</Text>
          <TouchableOpacity onPress={()=>{Chat.goTell("380965204163")}}><Text style={[styles.value, styles.phone]}>380965204163</Text></TouchableOpacity>
        </View>

        <View style={styles.propContainer}>
              <Text style={styles.propName}>Бонусний рахунок:</Text>
              <Text style={styles.value}>55.79 UAH</Text>
        </View>

        <View style={styles.propContainer}>
              <Text style={styles.propName}>Решта:</Text>
              <Text style={styles.value}>0.00 UAH</Text>
        </View>

        <View style={styles.more}>
          <View style={[styles.propContainer, {alignItems: 'center',}]}>
              <Image source={CHAT_ICONS.detailsStatistics} style={styles.imgProp}/>
              <Text style={[styles.value, {lineHeight: 26, marginLeft: 10, fontSize: 18}]}>Статистика операцій клієнта</Text>
          </View>
        </View>
      </View>


    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  propsWrapper:{
    width: "86%",
    paddingHorizontal: 8
  },
  propContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  propName: {
    fontSize: 18,
    paddingRight: 10,
    lineHeight: 20,
    color: 'black',
    fontWeight: '400'
  },
  value: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "bold",
    color: "rgba(0,0,0,1)"
  },
  phone:{
      color: 'black'
  },
  more: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderTopColor: 'rgba(0, 0, 0, 0.12)',
      borderTopWidth: 1,
      marginTop: 15,
      paddingVertical: 15
  },
  floatMenu: {
      position: "absolute",
      right: 0,
      top: 10
  },
  floatButton: {
    height: 60,
    width: 60,
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
  imgProp :{
    resizeMode:'contain',
    width:hw(40),
    height:hp(40),
  }
});
