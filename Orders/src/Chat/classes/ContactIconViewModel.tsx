import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { IconHelper } from '../provider/ChatList/HelperIcon';
import { MultiTypedBaseComponent, IBaseProps } from '../../Common/BaseComponent';
import { ContactIcon } from '../provider/ContactIcon';
import { ContactIsOnlineView } from './ContactIsOnlineView';
// import { console } from '../Common/console';

class ContactIconViewModel extends MultiTypedBaseComponent<ContactIcon> {
    constructor(props: IBaseProps<ContactIcon>) {
    super(props);
  }

  renderColorItem() {
    if (this.model === null) {
      return null;
    }
    return (
      <View
        style={[
          this.model.colorScheme,
          !IconHelper.getRenderType(this.props.type)
            ? styles.containerMedium
            : IconHelper.getRenderType(this.props.type)
            ? styles.containerLarge
            : styles.containerSmall,
          IconHelper.iconDiameter(this.props.contactIconDiameter || 50),
        ]}>
        <Text
          style={[
            IconHelper.getRenderType(this.props.type)
              ? styles.nameTextLarge
              : styles.nameTextSmall,
            { color: this.model.colorScheme.color },
          ]}>
          {this.model.firstCharacter}
        </Text>
        {(typeof this.props.hideIsOnline === 'undefined' ||
          !this.props.hideIsOnline) && (
          <ContactIsOnlineView
            model={this.model.isOnline}
            key={`${this.props.id}_IsOnline_${this.model.isOnline.id}`}
            id={`${this.props.id}_IsOnline_${this.model.isOnline.id}`}
          />
        )}
      </View>
    );
  }

  render() {
    super.render();
    if (this.model.hasPhoto) {
      return (
        <>
          <View
            style={
              this.props.type === 'medium'
                ? styles.borderMediumImage
                : styles.borderImage
            }>
            <Image
              source={{
                uri: this.model.photo,
              }}
              style={[
                !IconHelper.getRenderType(this.props.type)
                  ? styles.imgMedium
                  : IconHelper.getRenderType(this.props.type)
                  ? styles.imgLarge
                  : this.groupAdd
                  ? { width: hp(30), height: hp(30), borderRadius: hp(30 / 2) }
                  : styles.imgSmall,
                IconHelper.iconDiameter(this.props.contactIconDiameter || 50),
              ]}
            />

            {(typeof this.props.hideIsOnline === 'undefined' ||
              !this.props.hideIsOnline) && (
              <ContactIsOnlineView
                model={this.model.isOnline}
                key={`${this.props.id}_IsOnline_${this.model.isOnline.id}`}
                id={`${this.props.id}_IsOnline_${this.model.isOnline.id}`}
              />
            )}
          </View>
        </>
      );
    } else {
      return this.renderColorItem();
    }
  }
}

export { ContactIconViewModel };

const styles = StyleSheet.create({
  containerLarge: {
    width: hp(45),
    height: hp(45),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMedium: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSmall: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgb(245,240,240)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgMedium: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
  },
  imgLarge: {
    width: hp(45),
    height: hp(45),
    borderRadius: 50,
  },
  borderMediumImage: {
    width: hp(32),
    height: hp(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgb(245,240,240)',
  },
  borderImage: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgb(245,240,240)',
    borderStyle: 'solid',
  },
  imgPreloader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgSmall: {
    width: hp(14),
    height: hp(14),
    borderRadius: 50,
  },
  unreadCount: {
    backgroundColor: '#4CB684',
    position: 'absolute',
    bottom: wp(0),
    right: wp(-2),
    borderRadius: 50,
    width: hp(13),
    height: hp(13),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.FONT_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCountText: {
    fontSize: hp(10),
    fontFamily: 'Roboto-Bold',
    //opacity: 0.5,
    color: COLORS.FONT_WHITE,
  },
  nameTextLarge: {
    padding: hp(0),
    fontSize: hp(20),
    lineHeight: hp(22),
    textAlignVertical: 'center',
    fontFamily: 'Roboto-Bold',
    textTransform: 'uppercase',
  },
  nameTextSmall: {
    fontSize: hp(11),
    fontFamily: 'Roboto-Light',
    textTransform: 'uppercase',
  },
  containerCloseIcon: {
    position: 'absolute',
    left: -12,
    top: -5,
    width: hp(10),
    height: hp(10),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  closeIcon: {
    resizeMode: 'contain',
    width: hp(10),
    height: hp(10),
  },
  isOnline: {
    backgroundColor: '#4CB684',
    position: 'absolute',
    bottom: wp(0),
    right: wp(0),
    borderRadius: 50,
    width: hp(15),
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
