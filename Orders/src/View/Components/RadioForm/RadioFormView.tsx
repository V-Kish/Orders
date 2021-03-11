import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  MultiTypedBaseComponent,
  IBaseProps,
} from '../../../Common/BaseComponent';
import {RadioInputView} from './RadioInputView';
import { RadioForm } from '../../../Model/Components/RadioForm/RadioForm';

class RadioFormView extends MultiTypedBaseComponent<RadioForm> {
  constructor(props: IBaseProps<RadioForm>) {
    super(props);
  }
  render() {
    super.render();

    return (
      <View style={styles.container}>
        <View style={styles.radioForm}>
          {this.model.radioForm &&
            this.model.radioForm.map((input) => {
              if (!this.model.isVisible) {
                return null;
              }
              return (
                    <RadioInputView
                        model={input}
                        key={this.childId(input)}
                        id={this.childId(input)}
                    />
              );
            })}
        </View>
      </View>
    );
  }
}

export {RadioFormView};

const styles = StyleSheet.create({
  container: {
    // marginVertical: wp(40),
  },
  radioForm: {},

});
