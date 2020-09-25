import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {OrderItem} from './OrderItem/OrderItem';
import {
  mockupHeightToDP as hp,
} from '../../constants/Dimensions';
import {reduxTypes} from '../../Types';
import {GetOrderInfo} from '../../functions/GetOrderInfo';
import {COLORS} from '../../constants/colors';
import {paginationMainList} from '../../store/actions/EditUserInfo';
export const HomeListView = () => {
  const dispatch = useDispatch();
  const [statePreloader, setStatePreloader] = useState(true);
  const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
  const searchParam = useSelector(
    (state: reduxTypes) => state.ditUser.searchParam,
  );
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
    <ScrollView
      onScroll={async ({nativeEvent}) => {
        if (loadDataMore(nativeEvent) && statePreloader) {
          await loadMorePagination();
        }
      }}>
      <View style={styles.container}>
        {orders.Items &&
          orders.Items.map((item: any) => {
            return <OrderItem key={item.system.orderNum} item={item} />;
          })}
        {!statePreloader && (
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color={COLORS.FONT_YELLOW} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp(80),
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
