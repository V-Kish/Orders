import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {GetOrderInfo} from '../../../functions/GetOrderInfo';
import {useDispatch} from 'react-redux';
import {ICONS} from "../../../constants/icons";

export const SearchContainer = ({
  changeDropDownVisible,
  dropdown,
  changeCurrentText,
}) => {
  const [myTimeout, setMyTimeout] = useState();
  const dispatch = useDispatch();
  const onChangeText = (text: string) => {
    clearTimeout(myTimeout);
    setMyTimeout(
      setTimeout(() => {
        changeCurrentText(text)
      }, 200),
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchInputView}>
        <View style={styles.searchIconView}>
          <TouchableOpacity
            onPress={changeDropDownVisible}
            activeOpacity={0.9}
            style={styles.dropdownButton}>
            <Image source={dropdown ? ICONS.gambrActive :ICONS.gambrDisabled } style={styles.img}/>
          </TouchableOpacity>
        </View>
        <View style={styles.searchTextInputView}>
          <TextInput
            placeholder="Пошук по номеру замовлення"
            onChangeText={onChangeText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     position: 'absolute',
    height:hp(60),
    zIndex:999,
    width:'100%',
    justifyContent:'center',
     paddingHorizontal:wp(5),
    marginLeft: hp(10),
    marginTop: hp(5),
    shadowColor: 'rgba(0,0,0,0)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10.32,

    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  searchInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconView: {},
  dropdownButton: {},
  searchTextInputView: {},
  img:{
    resizeMode:'contain',
    width:wp(25),
    height:hp(25),
    marginRight:hp(10)
  }
});
