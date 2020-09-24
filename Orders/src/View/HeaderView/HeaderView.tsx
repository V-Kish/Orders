import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
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
}) => {
  return (
    <View style={{...styles.container, backgroundColor: color}}>
      <View style={styles.imageView}>
        <Image source={icon} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.wrap}>
          {desc !== undefined && <Text style={styles.desc}>{desc}</Text>}
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
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
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
