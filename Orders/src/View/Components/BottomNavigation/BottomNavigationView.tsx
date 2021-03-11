import {
  IBaseProps,
  MultiTypedBaseComponent,
} from '../../../Common/BaseComponent';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {IconButtonView} from '../IconButtonView';
import React from 'react';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {COLORS} from '../../../constants/colors';
import {currentUser} from '../../../Core/CurrentUser';
import {BottomNavigationModel} from "../../../Model/navigation/BottomNavigation/BottomNavigationModel";
class BottomNavigationView extends MultiTypedBaseComponent<
  BottomNavigationModel
> {
  constructor(props: IBaseProps<BottomNavigationModel>) {
    super(props);
  }

  render() {
    super.render();
    if (this.model.hidden) {
      return null;
    }
    return (
      <SafeAreaView style={styles.containerWrapper}>
        <View style={styles.container}>
          <View style={styles.containerIcon}>

            <IconButtonView
              model={this.model.btn2}
              key={this.childId(this.model.btn2)}
              id={this.childId(this.model.btn2)}
            />
            <IconButtonView
              model={this.model.btn3}
              key={this.childId(this.model.btn3)}
              id={this.childId(this.model.btn3)}
            />
            <IconButtonView
              model={this.model.btn4}
              key={this.childId(this.model.btn4)}
              id={this.childId(this.model.btn4)}
            />
            <IconButtonView
              model={this.model.btn5}
              key={this.childId(this.model.btn5)}
              id={this.childId(this.model.btn5)}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export {BottomNavigationView};

export const styles = StyleSheet.create({
  containerWrapper: {},
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(90),
    backgroundColor: COLORS.FONT_WHITE,
    borderTopLeftRadius: hp(50),
    borderTopRightRadius: hp(50),
    justifyContent: 'center',
    zIndex: 32,
    paddingVertical: hp(20),
    paddingHorizontal: wp(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  containerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position:'relative'
  },
  iconBottomNavigation: {
    height: hp(30),
    width: wp(30),
    resizeMode: 'contain',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(56),
    height: hp(56),
  },
  activeButton: {
    backgroundColor: COLORS.FONT_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(56),
    height: hp(56),
    borderRadius: hp(56 / 2),
  },
  newMessages: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: COLORS.FONT_WHITE,
    width: hp(28),
    height: hp(28),
    borderRadius: hp(28 / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbersMessages: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.87)',
    fontSize: hp(14),
  },
});
