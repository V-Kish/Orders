import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {COLORS} from '../../../constants/colors';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { ICONS } from '../../../constants/icons';
import {STYLES} from '../../../constants/styles';
import { RemovableItem } from '../../../Models/Components/RemovableList/RemovableItem';
import {FormTextBoxView} from '../FormTextBoxView';

class RemovableItemView extends TypedBaseComponent<RemovableItem> {
  constructor(props: any) {
    super(props);
  }
  render() {
    super.render();
    const containerStyle = this.model.style ? styles[`${this.model.style}_container`] : styles.container
    const containerBlockStyle = this.model.style ? styles[`${this.model.style}_containerBlock`] : styles.containerBlock
    const titleStyle = this.model.style ? styles[`${this.model.style}_title`] : styles.title
    const formBoxStyle = this.model.style ? styles[`${this.model.style}_formBox`] : styles.formBox
    const removeButtonStyle = this.model.style ? styles[`${this.model.style}_removeButtonBlock`] : styles.removeButtonBlock
    return (
      <View style={containerStyle}>
          <View style={containerBlockStyle}>
            <Text style={titleStyle}>{this.model.title}</Text>
            <View style={formBoxStyle}>
                <FormTextBoxView
                    model={this.model.formBoxInput}
                    key={this.model.formBoxInput.id}
                />
            </View>
            <View style={removeButtonStyle}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.model.onDeletePress}
                    style={styles.removeButton}
                >
                    <Image source={ICONS.error} style={styles.removeButtonIcon}/>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }
}

export {RemovableItemView};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: hp(5),
    marginVertical: hp(2),
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.BORDER_COLOR_GRAY
  },
  containerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5)
  },
  title: {
      width: '60%',
      paddingHorizontal: wp(5)
  },
  formBox: {
      width: '30%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: wp(5)
    //   paddingTop: hp(20)
    //   backgroundColor: 'red'
  },
  removeButtonBlock: {
      width: '10%',
      alignItems: 'center'
  },
  removeButton: {

  },
  removeButtonIcon: {
    width: wp(20),
    height: wp(20)
  },
  questionList_container: {
    backgroundColor: 'white',
    paddingVertical: hp(5),
    marginVertical: hp(2),
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.BORDER_COLOR_GRAY,
    width: '100%',
    justifyContent: 'center'
  },
  questionList_containerBlock: {
    flexDirection: 'row',
    // width: '100%'
  },
  questionList_title: {

  },
  questionList_formBox: {
    width: '90%'
  },
  questionList_removeButtonBlock: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
