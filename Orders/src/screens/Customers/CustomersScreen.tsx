import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {DRAWER_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import { CustomersListView } from '../../View/Customers/CustomersListView';
import { CustomersSearch } from '../../View/Customers/CustomersSearch';
import { useDispatch } from 'react-redux';
import { Clients } from '../../functions/Clients';
import { chatListPagination } from '../../store/actions/Chat';
import { PreloaderChat } from '../../View/Chat/PreloderChat/PreloderChat';



export const CustomersScreen = () => {
  // const dispatch = useDispatch();
  // const [preloader, setPreloader] = useState(false);
  // useEffect(() => {
  //   setPreloader(false);
  //   Clients.getClientsList(dispatch).then(
  //     (succes) => setPreloader(true),
  //     (error) => setPreloader(true),
  //   );

  // }, []);

  
  
  function goBack() {
    navigator().toGoBack();
      // Clients.getClientsList();
  }

  // const handleTextChange = (text: string) => {
  //   console.log("SEARCHING!!!");
  //   getChatList(dispatch, text).then();
  //   dispatch(chatListSearchParamAction({searchText: text}));
  // };


  
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
        <CustomersSearch changeCurrentText={()=>{
          
        }} />
      </View>
      
      <CustomersListView />
      {/* <PreloaderChat isHide={preloader} /> */}
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
