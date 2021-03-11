import React from 'react';
import {Text, View} from 'react-native';
import {STYLES} from '../../../constants/styles';

class HeaderText extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={STYLES.robotoBigTitle}>Реєстрація ОСББ</Text>
        <Text
          style={[
            STYLES.smallMarginVertical,
            STYLES.robotoMiddle,
            {color: 'red'},
          ]}>
          Для реєстрації нового ОСББ,{'\r\n'}
          будь ласка, заповніть форму нижче
        </Text>
      </View>
    );
  }
}

export {HeaderText};
