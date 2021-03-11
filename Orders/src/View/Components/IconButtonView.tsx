import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  IBaseProps,
  MultiTypedBaseComponent,
} from '../../Common/BaseComponent';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {containers} from './ButtonView';
import {CounterView} from './CounterView';
import { IconButton } from '../../Model/Components/IconButton';

class IconButtonView extends MultiTypedBaseComponent<IconButton> {
  constructor(props: IBaseProps<IconButton>) {
    super(props);
  }

  isActive(value: containers) {
    switch (value) {
      case containers.container:
        if (this.model.isActive) {
          return styles[`${this.model.style}_active`]
            ? styles[`${this.model.style}_active`]
            : styles[this.model.style]
            ? styles[this.model.style]
            : null;
        } else {
          return styles[this.model.style] ? styles[this.model.style] : null;
        }
      case containers.icon:
        if (this.model.isActive) {
          return styles[`${this.model.style}_iconActive`]
            ? styles[`${this.model.style}_iconActive`]
            : styles[`${this.model.style}_icon`]
            ? styles[`${this.model.style}_icon`]
            : null;
        } else {
          return styles[`${this.model.style}_icon`]
            ? styles[`${this.model.style}_icon`]
            : null;
        }
    }
  }

  render() {
    super.render();
    if (this.model.hidden) {
      return null;
    }
    return (
      <View style={styles.wrapBtn}>
        <TouchableOpacity
          activeOpacity={this.model.activeOpacity}
          style={this.isActive(containers.container)}
          onPress={this.model.onPress.bind(this.model)}>
          <CounterView
            model={this.model.counterModel}
            key={this.childId(this.model.counterModel)}
            id={this.childId(this.model.counterModel)}
          />
          <Image
            style={this.isActive(containers.icon)}
            source={
              this.model.isActive && this.model.iconActive
                ? this.model.iconActive
                : this.model.icon
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export {IconButtonView};

const styles = StyleSheet.create({
  wrapBtn: {},
  navigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(56),
    height: hp(56),
    top: hp(10),
  },
  navigationButton_active: {
    top: hp(10),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(56),
    height: hp(56),
    borderRadius: 15,
  },
  navigationButton_icon: {
    zIndex: 1,
    height: hp(30),
    width: wp(30),
    resizeMode: 'contain',
  },
  navigationButtonCenterButton: {
    top: hp(-20),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(76),
    height: hp(76),
    borderRadius: hp(76 / 2),
  },
  counterRight: {
    zIndex: 5,
    position: 'absolute',
    right: wp(20),
    top: hp(5),
  },
});
