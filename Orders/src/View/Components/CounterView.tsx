import React from 'react';
import {Text, View} from 'react-native';
import {MultiTypedBaseComponent, IBaseProps} from '../../Common/BaseComponent';
import {STYLES} from '../../constants/styles';
import {CounterModel} from "../../Model/CounterModel";
class CounterView extends MultiTypedBaseComponent<CounterModel> {
    constructor(props: IBaseProps<CounterModel>) {
    super(props);
  }
  render() {
    super.render();
    if (this.model.counter <= 0) {
      return <></>;
    }
    return (
      <View style={this.props.styleContainer ? this.props.styleContainer : STYLES.counter}>
        <Text style={STYLES.textCounter}>{this.model.counter}</Text>
      </View>
    );
  }
}

export {CounterView};
