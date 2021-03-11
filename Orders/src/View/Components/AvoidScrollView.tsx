import React from 'react';
import {Dimensions, Keyboard, StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';

import {currentUser} from "../../Core/CurrentUser";

class AvoidScrollView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHeight: props.initialMaxHeight ? props.initialMaxHeight :'100%',
      isFlex:true,
      keyboardHeight: null,
      normalHeight: null,
      shortHeight: null,
    }
  }
  componentDidMount(){
    Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
  }
  componentWillUnmount(){
    Keyboard.removeListener("keyboardDidShow", this._keyboardDidShow);
    Keyboard.removeListener("keyboardDidHide", this._keyboardDidHide);
  }
  // _keyboardDidShow = (e) => {
  //   navigator().keyboardHeight = navigator().deviceHeight - e.endCoordinates.height
  // }
  _keyboardDidShow = (e) => {
    const mistake = currentUser().mistakeHeight!==null && currentUser().mistakeHeight > 70 ? currentUser().mistakeHeight/2 : 0;
    this.setState({
      maxHeight: Dimensions.get('window').height - e.endCoordinates.height - (this.props.minusMaxHeight ? this.props.minusMaxHeight : 130) - mistake,
      isFlex:false
    })
  };

  _keyboardDidHide = () => {
    this.setState({
      maxHeight: this.props.initialMaxHeight ? this.props.initialMaxHeight :'100%',
      isFlex:true
    })
  }
  render() {
    return (
      <View
        style={[styles.container, {maxHeight: this.state.maxHeight}, this.state.isFlex ? {flex:1} : {}, this.props.styles]}
        onLayout={(e)=>{
            // console.log('layout', e.nativeEvent.layout.height)
        }}
      >
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.scroll} showsVerticalScrollIndicator={false}>
            {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

export {AvoidScrollView};

const styles = StyleSheet.create({
    container: {
        maxHeight: '100%',
        // backgroundColor: 'red'
    },
    scroll: {
        marginBottom: hp(10),
    }
})
