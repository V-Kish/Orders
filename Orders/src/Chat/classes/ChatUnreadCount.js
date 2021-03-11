import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mockupHeightToDP as hp } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { BaseComponent } from '../../Common/BaseComponent';

class ChatUnreadCount extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    super.render();
    if (this.props.model.unreadCount > 0) {
      return (
        <View style={styles.unreadCount}>
          <Text style={styles.unreadCountText}>
            {this.props.model.unreadCount > 99
              ? '99+'
              : '+'+this.props.model.unreadCount}
          </Text>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

export default ChatUnreadCount;

const styles = StyleSheet.create({
  unreadCount: {
    // backgroundColor: '#4CB684',
   // backgroundColor: COLORS.COLOR_GRAY_HEADER,
    backgroundColor: COLORS.RED.bg,
    borderRadius: 50,
    width: hp(23),
    height: hp(23),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  unreadCountText: {
    fontSize: hp(11),
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: COLORS.WHITE.bg
    //color: COLORS.DARK_BLUE.bg
    //opacity: 0.5,
    // color: COLORS.FONT_WHITE,
  },
});
