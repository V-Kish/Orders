import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IBaseProps, TypedBaseComponent} from '../../Common/BaseComponent';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {COLORS} from '../../constants/colors';
import {ChatInput} from "../../Model/Components/ChatInput";
import {ICONS} from "../../constants/icons";

class ChatInputView extends TypedBaseComponent<ChatInput> {
  constructor(props: IBaseProps<ChatInput>) {
    super(props);
  }

  // @ts-ignore
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <View style={styles.inputContainer}>
            {/*<View style={styles.emojiIconBox}>*/}
            {/*<Image source={DETAIL_ICONS.emojiBtn} style={styles.emojiIcon}/>*/}
            {/*</View>*/}
            <View style={styles.textInputBox}>
              <TextInput
                placeholder="Ваше повідомлення"
                style={styles.textInput}
                value={this.model.value}
                onChangeText={this.model.onChangeText}
              />
            </View>
            <View style={styles.sendMessageBtnBox}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.sendMessageTouch}
                onPress={this.model.onSendMessagePress}>
                <Image
                  source={ICONS.errorScreenLogo}
                  style={styles.sendMessageBtn}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export {ChatInputView};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hp(5),
    backgroundColor: 'red',
    height: hp(55),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    position: 'absolute',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: hp(45),
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingHorizontal: hp(10),
  },
  textInputBox: {
    width: '90%',
  },
  textInput: {
    paddingVertical: hp(10),
  },
  emojiIconBox: {
    width: '10%',
    alignItems: 'flex-start',
  },
  sendMessageBtnBox: {
    width: '10%',
    alignItems: 'flex-end',
  },
  emojiIcon: {
    width: wp(15),
    height: wp(15),
  },
  sendMessageBtn: {
    width: wp(20),
    height: wp(20),
  },
});
