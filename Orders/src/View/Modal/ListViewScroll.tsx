import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { ListItem } from './ListItem';

export const ListViewScroll = ({
    list = [],
    setSelectedItem
}) => {
    return <View style={styles.listView}>
                {list && list.map((item, i)=>{
                    return <ListItem key={i} item={item} setItem={setSelectedItem}/>
                })}
        </View>

};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '100%',
  },
  content: {
      minHeight: '80%',
      flex: 1,
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
