import React, {useState} from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {CHAT_ICONS, ICONS} from '../../constants/icons';

export const ChatSearch = ({changeCurrentText}) => {
  const [myTimeout, setMyTimeout] = useState();

  const onChangeText = (text: string) => {
    clearTimeout(myTimeout);
    setMyTimeout(
      setTimeout(() => {
        changeCurrentText(text);
      }, 200),
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchInputView}>
        <View style={styles.searchIconView}>
          <View activeOpacity={0.9} style={styles.dropdownButton}>
            <Image source={CHAT_ICONS.search} style={styles.img} />
          </View>
        </View>
        <View style={styles.searchTextInputView}>
          <TextInput
            placeholder="Ім’я клієнта або тема повідомлення"
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
    height: hp(60),
    zIndex: 999,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: wp(15),
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
  img: {
    resizeMode: 'contain',
    width: wp(25),
    height: hp(25),
    marginRight: hp(10),
  },
});
