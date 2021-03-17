import React, {useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {HomeListView} from './HomeListView';
import {COLORS} from '../../constants/colors';
import {mockupHeightToDP as hp} from '../../constants/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTypes} from '../../Types';
import {paginationMainList} from '../../store/actions/EditUserInfo';
import {GetOrderInfo} from '../../functions/GetOrderInfo';
import { currentUser } from '../../Core/CurrentUser';

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
        pageSize: 10,
        operationType: 'all',
        departmentId: -1,
      }),
    );
    setRefreshing(false);
    // clear selected user

    //
  }, [searchParam]);
  const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
  const selectedUserId = useSelector((state: reduxTypes) => state.clients.selectedClientId);

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
    let userID;

    if(selectedUserId !== undefined){
      userID = selectedUserId.selectedClientId;
    }

    setStatePreloader(false);
    let body = {};
    body.pageIndex = ++paginationBody.pageIndex;
    body.pageSize = paginationBody.pageSize;
    body.operationType = paginationBody.operationType;
    body.departmentId = paginationBody.departmentId;
    try {
      await GetOrderInfo.getOrders(
        dispatch,
        searchParam.searchText,
        searchParam.status.id,
        body,
        true,
        userID
      );
      setStatePreloader(true);
    } catch (ex) {
      setStatePreloader(true);
    }
  }
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.HEADER_BLUE]}
          />
        }
        onScroll={async ({nativeEvent}) => {
          if (loadDataMore(nativeEvent) && statePreloader) {
            await loadMorePagination();
          }
        }}>
        <HomeListView  />
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
    zIndex: 1,
  },
  preloader: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: hp(150),
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
