import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {OrderItem} from './OrderItem/OrderItem';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {reduxTypes} from '../../Types';
import {GetOrderInfo} from '../../functions/GetOrderInfo';
import {Paginate} from '../../functions/Pagination';
import {COLORS} from '../../constants/colors';
export const HomeListView = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 20,
    operationType: 'all',
    departmentId: -1,
  });
  const [statePreloader, setStatePreloader] = useState(true);
  const orders = useSelector((state: reduxTypes) => state.dictionaries.orders);
  const searchParam = useSelector(
    (state: reduxTypes) => state.ditUser.searchParam,
  );
  const loadDataMore = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 500;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  async function loadMorePagination() {
    setStatePreloader(false);
    setPagination((prevState) => ({
      ...prevState,
      pageSize: prevState.pageSize + 10,
    }));
    if (pagination.pageSize >= 100) {
      setPagination((prevState) => ({
        ...prevState,
        pageIndex: prevState.pageIndex + 1,
        pageSize: 10,
      }));
    }
    let body = {};
    body.pageIndex = pagination.pageIndex;
    body.pageSize = pagination.pageSize;
    body.operationType = pagination.operationType;
    body.departmentId = pagination.departmentId;
    body.status = searchParam.statusId;
    body.sQuery = searchParam.searchText;
    console.log('responseMethodsRequest body', body);
    console.log('loadMorePagination pagination', pagination);
    const response = await GetOrderInfo.getOrders(
      dispatch,
      searchParam.searchText,
      searchParam.statusId,
      body,
    );
    setStatePreloader(true);
    console.log('responseloadDataMore', response);
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
    alignItems: 'center',
    zIndex: 999,
  },
});
