import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authorization} from '../../functions/Authorization';
import {navigator} from "../../Core/Navigator";

export const RegistrationLogo = () => {
  return (
    <View style={styles.logoContainer}>
        <View style={styles.logoImgContainer}>
          {/* <Image source=""/> */}
        </View>
        <View style={styles.logoDescView}>
          <Text style={styles.logoDescTitle}>torello.exchange</Text>
          <Text style={styles.logoDescContext}>Робота з замовленнями</Text>
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
    container: {

    },
    logoContainer: {

    },
    logoImgContainer: {

    },
    logoImg: {

    },
    logoDescView: {

    },
    logoDescTitle: {

    },
    logoDescContext: {

    }
})
