import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { COLORS } from '../../../constants/colors';
import { ArrowBackButton } from './ArrowBackButton';
import { CloseButton } from './CloseButton';
import { TextBoxHeader } from './TextBoxHeader';
import { BaseComponent } from '../../../Common/BaseComponent';
import {ICONS} from '../../../constants/icons';

class HeaderContacts extends BaseComponent {
  constructor(props) {
    super(props);
  }
  render() {
    super.render();
    return (
      <View style={styles.container}>
        <View style={styles.contactSearch}>
          <View style={styles.arrowBack}>
            <ArrowBackButton
              model={this.props.model.arrowBackButton}
              key={this.props.model.arrowBackButton.id}
            />
          </View>
          <View style={styles.search}>
            <Image
              style={styles.searchImg}
              // source={require('../../assets/img/Icons/seadrch-grey/search.png')}
              source={ICONS.close}
            />
            <TextBoxHeader
              model={this.props.model.textBoxHeader}
              key={this.props.model.textBoxHeader.id}
            />
            <CloseButton
              model={this.props.model.closeButton}
              key={this.props.model.closeButton.id}
            />
          </View>
        </View>
      </View>
    );
  }
}
export { HeaderContacts };
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(72),
    paddingRight: wp(20),
    paddingLeft: wp(10),
    backgroundColor: 'red'
  }, //
  contactSearch: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  search: {
    backgroundColor: 'red'
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
