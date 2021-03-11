import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {AboutProgramOSBBModel} from '../../Models/AboutProgramOSBBModel/AboutProgramOSBBModel';
import {ButtonView} from '../Components/ButtonView';
import {COLORS} from "../../constants/colors";

class AboutProgramOSBBView extends TypedBaseComponent<AboutProgramOSBBModel> {
  constructor(props: any) {
    super(props);
  }
  // @ts-ignore
  render() {
    super.render();
    return (
      <View style={styles.container}>
        <View style={styles.wrapVersionText}>
          <Text style={styles.versionText}>Версія програми: 1.3.13</Text>
        </View>
        <ButtonView
          model={this.model.privacyPolicy}
          key={this.childId(this.model.privacyPolicy)}
          id={this.childId(this.model.privacyPolicy)}
        />
      </View>
    );
  }
}

export {AboutProgramOSBBView};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:wp(15),
    marginTop:hp(20)
  },
  wrapVersionText:{
    marginBottom:hp(20)
  },
  versionText:{
    fontFamily: 'Roboto-Regular',
    fontSize: hp(16),
    color: COLORS.FONT_BLACK,
  }
});
