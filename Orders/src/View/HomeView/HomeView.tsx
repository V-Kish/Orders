import React, { useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { HomeListView } from './HomeListView';
import { SearchContainer } from './SearchContainer';

export const HomeView = () => {
  return (
    <View style={styles.container}>
        <SearchContainer/>
        <HomeListView/>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {

    }
})
