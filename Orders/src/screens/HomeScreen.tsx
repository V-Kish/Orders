import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {reduxTypes} from '../Types';
import {HeaderView} from '../View/HeaderView/HeaderView';
import {DRAWER_ICONS, ICONS} from '../constants/icons';
import {HomeView} from '../View/HomeView/HomeView';
import {SearchView} from '../View/HomeView/SearchBlock/SearchView';
import { navigator } from '../Core/Navigator';
export const HomeScreen = () => {
  const orderDataCount = useSelector(
    (state: reduxTypes) => state.dictionaries.orderDataCount,
  );
  return (
    <SafeAreaView style={styles.containerArea}>
      <HeaderView
        icon={DRAWER_ICONS.burger}
        title="Робота з замовленнями"
        desc={'Нових замовлень: '}
        counter={`${orderDataCount}`}
        onPress={() =>navigator().openDrawer()}
      />
      <View style={styles.container}>
        <SearchView />
        <HomeView />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,1)',
    flex: 1,
  },
  containerArea: {
    flex: 1,
  },
});
