import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image, ActivityIndicator} from 'react-native';
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
  const selectedClientOrders = useSelector((state: reduxTypes) => state.clients.selectedUserOrders);
  const listCurrencies = useSelector((state: reduxTypes) => state.dictionaries.listCurrencies);


  useEffect(() => {
    setPreloader(true);
    // let clientId = 50;
    Clients.getSelectedUser(dispatch, {clientId: selectedClient.selectedClientId})
      .then(
        (succes) => {
          setPreloader(false)
        },
        (error) => setPreloader(true),
      );

  }, [selectedClient]);

  function numberWithSpaces(x:string) {
    if (x !== undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
        return x
    }
  }
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
              <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 15}}>
                  <Image source={CHAT_ICONS.detailsStatistics} style={styles.imgProp}/>
                  <Text style={[styles.value, {lineHeight: 26, marginLeft: 10, fontSize: 18}]}>Статистика операцій клієнта</Text>
              </View>

              <View style={styles.statWrapper}>
                  <View style={[styles.buyWrap]}>
                      <View style={[styles.leftBlock]}>
                        <Image source={CHAT_ICONS.detailsBuy} style={styles.statIcon}/>
                      </View>

                      <View style={[styles.rightBlock]}>
                          <Text style={styles.statTitle}>Купівля валюти</Text>

                          <View style={styles.operations}>
                              <View style={styles.operationsTitle}>
                                <View style={styles.leftProps}>
                                    <Text style={[styles.operationTitle, styles.currency]}>Валюта</Text>
                                    <Text style={[styles.operationTitle, styles.qty, styles.mlTitle]}>Кількість</Text>
                                </View>

                                <View style={styles.rightProps}>
                                    <Text style={[styles.operationTitle, styles.sum]}>Сума</Text>
                                </View>
                              </View>



                              <View style={styles.operationWrap}>
                                  {
                                    selectedClientOperations.map((operation, index)=>{
                                      if(operation.buyCount === 0){
                                        return null
                                      }
                                      return (
                                        <View key={`buy_${index}`} style={styles.operationsValue}>
                                          <View style={styles.leftProps}>
                                              <Text style={[styles.operationValue, styles.currency]}>{getCurrencyCode(operation)}</Text>

                                              <Text style={[styles.operationValue, styles.qty, styles.mlTitle]}>{operation.buyCount}</Text>
                                          </View>

                                          <View style={styles.rightProps}>
                                              <Text style={[styles.operationValue, styles.sum]}>{numberWithSpaces(operation.buySum)}</Text>
                                          </View>
                                        </View>
                                      ) 
                                    })
                                  }
                              </View>
                          </View>
                      </View>
                  </View>

                  <View style={[styles.saleWrap]}>
                      <View style={[styles.leftBlock]}>
                        <Image source={CHAT_ICONS.detailsSale} style={styles.statIcon}/>
                      </View>

                      <View style={[styles.rightBlock]}>
                        <Text style={styles.statTitle}>Продаж валюти</Text>

                        <View style={styles.operations}>
                            <View style={styles.operationsTitle}>
                              <View style={styles.leftProps}>
                                  <Text style={[styles.operationTitle, styles.currency]}>Валюта</Text>
                                  <Text style={[styles.operationTitle, styles.qty, styles.mlTitle]}>Кількість</Text>
                              </View>

                              <View style={styles.rightProps}>
                                  <Text style={[styles.operationTitle, styles.sum]}>Сума</Text>
                              </View>
                            </View>

                            <View style={styles.operationWrap}>
                                  {
                                    selectedClientOperations.map((operation, index)=>{
                                      if(operation.saleCount === 0){
                                        return null
                                      }
                                      return (
                                        <View key={`sale_${index}`} style={styles.operationsValue}>
                                          <View style={styles.leftProps}>
                                              <Text style={[styles.operationValue, styles.currency]}>{getCurrencyCode(operation)}</Text>

                                              <Text style={[styles.operationValue, styles.qty, styles.mlTitle]}>{operation.saleCount}</Text>
                                          </View>

                                          <View style={styles.rightProps}>
                                              <Text style={[styles.operationValue, styles.sum]}>{numberWithSpaces(operation.saleSum)}</Text>
                                          </View>
                                        </View>
                                      ) 
                                    })
                                  }
                            </View>
                        </View>
                      </View>
                  </View>
                  
                  {
                    (selectedClientOrders !== undefined && selectedClientOrders.length > 0)  &&
                  <View style={[styles.ordersWrap]}>
                      <View style={[styles.leftBlock]}>
                        <Image source={CHAT_ICONS.detailsOrders} style={styles.statIcon}/>
                      </View>

                      <View style={[styles.rightBlock]}>
                        <Text style={styles.statTitle}>Замовлення</Text>

                          <View style={styles.operations}>
                            <View style={styles.operationsTitle}>
                              <View style={styles.leftProps}>
                                  <Text style={[styles.operationTitle, styles.currency]}>Валюта</Text>
                                  <Text style={[styles.operationTitle, styles.qty, styles.mlTitle]}>Всього</Text>
                              </View>

                              <View style={styles.rightProps}>
                                  <Text style={[styles.operationTitle, styles.success]}>Успішних</Text>
                                  <Text style={[styles.operationTitle, styles.sumOrders]}>Сума</Text>
                              </View>
                            </View>


                            
                            <View style={styles.operationWrap}>
                              {
                                (selectedClientOrders !== undefined && selectedClientOrders.length > 0)  &&
                                selectedClientOrders.map((order, index)=>{
                                  return(
                                    <View key={`order_${order.currencyId}`}  style={styles.operationsValue}>
                                      <View style={styles.leftProps}>
                                        <Text style={[styles.operationValue, styles.currency]}>{getCurrencyCode(order)}</Text>
                                        <Text style={[styles.operationValue, styles.qty, styles.mlTitle]}>{order.orderBuyCountTotal+order.orderSaleCountTotal}</Text>
                                      </View>

                                      <View style={styles.rightProps}>
                                        <Text style={[styles.operationValue, styles.successOrdersValue]}>{numberWithSpaces(order.orderBuyCountSuccess+order.orderSaleCountSuccess)}</Text>
                                        <Text style={[styles.operationValue, styles.sumOrdersValue]}>{numberWithSpaces(order.orderBuySum+order.orderSaleSum)}</Text>
                                      </View>
                                    </View>
                                  )
                                })
                              }
                            </View>


                        </View>
                      </View>
                  </View>
                }
              </View>
            </View>
          </View>
    
          {preloader && (
              <View style={styles.preloader}>
                  <ActivityIndicator size="large" color={COLORS.HEADER_BLUE} />
              </View>
          )}
        </>
      )
    }

    return (
      <>
        {preloader && (
              <View style={styles.preloader}>
                  <ActivityIndicator size="large" color={COLORS.HEADER_BLUE} />
              </View>
          )}
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
  preloader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
},
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  propsWrapper:{
    width: "83%",
    height: '100%',
    paddingHorizontal: 8,
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
    width:hw(35),
    height:hp(35),
  },
  //NEW STYLES FOR STAT
  statWrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: hw(10)
  },
  buyWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.12)',
    borderBottomWidth: 1,
    paddingBottom: hp(15)
  },
  saleWrap: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.12)',
    borderBottomWidth: 1,
    paddingBottom: hp(15)
  },
  ordersWrap: {
    marginTop: hp(15),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: hp(15)
  },
  leftBlock: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  rightBlock: {
    paddingLeft: hw(10),
    flexDirection: 'column',
    width: '95%',
    justifyContent: 'flex-start',
  },
  statTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    lineHeight: 18
  },
  statIcon: {
    resizeMode:'contain',
    width:hw(18),
    height:hp(18),
  },
  operations: {
    flexDirection: 'column',
    
  },
  operationWrap: {
    
  },
  operationsTitle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  operationTitle: {
    fontSize: 13,
    color: "rgba(0,0,0,0.7)"
  },
  noBuy:{
    paddingVertical: 15
  },
  operationsValue: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  operationValue: {
    fontSize: 16,
  },
  leftProps: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '50%'
  },
  rightProps: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '50%'
  },
  mlTitle: {
    marginLeft: 0
  },
  currency: {
    width: '50%'
  },
  qty: {
    width: '50%',
  },
  success: {
    width: '50%',
  },
  successOrdersValue: {
    width: '20%',
    color: '#27AE60'
  },
  sumOrdersValue: {
    textAlign: 'right',
    width: '80%',
  },
  sumOrders: {
    width: '50%',
    textAlign: 'right'
  },
  sum: {
    width: '100%',
    textAlign: 'right'
  }
});
