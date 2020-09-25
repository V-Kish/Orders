import React, {useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {HomeListView} from './HomeListView';
import {SearchView} from './SearchBlock/SearchView';
import {COLORS} from '../../constants/colors';
import {mockupHeightToDP as hp} from '../../constants/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from '../../Types';
import {paginationMainList} from '../../store/actions/EditUserInfo';
import {GetOrderInfo} from '../../functions/GetOrderInfo';

export const HomeView = () => {
  const dispatch = useDispatch();
  const [statePreloader, setStatePreloader] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
    const searchParam = useSelector(
        (state: reduxTypes) => state.ditUser.searchParam,
    );
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await GetOrderInfo.getOrders(
      dispatch,
      searchParam.searchText,
      searchParam.status.id,
    );
    dispatch(
      paginationMainList({
        pageIndex: 1,
        pageSize: paginationBody.pageSize + 10,
        operationType: 'all',
        departmentId: -1,
      }),
    );
    setRefreshing(false);
  }, []);
  const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);

  const paginationBody = useSelector(
    (state: reduxTypes) => state.ditUser.paginationBody,
  );

  const loadDataMore = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 500;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  async function loadMorePagination() {
    if (!(orders.PageIndex * orders.PageSize < orders.TotalItems)) {
      return;
    }
    setStatePreloader(false);
    dispatch(
      paginationMainList({
        pageIndex: 1,
        pageSize: paginationBody.pageSize + 10,
        operationType: 'all',
        departmentId: -1,
      }),
    );
    if (paginationBody.pageSize >= 100) {
      dispatch(
        paginationMainList({
          pageIndex: paginationBody.pageIndex + 1,
          pageSize: 10,
          operationType: 'all',
          departmentId: -1,
        }),
      );
    }
    let body = {};
    body.pageIndex = paginationBody.pageIndex;
    body.pageSize = paginationBody.pageSize;
    body.operationType = paginationBody.operationType;
    body.departmentId = paginationBody.departmentId;
    body.status = searchParam.status.id;
    body.sQuery = searchParam.searchText;
    await GetOrderInfo.getOrders(
      dispatch,
      searchParam.searchText,
      searchParam.status.id,
      body,
    );
    setTimeout(() => {
      setStatePreloader(true);
    }, 200);
  }
  return (
    <>
      <SearchView />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={async ({nativeEvent}) => {
          if (loadDataMore(nativeEvent) && statePreloader) {
            await loadMorePagination();
          }
        }}>
        <HomeListView />
        {!statePreloader && (
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color={COLORS.HEADER_BLUE} />
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preloader: {
    width: '100%',
    height: hp(100),
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
