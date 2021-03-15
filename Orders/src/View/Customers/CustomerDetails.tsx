import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import {mockupHeightToDP as hp} from '../../constants/Dimensions';
import {useSelector} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Chat } from '../../functions/Chat';


export const CustomerDetails = (client) => {
  return (
    <View style={styles.container}>
      <View style={styles.propContainer}>
          <Text style={styles.propName}>Ім’я клієнту:</Text>
          <Text style={styles.value}>Таміла Валютчиця</Text>
      </View>

      <View style={styles.propContainer}>
        <Text style={styles.propName}>Номер телефону:</Text>
        <TouchableOpacity onPress={()=>{Chat.goTell("380965204163")}}><Text style={[styles.value, styles.phone]}>380965204163</Text></TouchableOpacity>
      </View>

      <View style={styles.propContainer}>
            <Text style={styles.propName}>Номер карти:</Text>
            <Text style={styles.value}>#929292929</Text>
      </View>

      <View style={styles.more}>
          
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  propContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  propName: {
    fontSize: 20,
    fontWeight: "800",
    paddingRight: 10,
    lineHeight: 20,
    color: 'black'
  },
  value: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "400",
    color: "rgba(0,0,0,0.6)"
  },
  phone:{
      color: 'blue',
      textDecorationLine: "underline"
  },
  more: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderTopColor: 'rgba(0,0,0,0.6)',
      borderTopWidth: 1,
      marginTop: 15
  }

});
