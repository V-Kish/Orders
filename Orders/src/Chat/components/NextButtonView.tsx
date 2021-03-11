import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { mockupWidthToDP as wp } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { TypedBaseComponent} from '../../Common/BaseComponent';
import { NextButton } from '../provider/Contacts/NextButton';
import {ICONS} from "../../constants/icons";

class NextButtonView extends TypedBaseComponent<NextButton> {
    constructor(props) {
        super(props);
    }
    render() {
        super.render();
        if (this.props.step === 1) {
            return (
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.model.onPress.bind(this.props.model)}
                    >
                        <Image
                            // source={require('../assets/img/Icons/arrow-right-white/arrow-right-white.png')}
                            source={ICONS.close}
                            style={styles.buttonImg}
                        />
                    </TouchableOpacity>
                </View>
            );
        } else if (this.props.step === 2) {
            return (
                <View>
                    <TouchableOpacity
                        style={styles.buttonOrange}
                        onPress={this.model.onPress.bind(this.props.model)}
                    >
                        <Image
                            // source={require('../assets/img/Icons/checked/Shape.png')}
                            source={ICONS.close}
                            style={styles.buttonImg}
                        />
                    </TouchableOpacity>
                </View>
            );
        } else if (this.props.step === 3) {
            return (
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.model.onPress.bind(this.props.model)}>
                        <Image
                            // source={require('../assets/img/Icons/checked/Shape.png')}
                            source={ICONS.close}
                            style={styles.buttonImg}
                        />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableOpacity
                        style={styles.buttonOrange}
                        onPress={this.model.onPress.bind(this.props.model)}>
                        <Image
                            // source={require('../assets/img/Icons/close/closeWhite/Shape.png')}
                            source={ICONS.close}
                            style={styles.buttonImg}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export { NextButtonView };

const styles = StyleSheet.create({
  button: {
    width: wp(60),
    height: wp(60),
    backgroundColor: COLORS.FONT_BLACK,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOrange: {
    width: wp(60),
    height: wp(60),
    backgroundColor: COLORS.FONT_BLACK,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImg: {
    width: wp(21),
    resizeMode: 'contain',
  },
});
