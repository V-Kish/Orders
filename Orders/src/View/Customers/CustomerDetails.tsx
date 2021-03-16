import React, { useEffect, useState } from 'react';
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
import { Clients } from '../../functions/Clients';
import { PreloaderChat } from '../Chat/PreloderChat/PreloderChat';
import { SelectedClientDetails } from '../../store/actions/Clients';
import { reduxTypes } from '../../Types';


export const CustomerDetails = (clientId) => {
  const [preloader, setPreloader] = useState(false);
  const dispatch = useDispatch();
  const selectedClient = useSelector((state: reduxTypes) => state.clients.selectedClientId);
  const selectedClientDetails = useSelector((state: reduxTypes) => state.clients.selectedUser);
  const selectedClientOperations = useSelector((state: reduxTypes) => state.clients.selectedUserOperations);
  const listCurrencies = useSelector((state: reduxTypes) => state.dictionaries.listCurrencies);



  useEffect(() => {
    setPreloader(false);
    // let clientId = 50;
    Clients.getSelectedUser(dispatch, {clientId: selectedClient.selectedClientId})
      .then(
        (succes) => {
          setPreloader(true)
        },
        (error) => setPreloader(true),
      );

  }, []);


  function getCurrencyCode(operation: {
    currencyId: number
  }){
    let x = listCurrencies.find((item)=>item.id === operation.currencyId);
    return x.code
  }

  function renderProps(){
    if(selectedClientDetails.user !== undefined && selectedClientDetails.cards !== undefined){
      // let currencyOperations = [];




      const userName = selectedClientDetails.user.name ? selectedClientDetails.user.name : 'No name';
      const userPhone = selectedClientDetails.user.phone ? selectedClientDetails.user.phone : 'No phone';
      let userGroup, userCard, userBonusBalance, userReshta;

      if(selectedClientDetails.cards[0] !== undefined ){
        userGroup = selectedClientDetails.cards[0].group.name;
        userCard = selectedClientDetails.cards[0].number;
        userBonusBalance = selectedClientDetails.cards[0].balance.total;
        userReshta = selectedClientDetails.cards[0].reshta.current;
      } else {
        userGroup = 'false'
        userCard = 'false'
        userBonusBalance = 'false'
        userReshta = 'false'
      }
      
      return (
        <>
          <View style={styles.propsWrapper}>
            <View style={[styles.propContainer, {alignItems: 'center',}]}>
                <Image source={CHAT_ICONS.detailsInfo} style={styles.imgProp}/>
                <Text style={[styles.value, {lineHeight: 26, marginLeft: 10}]}>{userGroup.toLowerCase().includes('vip')? `${userName} VIP`:userName}</Text>
            </View>
    
            {
              userGroup !== 'false' &&
              <View style={styles.propContainer}>
                  <Text style={styles.propName}>Група:</Text>
                  <Text style={styles.value}>{userGroup}</Text>
              </View>
            }
    
            {
              userCard !== 'false' &&
              <View style={styles.propContainer}>
                  <Text style={styles.propName}>Картка:</Text>
                  <Text style={styles.value}>{userCard}</Text>
              </View>
            }
    
            <View style={styles.propContainer}>
              <Text style={styles.propName}>Телефон:</Text>
              <TouchableOpacity onPress={()=>{Chat.goTell(`${userPhone}`)}}><Text style={[styles.value, styles.phone]}>{userPhone}</Text></TouchableOpacity>
            </View>
    
            {
              userBonusBalance !== 'false' &&
              <View style={styles.propContainer}>
                <Text style={styles.propName}>Бонусний рахунок:</Text>
                <Text style={styles.value}>{userBonusBalance} UAH</Text>
              </View>
            }
    
            {
              userReshta !== 'false' &&
              <View style={styles.propContainer}>
                <Text style={styles.propName}>Решта:</Text>
                <Text style={styles.value}>{userReshta} UAH</Text>
              </View>
            }
    
            <View style={styles.more}>
              <View style={[styles.propContainer, {alignItems: 'center',}]}>
                  <Image source={CHAT_ICONS.detailsStatistics} style={styles.imgProp}/>
                  <Text style={[styles.value, {lineHeight: 26, marginLeft: 10, fontSize: 18}]}>Статистика операцій клієнта</Text>
              </View>

              <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={styles.currencyTitle}>
                    <Image source={CHAT_ICONS.detailsBuy} style={styles.currencyImg}/>
                    <Text style={{marginLeft: 10, fontSize: 15}}>Купівля валюти</Text>
                  </View>

                  <View style={styles.currencyProps}>
                      {
                        selectedClientOperations.map((operation)=>{
                          if(operation.buyCount === 0){
                            return null
                          }
                          return (
                            <View key={`buy_${operation.id}`} style={styles.currencyPropsRow}>
                              <View style={styles.currencyLeft}>
                                <View style={styles.statWrapper}>
                                  <Text style={styles.propTitle}>Валюта</Text>
                                  <Text style={styles.propValue}>{getCurrencyCode(operation)}</Text>
                                </View>
                                <View style={[styles.statWrapper, {marginLeft: 40}]}>
                                  <Text style={styles.propTitle}>Кількість</Text>
                                  <Text style={styles.propValue}>{operation.buyCount}</Text>
                                </View>
                              </View>
                              <View style={styles.statWrapper}>
                                <Text style={styles.propTitle}>Сума</Text>
                                <Text style={styles.propValue}>{operation.buySum}</Text>
                              </View>
                            </View>
                          )
                        })
                      }
                  </View>

                  <View style={[styles.currencyTitle, {marginTop: 20}]}>
                    <Image source={CHAT_ICONS.detailsSale} style={styles.currencyImg}/>
                    <Text style={{marginLeft: 10, fontSize: 15}}>Продаж валюти</Text>
                  </View>

                  <View style={[styles.currencyProps, ]}>
                      {
                        selectedClientOperations.map((operation)=>{
                          if(operation.saleCount === 0){
                            return null
                          }
                          return (
                            <View key={`sale_${operation.id}`} style={styles.currencyPropsRow}>
                              <View style={styles.currencyLeft}>
                                <View style={styles.statWrapper}>
                                  <Text style={styles.propTitle}>Валюта</Text>
                                  <Text style={styles.propValue}>{getCurrencyCode(operation)}</Text>
                                </View>
                                <View style={[styles.statWrapper, {marginLeft: 40}]}>
                                  <Text style={styles.propTitle}>Кількість</Text>
                                  <Text style={styles.propValue}>{operation.saleCount}</Text>
                                </View>
                              </View>

                              <View style={styles.statWrapper}>
                                <Text style={styles.propTitle}>Сума</Text>
                                <Text style={styles.propValue}>{operation.saleSum}</Text>
                              </View>
                            </View>
                          )
                        })
                      }
                  </View>

                  <View style={[styles.currencyTitle, {marginTop: 20}]}>
                    <Image source={CHAT_ICONS.detailsSale} style={styles.currencyImg}/>
                    <Text style={{marginLeft: 10, fontSize: 15}}>Замомлення</Text>
                  </View>

                  <View style={[styles.currencyProps, ]}>
                      {
                        selectedClientOperations.map((operation)=>{
                          if(operation.saleCount === 0){
                            return null
                          }
                          return (
                            <View key={`sale_${operation.id}`} style={styles.currencyPropsRow}>
                              <View style={styles.currencyLeft}>
                                <View style={styles.statWrapper}>
                                  <Text style={styles.propTitle}>Валюта</Text>
                                  <Text style={styles.propValue}>{getCurrencyCode(operation)}</Text>
                                </View>
                                <View style={[styles.statWrapper, {marginLeft: 40}]}>
                                  <Text style={styles.propTitle}>Всього</Text>
                                  <Text style={styles.propValue}>{operation.saleCount}</Text>
                                </View>
                              </View>

                              <View style={styles.statWrapper}>
                                <Text style={styles.propTitle}>Сума</Text>
                                <Text style={styles.propValue}>{operation.saleSum}</Text>
                              </View>
                            </View>
                          )
                        })
                      }
                  </View>
              </View>
            </View>
          </View>
    
          <PreloaderChat isHide={preloader} />
        </>
      )
    }

    return (
      <>
        <View style={styles.propsWrapper}>
        
        </View>
  
        <PreloaderChat isHide={preloader} />
      </>
    )
  }
  
  return(
    <ScrollView contentContainerStyle={styles.container}>
      {renderProps()}
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
    width: "83%",
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
  },
  currencyImg: {
    resizeMode:'contain',
    width:hw(20),
    height:hp(20),
  },
  currencyLeft: {
    width:'50%',
    flexDirection: 'row'
  },
  currencyProps: {
    width: '100%',
    flexDirection: 'column'
  },
  currencyPropsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingLeft: 30
  },
  currencyTitle: {
    flexDirection: 'row',
  },
  propTitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)'
  },
  propValue: {
    fontSize: 20
  }
});
