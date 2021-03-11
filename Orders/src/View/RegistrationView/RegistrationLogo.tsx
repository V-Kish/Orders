import React   from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { ICONS } from '../../constants/icons';

export const RegistrationLogo = () => {
  return (
    <View style={styles.logoContainer}>
        <View style={styles.logoImgContainer}>
          <Image
            style={styles.logoImg}
            source={ICONS.logoSmall}
          />
        </View>
        <View style={styles.logoDescView}>
          <Text style={styles.logoDescTitle}>torello.exchange</Text>
          <Text style={styles.logoDescContext}>Робота з замовленнями</Text>
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 40,
        // paddingHorizontal: 20,
    },
    logoImgContainer: {

    },
    logoImg: {

    },
    logoDescView: {
        paddingHorizontal: 10
    },
    logoDescTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    logoDescContext: {
        fontSize: 12,
        color: 'hsl(0,0%,30%)'
    }
})
