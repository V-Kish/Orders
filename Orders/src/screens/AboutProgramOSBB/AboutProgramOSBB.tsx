import React from 'react';
import {BaseScreen} from '../../Common/BaseScreen';
import {STYLES} from '../../constants/styles';
import {View,Text} from 'react-native';

class AboutProgramOSBB extends BaseScreen {
  constructor(props: React.Props<any>) {
    super(props);
  }

  get screenName() {
    return 'AboutProgramOSBB';
  }

  get swipeEnabled() {
    return true;
  }

  content() {
    return (
      <View style={STYLES.screen}>
        <Text>Hello AboutProgramOSBB Screen</Text>
      </View>
    );
  }
}

export {AboutProgramOSBB};
