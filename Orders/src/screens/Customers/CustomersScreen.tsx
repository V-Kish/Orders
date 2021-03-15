import React from 'react';
import {View, StyleSheet} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {DRAWER_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import { CustomersListView } from '../../View/Customers/CustomersListView';
import { CustomersSearch } from '../../View/Customers/CustomersSearch';



export const CustomersScreen = () => {
  function goBack() {
    navigator().toGoBack();
  }



  
  return (
    <View style={styles.container}>
      <HeaderView
        icon={DRAWER_ICONS.burger}
        title="Клієнти системи"
        color={COLORS.HEADER_BLUE}
        ordersSettings={true}
        onPress={goBack}
      />

      <View style={styles.containerClients}>
        <CustomersSearch changeCurrentText={()=>{console.log("SEARCHING!!!")}} />
      </View>
      
      <CustomersListView />
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
  containerClients: {
    height: hp(60),
    marginBottom: hp(5),
    paddingHorizontal: hp(10),
  },
});
