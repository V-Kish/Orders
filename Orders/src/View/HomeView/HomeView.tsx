import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import {HomeListView} from './HomeListView';
import {SearchContainer} from './SearchContainer';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {DropDownSelector} from './DropDownSelector';

export const HomeView = () => {
  const [dropdown, setDropdown] = useState(false);

  const switchDropDown = () => {
    setDropdown(!dropdown);
  };
  return (
    <View style={styles.container}>
      <SearchContainer changeDropDownVisible={switchDropDown} />
      <DropDownSelector dropdown={dropdown} />
      <HomeListView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  dropDown: {
    position: 'absolute',
    top: hp(100),
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
    overflow: 'hidden',
    // height: 200,
    zIndex: 999999,
  },
  dropDownShowed: {
    height: Dimensions.get('screen').height,
  },
  content: {
    backgroundColor: 'red',
    minHeight: Dimensions.get('screen').height,
  },
});
