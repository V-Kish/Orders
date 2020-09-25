import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {HomeListView} from './HomeListView';
import { SearchView } from './SearchBlock/SearchView';

export const HomeView = () => {

  return (

    <View style={styles.container}>
      <SearchView />
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
