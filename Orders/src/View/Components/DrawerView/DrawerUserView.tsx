import React from 'react';
import {
  SafeAreaView,
  StyleSheet, Text, View,
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
        <View style={{flex:1}}>
          <Text>Drawer User</Text>
        </View>
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
    flex:1
  }
});
