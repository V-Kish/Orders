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
import { RemovableList } from '../../../Models/Components/RemovableList/RemovableList';
import {FormTextBoxView} from '../FormTextBoxView';
import { RemovableItemView } from './RemovableItemView';

class RemovableListView extends TypedBaseComponent<RemovableList> {
  constructor(props: any) {
    super(props);
  }
  render() {
    super.render();
    return (
      <View style={styles.container}>
        {this.model.removableList &&
          this.model.removableList.map((box, index) => {
            return <RemovableItemView
              model={box} key={box.id}
            />
          })}
      </View>
    );
  }
}

export {RemovableListView};

const styles = StyleSheet.create({
  container: {
  },
});
