import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
   Button
} from 'react-native';
import {HomeListView} from './HomeListView';
import { SearchView } from './SearchBlock/SearchView';
import { CustomModal } from '../Modal/CustomModal';
import { useSelector } from 'react-redux';

export const HomeView = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const departmentList = useSelector(
        (state: reduxTypes) => state.dictionaries.listDepartments,
    );
    const preparedList = departmentList.map(d=>{
        return {id: d.id, text: d.name}
    })

    const switchModalVisible = () => {
        setModalVisible(!modalVisible)
    }
  return (
    <View style={styles.container}>
      {/* <Button title="on" onPress={switchModalVisible}/> */}
      <CustomModal 
        type="LIST"
        modalVisible={modalVisible}
        changeModalVisible={switchModalVisible}
        title="Зміна відділення видачі"
        list={preparedList}
      />
      <SearchView/>
      <HomeListView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
});
