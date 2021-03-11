import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {mockupHeightToDP as hp} from '../../../constants/Dimensions';
import {TypedBaseComponent} from '../../../Common/BaseComponent';
import {AvoidScrollModel} from '../../../Models/Components/AvoidScrollModel/AvoidScrollModel';

class AvoidScrollModelView extends TypedBaseComponent<AvoidScrollModel> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount()
    Keyboard.addListener('keyboardDidShow', this.model.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.model.keyboardDidHide);
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    Keyboard.removeListener('keyboardDidShow', this.model.keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this.model.keyboardDidHide);
  }

  render() {
    super.render();
    const scrollEnabled = this.model.scrollEnabled
    // const scrollEnabled = false
    // console.log('scrollEnabled', this.model.scrollEnabled);
    return (
      <View
        style={[
          styles.container,
          {maxHeight: this.model.maxHeight},
          this.model.isFlex ? {flex: 1} : {},
          this.props.styles,
        ]}>
            {/*<View style={this.model.scrollEnabled?{}:styles.scrollDisable}/>*/}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.scroll}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={5}
              onScroll={this.model.onScroll}
            >
                  {this.props.children}
            </ScrollView>
      </View>
    );
  }
}

export {AvoidScrollModelView};

const styles = StyleSheet.create({
  container: {
    maxHeight: '100%',
    // backgroundColor: 'red'
  },
  scrollDisable: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 999999,
      backgroundColor: 'red'
  },
  scroll: {
    marginBottom: hp(10),
  },
});
