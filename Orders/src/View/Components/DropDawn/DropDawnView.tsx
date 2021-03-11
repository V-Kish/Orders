import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {IBaseProps, TypedBaseComponent} from '../../../Common/BaseComponent';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {COLORS} from '../../../constants/colors';
import {ICONS} from '../../../constants/icons';
import { DropDawnModel } from '../../../Model/Components/DropDawn/DropDawnModel';

enum containersButton {
  container,
  button,
  icon,
  text,
  placeholder,
  titleText,
}
enum containersModal {
  containerHeader,
  titleHeader,
  titleBack,
}
class DropDawnView extends TypedBaseComponent<DropDawnModel> {
  constructor(props: IBaseProps<DropDawnModel>) {
    super(props);
  }
  styles(value: containersButton) {
    switch (value) {
      case containersButton.container:
        return styles[`${this.model.style}_container`];
      case containersButton.button:
        return styles[`${this.model.style}_button`];
      case containersButton.icon:
        return styles[`${this.model.style}_icon`];
      case containersButton.text:
        return styles[`${this.model.style}_text`];
      case containersButton.titleText:
        return styles[`${this.model.style}_titleText`];
      case containersButton.placeholder:
        return styles[`${this.model.style}_placeholder`];
    }
  }
  stylesModal(value: containersModal) {
    switch (value) {
      case containersModal.containerHeader:
        return styles[`${this.model.style}_containerModalHeader`];
      case containersModal.titleBack:
        return styles[`${this.model.style}_titleBack`];
      case containersModal.titleHeader:
        return styles[`${this.model.style}_titleHeader`];
    }
  }
  render() {
    super.render();
    return (
      <>
        {/*// DropDawn Modal */}
        <Modal
          animationType={'slide'}
          onRequestClose={this.model.onHideDropDawnModal}
          visible={this.model.isShowDropDawnModal}>
          <View style={this.stylesModal(containersModal.containerHeader)}>
            <View style={styles.containerBackArrow}>
              <TouchableOpacity
                onPress={this.model.onHideDropDawnModal}
                style={styles.backPressStyles}>
                <Image
                  source={ICONS.arrowLeftBlue}
                  style={styles.defImageModal}
                />
                <Text style={this.stylesModal(containersModal.titleBack)}>
                  Назад
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.defaultStylesHeaderText}>
              <Text style={this.stylesModal(containersModal.titleHeader)}>
                {this.model.modalHeaderText}
              </Text>
            </View>
          </View>
        </Modal>
        {/*// DropDawn button */}
        <View style={this.styles(containersButton.container)}>
          <TouchableOpacity
            style={this.styles(containersButton.button)}
            onPress={this.model.onShowDropDawnModal}>
            <View style={styles.containerText}>
              {/*// Title text */}
              {this.model.titleText && (
                <Text style={this.styles(containersButton.titleText)}>
                  {this.model.titleText}
                </Text>
              )}
              {/*// placeholder */}
              {this.model.placeholder &&
                this.model.selectedItems.length === 0 && (
                  <Text style={this.styles(containersButton.placeholder)}>
                    {this.model.placeholder}
                  </Text>
                )}
              {/*// text */}
              {this.model.text && (
                <Text style={this.styles(containersButton.text)}>
                  {this.model.text}
                </Text>
              )}
            </View>
            {/*// icon */}
            {this.model.icon && (
              <Image
                style={this.styles(containersButton.icon)}
                source={this.model.icon}
              />
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export {DropDawnView};
const styles = StyleSheet.create({
  defaultStyles_container: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: wp(10),
    paddingVertical: wp(10),
    minHeight: hp(70),
    justifyContent: 'center',
  },
  defaultStyles_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerText: {
    width: '85%',
    justifyContent: 'center',
  },
  defaultStyles_icon: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  defaultStyles_text: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(18),
    color: COLORS.FONT_BLACK,
    width: '85%',
  },
  defaultStyles_titleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(14),
    color: 'red',
  },
  defaultStyles_placeholder: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp(20),
    color: COLORS.FONT_BLACK,
    width: '85%',
  },
  // default styles Modal
  defaultStyles_containerModalHeader: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: hp(75),
    paddingHorizontal: wp(15),
  },
  defaultStylesHeaderText: {
    justifyContent: 'center',
    width: '70%',
  },
  backPressStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  defImageModal: {
    resizeMode: 'contain',
    width: hp(25),
    height: hp(25),
  },
  containerBackArrow: {
    justifyContent: 'center',
    width: '30%',
    height: '100%',
  },
  defaultStyles_titleBack: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp(20),
    color: 'red',
    marginLeft: wp(5),
  },
  defaultStyles_titleHeader: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(26),
    color: COLORS.FONT_BLACK,
  },
});
