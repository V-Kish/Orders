import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {FormTextBoxView} from '../FormTextBoxView';
import {FormModel} from '../../../Model/Components/Form/FormModel';

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
            const width = (100 / this.model.colCount) * box.colSpan;
            return (
              <View
                key={`formInputBox_${this.model.id}_${index}`}
                style={{width: `${width}%`}}>
                <FormTextBoxView model={box} key={box.id} />
              </View>
            );
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
    flex: 1,
  },
});
