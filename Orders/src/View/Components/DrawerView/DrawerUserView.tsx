import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { DrawerUserModel } from '../../../Navigation/DrawerUserModel';
import { TypedBaseComponent, IBaseProps } from '../../../Common/BaseComponent';


class DrawerUserView extends TypedBaseComponent<DrawerUserModel> {
  constructor(props: IBaseProps<DrawerUserModel>) {
    super(props);
  }
  render() {
    super.render();
    return (
      <SafeAreaView style={styles.wrapper}>

      </SafeAreaView>
    );
  }
}
export {DrawerUserView};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginHorizontal: hp(15),
    paddingVertical: hp(20),
    overflow: 'hidden',
  }
});
