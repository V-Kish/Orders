import React from 'react';
import { StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {BaseComponent} from "../../../Common/BaseComponent";
import {ICONS} from "../../../constants/icons";

class ArrowBackButton extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        super.render();
        return (
            <TouchableOpacity style={styles.passwordIconButton} onPress={this.props.model.onPress.bind(this.props.model)}>
                <Image
                    style={styles.passwordIcon}
                    // source={require('../../assets/img/Icons/arrow-left-white/arrow-left-white.png')}/>
                    source={ICONS.close}/>
            </TouchableOpacity>
        );
    }
}

export  {ArrowBackButton};

const styles = StyleSheet.create({
    btnClose: {
        alignSelf: 'center',
        height: hp(40),
        justifyContent: 'center',
    },
});
