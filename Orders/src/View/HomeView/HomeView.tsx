import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
   Button
} from 'react-native';
import {HomeListView} from './HomeListView';
import { SearchView } from './SearchBlock/SearchView';
import { CustomModal } from '../Modal/CustomModal';

export const HomeView = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const switchModalVisible = () => {
        setModalVisible(!modalVisible)
    }
  return (
    <View style={styles.container}>
      {/*<Button title="on" onPress={switchModalVisible}/>*/}
      <CustomModal
        type="ALERT"
        modalVisible={modalVisible}
        changeModalVisible={switchModalVisible}
        title="CustomAlert"
        content="My content"
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
