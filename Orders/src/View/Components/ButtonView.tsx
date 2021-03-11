import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import {TypedBaseComponent} from '../../Common/BaseComponent';

import {COLORS} from '../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {CounterView} from './CounterView';
import {navigator} from '../../Core/Navigator';
import { Button } from '../../Model/Components/Button';

export enum containers {
  container,
  icon,
  text,
  counterStyle,
  point,
}

class ButtonView extends TypedBaseComponent<Button> {
  constructor(props: any) {
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
      case containers.text:
        if (this.model.isActive) {
          return styles[`${this.model.style}_textActive`]
            ? styles[`${this.model.style}_textActive`]
            : styles[`${this.model.style}_text`]
            ? styles[`${this.model.style}_text`]
            : null;
        } else {
          return styles[`${this.model.style}_text`]
            ? styles[`${this.model.style}_text`]
            : null;
        }
      case containers.counterStyle:
        return styles[`${this.model.style}_counterStyle`];
      case containers.point:
        return styles[`${this.model.style}_point`];
    }
  }

  render() {
    super.render();
    if (!this.model.isVisible) {
      return <></>;
    }
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.95];
    const scale = animation.interpolate({inputRange, outputRange});

    const onPressIn = () => {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };
    const onPressOut = () => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };
    if (!this.model.textOut) {
      if (this.props.isShowDoubleButton) {
        return (
          <TouchableOpacity
            disabled={this.model.disabled}
            activeOpacity={this.model.activeOpacity}
            style={this.model.disabled ? styles.defaultDisableBtn : this.isActive(containers.container)}
            onPress={this.model.onPress}>
            {typeof this.model.icon !== 'undefined' && (
              <Image
                source={
                  typeof this.props.icon !== 'undefined'
                    ? this.props.icon
                    : this.model.icon
                }
                style={
                  this.props.isShowDoubleButton
                    ? styles.iconImg
                    : this.isActive(containers.icon)
                }
              />
            )}
            {typeof this.model.title !== 'undefined' && (
              <Text style={[this.isActive(containers.text), this.model.disabled ? styles.defaultDisableBtn_text : {}]}>
                {this.model.title}
              </Text>
            )}
            {typeof this.model.iconDouble !== 'undefined' && (
              <Image
                source={
                  typeof this.props.iconDouble !== 'undefined'
                    ? this.props.iconDouble
                    : this.model.iconDouble
                }
                style={
                  this.props.isShowDoubleButton
                    ? styles.doubleImg
                    : this.isActive(containers.icon)
                }
              />
            )}
            {typeof this.model.titleDouble !== 'undefined' && (
              <Text style={this.isActive(containers.text)}>
                {this.model.titleDouble}
              </Text>
            )}
          </TouchableOpacity>
        );
      } else {
        return (
          <Animated.View style={[{transform: [{scale}]}]}>
            <TouchableOpacity
              disabled={this.model.disabled}
              onPressIn={this.model.disabledAnimation ? () => {} : onPressIn}
              onPressOut={this.model.disabledAnimation ? () => {} : onPressOut}
              activeOpacity={
                this.model.disabledAnimation ? this.model.activeOpacity : 1
              }
              style={[
                {
                  backgroundColor: this.model.backgroundColor
                    ? this.model.backgroundColor
                    : null,
                },
                this.props.textStyle === true
                  ? styles.btnDrop
                  : this.isActive(containers.container),
                this.model.disabled ? styles.defaultDisableBtn : {}
              ]}
              onPress={this.model.onPress}>
              {this.model.preloader && (
                <View
                  style={[
                    {
                      zIndex: 99,
                      position: 'absolute',
                      alignSelf: 'center',
                      // right: hp(15),
                      // top: '50%',
                    },
                  ]}>
                  <ActivityIndicator
                    size="large"
                    color={this.model.colorPreloader}
                  />
                </View>
              )}
              <View style={this.isActive(containers.counterStyle)}>
                <CounterView
                  model={this.model.counterModel}
                  key={this.model.counterModel.id}
                  id={`${
                    this.model.counterModel.id
                  }_${navigator().getCurrentScreen()}_button`}
                />
              </View>
              {this.model.showPoint && (
                <View style={this.isActive(containers.point)} />
              )}
              {typeof this.model.icon !== 'undefined' && (
                <Image
                  source={
                    typeof this.props.icon !== 'undefined'
                      ? this.props.icon
                      : this.model.icon
                  }
                  style={this.isActive(containers.icon)}
                />
              )}
              {typeof this.model.title !== 'undefined' && (
                <Text
                  style={[
                    (this.props.textStyle === true
                      ? styles.textDrop
                      : this.isActive(containers.text)),
                    this.model.disabled ? styles.defaultDisableBtn_text : {},
                    this.model.textColor ? {color:this.model.textColor} : {}
                  ]}
                  numberOfLines={2}>
                  {this.model.title}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      }
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={this.model.activeOpacity}
            style={this.isActive(containers.container)}
            onPress={this.model.onPress}>
            {typeof this.model.icon !== 'undefined' && (
              <Image
                source={
                  typeof this.props.icon !== 'undefined'
                    ? this.props.icon
                    : this.model.icon
                }
                style={this.isActive(containers.icon)}
              />
            )}
          </TouchableOpacity>
          <Text style={this.isActive(containers.text)}>{this.model.title}</Text>
        </View>
      );
    }
  }
}

export {ButtonView};

const styles = StyleSheet.create({})
