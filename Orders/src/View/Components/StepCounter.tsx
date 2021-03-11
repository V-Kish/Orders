import React from 'react';
import {View} from 'react-native';
import {STYLES} from '../../constants/styles';

class StepCounter extends React.Component {
  private _listSteps: [];
  constructor(props) {
    super(props);
    this._listSteps = [];
  }
  render() {
    let i = 0;
    for (this.props.propsSteps; this.props.propsSteps >= i; i++) {
      this._listSteps.push(i);
    }
    return (
      <View style={STYLES.wrapSteps}>
        {this._listSteps.length > 0 &&
          this._listSteps.map((item, index) => {
            if (this.props.propsSteps <= index) {
              return;
            }
            return (
              <View
                key={index}
                style={
                  this.props.count >= index
                    ? STYLES.activeCircle
                    : STYLES.disabledCircle
                }
              />
            );
          })}
      </View>
    );
  }
}

export {StepCounter};
