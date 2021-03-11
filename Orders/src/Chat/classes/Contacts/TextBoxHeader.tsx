import React from 'react';
import { StyleSheet,TextInput } from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {TypedBaseComponent} from "../../../Common/BaseComponent";
import {TextBox as TB} from '../../provider/TextBox';
import { COLORS } from '../../../constants/colors';
class TextBoxHeader extends TypedBaseComponent<TB> {
    constructor(props) {
        super(props);
    }
    render() {
        super.render();
        return (
            <TextInput
                ref={(ref) => { this.model.ref = ref; }}
                placeholder={`${this.model.placeholder}`}
                maxLength={35}
                style={styles[`${this.model.style}`]}
                onChangeText={this.model.onChangeText.bind(this.model)}
            />
       );
    }
}

export  {TextBoxHeader};

const styles = StyleSheet.create({
    searchInput: {
        flexDirection: 'row',
        flex: 1,
        // width: '75%',
        height: hp(50),
        alignSelf: 'center',
        backgroundColor: 'red',
        fontSize:hp(14),
        fontFamily:'Roboto-Regular',
        justifyContent:'center',
    },

});
