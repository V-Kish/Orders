import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { CustomModalButtons } from './CustomModalButtons';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { color } from 'react-native-reanimated';
import { CustomFormInputs } from './CustomFormInputs';
import { ListItem } from './ListItem';

export const ListViewScroll = ({
    list = [],
}) => {
    return <View style={styles.listView}>
                {list && list.map((item, i)=>{
                    return <ListItem key={i} item={item}/>
                })}
        </View>
  
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    // height: '50%',
    // justifyContent: 'space-between',
    // flex: 1,
    height: '100%',
    // backgroundColor: 'red',
    // alignItems: 'center'
  },
  content: {
      minHeight: '80%',
      flex: 1,
    // padding: hp(30),
    // flex: 1,
    // justifyContent: 'space-between',
    // backgroundColor: 'red',
    // height: '100%'
  },
  buttonsView: {
    height: '20%',
    flex: 1,
  },
  modalHeaderView: {
    width: '100%',
    backgroundColor: COLORS.STATUS_BLUE,
    padding: hp(20),
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalHeaderText: {
      fontSize: hp(32),
      lineHeight: 28,
      paddingBottom: hp(5),
      fontWeight: 'bold',
      color: 'white',
  },
  modalHeaderImageView: {
      paddingRight: wp(5),
  },

  listView: {
      flex: 1
    // height: '60%'
  }
});
