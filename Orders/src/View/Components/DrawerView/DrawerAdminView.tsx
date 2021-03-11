import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {TypedBaseComponent, IBaseProps} from '../../../Common/BaseComponent';
import {DrawerAdminModel} from '../../../Navigation/DrawerAdminModel';

class DrawerAdminView extends TypedBaseComponent<DrawerAdminModel> {
  constructor(props: IBaseProps<DrawerAdminModel>) {
    super(props);
  }

  render() {
    super.render();
    return <SafeAreaView style={styles.wrapper} />;
  }
}

export {DrawerAdminView};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginHorizontal: hp(15),
    paddingVertical: hp(20),
    overflow: 'hidden',
    // marginLeft:20
  },
});
