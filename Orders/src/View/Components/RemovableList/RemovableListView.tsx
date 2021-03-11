import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import { RemovableItemView } from './RemovableItemView';
import {RemovableList} from "../../../Model/Components/RemovableList/RemovableList";

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
