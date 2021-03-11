import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {ScreenStep} from '../../../Models/Components/Step/ScreenStep';

class ScreenStepView extends TypedBaseComponent<ScreenStep> {
  constructor(props: any) {
    super(props);
  }
  render() {
    super.render();
    if (!this.model.isVisible) {
      return null;
    }
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

export {ScreenStepView};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
