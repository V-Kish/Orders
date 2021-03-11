import React from 'react';
import {StyleSheet, View, Switch, Text} from 'react-native';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {COLORS} from '../../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {SwitchButtonModel} from "../../../Model/Components/SwitchButtonModel/SwitchButtonModel";

class SwitchButtonView extends TypedBaseComponent<SwitchButtonModel> {
  constructor(props: any) {
    super(props);
  }

  render() {
    super.render();
    return (
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={[styles.text, this.model.style !== undefined ? styles[`${this.model.style}_text`]: {}]}>{this.model.text}</Text>
        </View>
        <View style={styles.containerSwitcher}>
          <Switch
            thumbColor={
              this.model.stateSwitch ? COLORS.FONT_YELLOW : COLORS.FONT_WHITE
            }
            trackColor={{
              false: 'red',
              true: 'red',
            }}
            style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
            value={this.model.stateSwitch}
            onValueChange={this.model.onValueChange}
          />
        </View>
      </View>
    );
  }
}

export {SwitchButtonView};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(12),
    color: COLORS.FONT_BLACK,
  },
  containerText: {
    width: '75%',
  },
  containerSwitcher: {
    width: '25%',
    marginRight: wp(5),
  },
  settingSwitch_text: {
    fontSize: hp(18),
    fontWeight: '600',
    color: COLORS.FONT_BLACK
    // color: 'red'
  },
});
