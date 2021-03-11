import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {IBaseProps, TypedBaseComponent} from '../../../Common/BaseComponent';
import {mockupWidthToDP as wp} from '../../../constants/Dimensions';
import {VisualScaleModel} from "../../../Model/Components/VisualScale/VisualScaleModel";

class VisualScaleView extends TypedBaseComponent<VisualScaleModel> {
  constructor(props: IBaseProps<VisualScaleView>) {
    super(props);
  }

  render() {
    super.render();
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.scale,
            {backgroundColor: this.model.color, width: wp(this.model.percent)},
          ]}
        />
        <View>
          <Text>{this.model.percent}</Text>
        </View>
      </View>
    );
  }
}

export {VisualScaleView};

const styles = StyleSheet.create({
  container: {
    marginVertical: wp(5),
  },
  scale: {
    height: wp(2),
  },
});
