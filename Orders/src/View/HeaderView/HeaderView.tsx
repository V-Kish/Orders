import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

export const HeaderView = ({
  icon,
  title,
  desc,
  color = COLORS.HEADER_BLUE,
  counter = 0,
  ordersSettings = false,
  onPress = false,
}) => {
  return (
    <View style={{...styles.container, backgroundColor: color}}>
      <View style={styles.imageView}>
        <TouchableOpacity onPress={onPress !== false ? () => onPress():null}>
          <Image source={icon} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={ordersSettings ? styles.titleOrder : styles.title}>
          {title}
        </Text>
        <View style={styles.wrap}>
          {desc !== undefined && (
            <Text style={ordersSettings ? styles.descOrder : styles.desc}>
              {desc}
            </Text>
          )}
          {counter !== 0 && <Text style={styles.count}>{counter}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(100),
    paddingHorizontal: wp(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  imageView: {
    justifyContent: 'center',
  },
  image: {},
  textContainer: {
    paddingHorizontal: wp(10),
    justifyContent: 'center',
  },
  title: {
    fontSize: wp(20),
    color: 'white',
    fontWeight: 'bold',
  },
  titleOrder: {
    fontSize: wp(18),
    color: 'white',
    marginLeft: wp(15),
  },
  descOrder: {
    fontSize: hp(20),
    color: 'white',
    marginLeft: wp(15),
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    fontSize: hp(14),
    color: 'white',
  },
  count: {
    fontSize: hp(20),
    color: 'white',
  },
});
