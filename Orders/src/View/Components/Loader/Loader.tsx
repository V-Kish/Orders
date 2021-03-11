import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {COLORS} from '../../../constants/colors';

export enum containers {
  container,
  icon,
  text,
}

class Loader extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerBlock}>
          <ActivityIndicator size="large" color={'red'} />
        </View>
      </View>
    );
  }
}

export {Loader};

const styles = StyleSheet.create({
  container: {},
  containerBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    height: wp(46),
    width: wp(46),
  },
});
