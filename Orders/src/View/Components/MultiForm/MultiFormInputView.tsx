import React from 'react';
import {Text, Image, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {COLORS} from '../../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {ICONS} from '../../../constants/icons';
import {MultiFormInput} from '../../../Models/Components/MultiForm/MultiFormInput';
import {MultiFormBoxView} from './MultiFormBoxView';

class MultiFormInputView extends TypedBaseComponent<MultiFormInput> {
  constructor(props: any) {
    super(props);
  }
  render() {
    super.render();
    return (
      <View style={styles.container}>
          <TextInput
            ref={(input) => (this.model.hiddenInputRef = input)}
            onChangeText={this.model.onTypeListener}
            maxLength={this.model.formBoxes.length}
            caretHidden={true}
            style={styles.hiddenContainer}
            keyboardType="numeric"
            value={this.model.value}
            editable={this.model.editable}
          />
        <View style={styles.multiBoxes}>
          {this.model.formBoxes &&
            this.model.formBoxes.map((box) => {
              return <MultiFormBoxView model={box} key={box.id} />;
            })}
        </View>
      </View>
    );
  }
}

export {MultiFormInputView};

const styles = StyleSheet.create({
  container: {
    // marginVertical: wp(40),
  },
  multiBoxes: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 999
  },
  hiddenContainer: {
     opacity: 0,
    zIndex: 99999,
    width: '100%',
    height: '100%',
     position: 'absolute',
  },
});
