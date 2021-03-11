import * as React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { TextBoxHeader } from '../../classes/Contacts/TextBoxHeader';
// import { navigator } from '../../controllers/Navigator';
import { ContactsHeader } from '../../provider/Contacts/ContactsHeader';
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import {store} from "../../provider/Store";
import {CHAT_ICONS} from "../../../constants/icons";
import {COLORS} from "../../../constants/colors";

class SearchInputView extends TypedBaseComponent<ContactsHeader> {
  constructor(props) {
    super(props);
  }
  render() {
    super.render();
    return (
      <View style={styles.container}>
        <View style={styles.contactSearch}>
          <View style={styles.arrowBack}>
            {this.props.showArrowBack && (
              <TouchableOpacity style={styles.btnArrowBack}
                                onPress={()=>{
                                  typeof this.props.arrowBackFunction === 'function' ? this.props.arrowBackFunction()
                                      : async ()=> await store().chats.current.onPress(true)
                                }}
              >
                <Image
                  style={styles.searchImg}
                  // source={require('../../assets/img/Icons/arrowBackGray/arrowBack.png')}
                  source={CHAT_ICONS.arrowLeft}
                />
              </TouchableOpacity>
            )}
        </View>
        <View style={styles.search}>
            <Image
              style={styles.searchImg}
              // source={require('../../assets/img/Icons/seadrch-grey/search.png')}
              source={CHAT_ICONS.search}
            />
            <TextBoxHeader
              model={this.model.textBoxHeader}
              key={this.model.textBoxHeader.id}
            />
          </View>
        </View>
      </View>
    );
  }
}
export { SearchInputView };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  //  paddingHorizontal: wp(25),
    paddingVertical: hp(8),
    width: '100%',
    elevation: 10,
  },
  search: {
    //  width: wp(18),
    height: hp(18),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  btnArrowBack: {
   // marginLeft: hp(30),
    marginRight: hp(10),
    justifyContent: 'center',
    //backgroundColor:'red'
  },
  textInput: {
    width: '100%',
    height: hp(40),
    alignSelf: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(14),
    fontFamily: 'Roboto-Regular',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(72),
    paddingRight: wp(20),
    paddingLeft: wp(10),
    backgroundColor: COLORS.BLUE.bg,
  },

  contactSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    // width: '100%'
  },

  search: {
    backgroundColor: COLORS.WHITE.bg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    width: '90%',
    borderRadius:10,
  },
  searchImg: {
    alignSelf: 'center',
  },
  searchInput: {
    flexDirection: 'row',
    width: '75%',
    height: hp(40),
    alignSelf: 'center',
    paddingHorizontal: wp(10),
    backgroundColor: 'white',
  },
  btnClose: {
    alignSelf: 'center',
    height: hp(40),
    justifyContent: 'center',
  },
  headerIcons: {
    resizeMode: 'contain',
    width: hp(23),
    height: hp(23),
  },
  arrowBack: {
    marginRight: wp(10),
  },
});
