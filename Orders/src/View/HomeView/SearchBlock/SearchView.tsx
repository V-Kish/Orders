import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {SearchContainer} from './SearchContainer';
import {DropDownSelector} from './DropDownSelector';
import { GetOrderInfo } from '../../../functions/GetOrderInfo';
import { useDispatch } from 'react-redux';

export const SearchView = () => {
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const defaultStatus = {id: -1, name: 'Всі', status: true}
  const [currentStatus, setCurrentStatus] = useState(defaultStatus)

  const switchDropDown = () => {
    setDropdown(!dropdown);
  };

  const handleStatusChange = (item:any) => {
    setCurrentStatus(item)
    switchDropDown()
    GetOrderInfo.getOrders(dispatch, searchText, item.id);
  }

  const handleTextChange = (text: string) => {
      setSearchText(text)
      GetOrderInfo.getOrders(dispatch, text, currentStatus.id);
  }
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
            currentStatus={currentStatus}
            changeItemStatus={handleStatusChange}
            defaultStatus={defaultStatus}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});
