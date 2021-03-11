import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {COLORS} from '../../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {STYLES} from '../../../constants/styles';
import {FormModel} from '../../../Models/Components/Form/FormModel';
import {FormTextBoxView} from '../FormTextBoxView';

class FormView extends TypedBaseComponent<FormModel> {
  constructor(props: any) {
    super(props);
  }
  render() {
    super.render();
    return (
      <View style={styles.container}>
        {this.model.formInputBoxes &&
          this.model.formInputBoxes.map((box, index) => {
            const width = 100/this.model.colCount*box.colSpan
            return <View key={`formInputBox_${this.model.id}_${index}`} style={{width: `${width}%`}}>
                <FormTextBoxView model={box} key={box.id} />
            </View>;
          })}
      </View>
    );
  }
}

export {FormView};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //   justifyContent: 'flex-start',
    // backgroundColor: 'red'
    flex: 1,
  },
});
