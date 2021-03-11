import React from 'react';
import {StyleSheet, View } from 'react-native';
import {IBaseProps, TypedBaseComponent} from '../../../Common/BaseComponent';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {ButtonView} from "../ButtonView";
import { FilterModalModel } from '../../../Model/Components/FilterModal/FilterModalModel';

class FilterModalView extends TypedBaseComponent<FilterModalModel> {
  constructor(props: IBaseProps<FilterModalModel>) {
    super(props);
  }

  render() {
    if (this.props.children === null) {
      return null;
    }
    return (
      <View style={this.model.isVisible ? styles.container : styles.hidden}>
        <View style={styles.containerBox}>{this.props.children}</View>
        {this.model.withBtns && <View>
          <View style={styles.grayLine}/>
            <View style={styles.rowButtons}>
            <ButtonView model={this.model.lastFiltersBtn} key={this.childId(this.model.lastFiltersBtn)} id={this.childId(this.model.lastFiltersBtn)} />
            <ButtonView model={this.model.doneFilterBtn} key={this.childId(this.model.doneFilterBtn)} id={this.childId(this.model.doneFilterBtn)} />
          </View>
        </View>}
      </View>
    );
  }
}

export {FilterModalView};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 99999999,
    backgroundColor: 'white',
  },
  hidden: {
    height: 0,
    width: 0,
    overflow: 'hidden',
  },
  containerBox: {
    // flex: 1,
    backgroundColor: 'white',
  },
  defaultPointStyles: {},
  redPointLeft: {
      position:'absolute',
      backgroundColor:'red',
      height:12,
      width:12,
      zIndex:999999999
  },
  grayLine: {
    height: hp(1),
    width: '100%',
    backgroundColor: 'red'
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(10),
    paddingHorizontal: wp(15),
  },
});
