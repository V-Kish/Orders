import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {HomeListView} from './HomeListView';
import {SearchView} from './SearchBlock/SearchView';
import {CustomModal} from '../Modal/CustomModal';
import {useSelector} from 'react-redux';
import {GetOrderInfo} from '../../functions/GetOrderInfo';
import {paginationMainList} from '../../store/actions/EditUserInfo';

export const HomeView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const departmentList = useSelector(
    (state: reduxTypes) => state.dictionaries.listDepartments,
  );
  const preparedList = departmentList.map((d) => {
    return {id: d.id, text: d.name};
  });
  const [selectedDepartment, setSelectedDepartment] = useState(preparedList[0]);

  const switchModalVisible = () => {
    setModalVisible(!modalVisible);
  };
  return (

    <View style={styles.container}>
      <SearchView />
      <HomeListView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex:1,
     backgroundColor: 'rgba(255,255,255,1)',
  },
});
