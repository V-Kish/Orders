import React from 'react';
import {View, StyleSheet} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {DRAWER_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
export const CustomersDetailsScreen = () => {
  function goBack() {
    navigator().toGoBack();
  }
  return (
    <View style={styles.container}>
      <HeaderView
        icon={DRAWER_ICONS.burger}
        title="Детальна інформація про клієнта"
        color={COLORS.HEADER_BLUE}
        ordersSettings={true}
        onPress={() => {}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: hp(10),
  },
});
