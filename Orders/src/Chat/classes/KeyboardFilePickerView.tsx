import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {TypedBaseComponent} from "../../Common/BaseComponent";
import {KeyboardFilePicker} from "../provider/KeyboardFilePicker";
import {ButtonView} from '../../View/Components/ButtonView'
import {IconButtonView} from "../../View/Components/IconButtonView";
import {COLORS} from '../../constants/colors'
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';


class KeyboardFilePickerView extends TypedBaseComponent<KeyboardFilePicker>{
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        if(this.model.hidden){
            return null;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.textWhatNeedToDo}>Що потрібно зробити ?</Text>
                <View>
                    <ButtonView model={this.model.fileButton} key={this.model.fileButton.id}/>
                </View>
                <View>
                    <ButtonView model={this.model.photoButton} key={this.model.photoButton.id}/>
                </View>
                <IconButtonView model={this.model.closeButton} key={this.model.closeButton.id}/>
            </View>
        )
    }
}

export {KeyboardFilePickerView};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        paddingLeft: wp(16),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        paddingBottom: hp(20),
        height: hp(140),
    },
    textWhatNeedToDo: {
        fontFamily: 'Roboto-Light',
        color: COLORS.FONT_BLACK,
        marginTop: hp(15),
    },
    closeButton: {
        width: wp(20),
        height: wp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(20 / 2),
        position: 'absolute',
        zIndex: 1,
        right: wp(10),
        top: wp(10),
        backgroundColor: '#4B6F7B',
    },
});
