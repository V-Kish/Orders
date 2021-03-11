import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {FloatButtonModel} from '../../../Models/Components/FloatButtonModel/FloatButtonModel';
import {ButtonView} from '../ButtonView';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {controllers} from "../../../Controllers/Controllers";
import {ShowBottomNavigation} from "../../../Core/ShowBottomNavigation";
class FloatButtonView extends TypedBaseComponent<FloatButtonModel> {
  constructor(props: any) {
    super(props);
  }

  // @ts-ignore
  render() {
    super.render();
    let {SlideInLeft} = this.model.options;
    return (
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: SlideInLeft.interpolate({
                  inputRange: [0, 1],
                  outputRange: [140, 20],
                }),
              },
            ],
          },
          styles.trans,
          ShowBottomNavigation.isShow ?  styles.bottom100 : styles.bottom50,
        ]}>
        <ButtonView model={this.model.button} key={this.model.button.id} />
      </Animated.View>
    );
  }
}
export {FloatButtonView};
const styles = StyleSheet.create({
  trans: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    paddingLeft: hp(5),
    flexDirection: 'row',
  },
  bottom100: {
    bottom: 100,
  },
  bottom50: {
    bottom: 50,
  },
});
