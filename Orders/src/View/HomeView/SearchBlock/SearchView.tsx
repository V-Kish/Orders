import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchContainer} from './SearchContainer';
import {DropDownSelector} from './DropDownSelector';
import {GetOrderInfo} from '../../../functions/GetOrderInfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  paginationMainList,
  searchParam,
} from '../../../store/actions/EditUserInfo';

export const SearchView = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const defaultStatus = {id: -1, name: 'Всі', status: true};

  const searchParamSelector = useSelector(
    (state: reduxTypes) => state.ditUser.searchParam,
  );
  const switchDropDown = () => {
    setDropdown(!dropdown);
  };

  const handleStatusChange = (item: any) => {
    // setCurrentStatus(item)
    dispatch(searchParam({status: item}));
    switchDropDown();
    GetOrderInfo.getOrders(dispatch, searchParamSelector.searchText, item.id);
    dispatch(
      paginationMainList({
        pageIndex: 1,
        pageSize: 10,
        operationType: 'all',
        departmentId: -1,
      }),
    );
  };

  const handleTextChange = (text: string) => {
    dispatch(searchParam({searchText: text}));
    GetOrderInfo.getOrders(dispatch, text, searchParamSelector.status.id);
  };
  return (
    <View style={styles.container}>
      <SearchContainer
        changeDropDownVisible={switchDropDown}
        dropdown={dropdown}
        changeCurrentText={handleTextChange}
      />
      <DropDownSelector
        changeDropDownVisible={switchDropDown}
        dropdown={dropdown}
        currentStatus={searchParamSelector.status}
        changeItemStatus={handleStatusChange}
        defaultStatus={defaultStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
