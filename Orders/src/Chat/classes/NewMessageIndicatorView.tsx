import * as React from 'react';
import { Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import {TypedBaseComponent} from "../../Common/BaseComponent";
import {NewMessageIndicator} from "../provider/Messages/NewMessageIndicator";

export class NewMessageIndicatorView extends TypedBaseComponent<NewMessageIndicator> {
    constructor(props) {
        super(props);
    }

    render(){
        super.render();
        if(this.model.counter === 0) {
            return null;
        }
        return (
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={this.model.onPress}>
                    <Text style={styles.textColor}>{this.model.counter}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalButton: {
        width: wp(45),
        height: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(50 / 2),
        backgroundColor: 'rgba(76, 182, 132, 0.5)',
    },
    button: {
        position: 'absolute',
        right: wp(20),
        bottom: hp(20),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        zIndex: 1
    },
    text: {
        fontSize: hp(18),
        color: COLORS.WHITE.bg,
        fontFamily: 'Roboto-Medium',
    },
    img:{
        resizeMode:'contain',
        width:hp(26),
        height:hp(26),
    },
    textColor:{
        color:'white',
        fontSize: hp(16),
        fontFamily:'Roboto-Regular'
    }
});
