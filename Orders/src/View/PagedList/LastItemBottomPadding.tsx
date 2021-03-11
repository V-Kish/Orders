import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IBaseProps, MultiTypedBaseComponent} from '../../Common/BaseComponent';
import {STYLES} from '../../constants/styles';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../.../../constants/Dimensions';
import {LastItemPaddingBottomModel} from '../../Models/navigation/PagedList/LastItemPaddingBottomModel';

export class LastItemBottomPadding extends MultiTypedBaseComponent<
  LastItemPaddingBottomModel
> {
  constructor(props: IBaseProps<LastItemPaddingBottomModel>) {
    super(props);
  }

  render() {
    super.render();
    return (
      <View style={this.model.isVisible ? styles.container : STYLES.hidden} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: 'transparent',
  },
});
