import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {BaseComponent} from "../../../Common/BaseComponent";
import {CHAT_ICONS, ICONS} from "../../../constants/icons";

class CloseButton extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        super.render();
        return (
            <TouchableOpacity style={styles.passwordIconButton} onPress={this.props.model.onPress.bind(this.props.model)}>
                <Image
                    style={styles.passwordIcon}
                    // source={require('../../assets/img/Icons/close/Close.png')}/>
                    source={CHAT_ICONS.close}/>
            </TouchableOpacity>
        );
    }
}

export  {CloseButton};

const styles = StyleSheet.create({
    btnClose: {
        alignSelf: 'center',
        height: hp(40),
        justifyContent: 'center',
    },
    arrowBack: {
        marginRight: wp(10),
    },
});
