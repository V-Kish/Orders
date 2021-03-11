import React from 'react';
import {IBaseProps, TypedBaseComponent} from '../../../Common/BaseComponent';

import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ChatTextBoxView} from './ChatTextBoxView';
import {ChatInput} from '../../../Model/Components/ChatInput/ChatInput';

export class ChatInputView extends TypedBaseComponent<ChatInput> {
  constructor(props: IBaseProps<ChatInput>) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    Keyboard.addListener('keyboardDidShow', this.model.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.model.keyboardDidHide);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    Keyboard.removeListener('keyboardDidShow', this.model.keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this.model.keyboardDidHide);
  }

  render() {
    super.render();
    return (
      <SafeAreaView style={{height: '100%', width: '100%'}}>
        <Button
          title={'dismissKeyboard'}
          onPress={() => {
            Keyboard.dismiss();
          }}
        />
        <Button title={'showEmoji'} onPress={this.model.changeEmojiStatus} />
        <Text>showEmoji: {this.model.showEmoji ? 'true' : 'false'}</Text>
        <View style={[styles.container, {bottom: this.model.bottom}]}>
          <ChatTextBoxView
            model={this.model.textBox}
            key={this.model.textBox.id}
          />
        </View>
        <View style={[styles.emojiBox, {height: this.model.emojiHeight}]}>
          <Text>Emoji</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // height: '100%',
    width: '100%',
  },
  emojiBox: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
  },
});
