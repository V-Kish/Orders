import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';

import {mockupHeightToDP as hp} from '../../constants/Dimensions';

import {navigator} from '../../Core/Navigator';
import {HeaderView} from '../../View/HeaderView/HeaderView';
import {DRAWER_ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';
import { CustomersListView } from '../../View/Customers/CustomersListView';
import { CustomersSearch } from '../../View/Customers/CustomersSearch';
import {useDispatch, useSelector} from 'react-redux';
import { Clients } from '../../functions/Clients';
import { chatListPagination } from '../../store/actions/Chat';
import { PreloaderChat } from '../../View/Chat/PreloderChat/PreloderChat';
import { ClientsListAction, ClientsListSearchParamAction } from '../../store/actions/Clients';
import {reduxTypes} from "../../Types";



export const CustomersScreen = () => {
  const dispatch = useDispatch();
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    setPreloader(false);
    Clients.getClientsList(dispatch, '', false, {pageIndex: 1, PageSize: 20, query: ""})
        .then(
          (succes) => setPreloader(true),
          (error) => setPreloader(true),
        );

        dispatch(
          ClientsListAction({
            pageIndex: 1,
            pageSize: 20,
            query: ""
          }),
        );

  }, []);



  function goBack() {
    navigator().toGoBack();
  }

  const handleTextChange = (text: string) => {
    Clients.getClientsList(dispatch, text, false, {pageIndex: 1, PageSize: 20, query: text})
      .then(
        (succes) => setPreloader(true),
        (error) => setPreloader(true),
      );
    dispatch(ClientsListSearchParamAction({searchText: text}));
  };



  return (
    <View style={styles.container}>
      <HeaderView
        icon={DRAWER_ICONS.burger}
        title="Клієнти системи"
        color={COLORS.HEADER_BLUE}
        ordersSettings={true}
        onPress={() => navigator().openDrawer()}
      />

      <View style={styles.containerClients}>
        <CustomersSearch changeCurrentText={handleTextChange} />
      </View>

      <CustomersListView />
      <PreloaderChat isHide={preloader} />
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
