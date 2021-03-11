import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { mockupHeightToDP as hp } from '../../constants/Dimensions';
import { BaseComponent } from '../../Common/BaseComponent';
import {CHAT_ICONS, ICONS} from "../../constants/icons";

class ChatName extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    super.render();
    return (
      <View style={styles.wrapIcon}>
        <Text numberOfLines={1} style={styles.chatName}>
          {this.props.model.name}
        </Text>
      </View>
    );
  }
}

export default ChatName;

const styles = StyleSheet.create({
  chatName: {
    fontSize: hp(16),
    // lineHeight: hp(14),
    fontFamily: 'Roboto-Medium',
    paddingVertical: hp(1)
    // flex: 1,
    // fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  wrapIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
