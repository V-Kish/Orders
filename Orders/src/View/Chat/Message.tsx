import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

import {useDispatch} from 'react-redux';
import { MyMessage } from '../Components/MyMessage';
import { ReceivedMessage } from '../Components/ReceivedMessage';

export const Message = ({item}) => {
  if (!item.fromUserIsClient) {
    return (
        <View style={styles.containerMyMessages}>
        <MyMessage item={item} />
      </View>
    );
  } else {
    return (
        <View style={styles.containerReceivedMessage}>
        <ReceivedMessage item={item} />
      </View>
    );
  }
};
const styles = StyleSheet.create({
    containerMyMessages:{
        width:'100%',
        justifyContent:'flex-end',
        flexDirection:'row'
    },
    containerReceivedMessage:{
        width:'100%',
        justifyContent:'flex-start',
        flexDirection:'row'
    }
});
