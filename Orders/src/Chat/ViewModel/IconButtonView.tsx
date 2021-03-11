import * as React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { TypedBaseComponent } from "../../Common/BaseComponent";
import { IconButton } from "../provider/IconButton";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';


class IconButtonView extends TypedBaseComponent<IconButton> {
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        if(this.model.hidden){
            return  null;
        }
        return (
            <TouchableOpacity
                style={styles[this.model.style] ? styles[this.model.style] : null}
                onPress={this.model.onPress.bind(this.model)}>
                {typeof this.model.icon !== 'undefined' &&(
                    <Image
                        style={styles[`${this.model.style}_image`] ? styles[`${this.model.style}_image`] : null}
                        source={this.model.icon}
                    />
                )}
                {this.model.text === undefined ?
                  null
                        :
                        <Text style={styles[`${this.model.style}_text`]}>{this.model.text}</Text>
                }
            </TouchableOpacity>
        );
    }
}

export { IconButtonView };

const styles = StyleSheet.create({
    /*MessageMenu: Edit*/
    btnIconEdit: {
        marginRight: hp(25),
        width: hp(25),
    },
    btnIconEdit_image: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
    /*MessageMenu: Resend*/
    btnRight: {
        marginRight: hp(25),
    },
    btnRight_image: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
    /*MessageMenu: Close*/
    imageArrowClose: {
    },
    imageArrowClose_image: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },

    /*MessageMenu: Delete*/
    iconCopy: {
    },
    iconCopy_image: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },

    /**/
    btnClose: {
        width: hp(42),
        height: hp(22),
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnClose_image: {
        resizeMode: 'contain',
        width: hp(20),
        height: hp(20),
    },
    //
    keyboardButton: {
        paddingHorizontal: hp(10),
        paddingVertical: wp(10),
        //  backgroundColor:'red',
        borderRadius: 1,
        borderColor:"green",
    },
    keyboardButton_image: {
        width: wp(22),
        height: hp(22),
        resizeMode: 'contain',
    },
    //
    pickerCloseButton: {
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
    //
    previewCloseButton: {
        width: wp(20),
        height: wp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(20 / 2),
        position: 'absolute',
        zIndex: 1,
        right: wp(4),
        top: hp(1),
        backgroundColor: '#4B6F7B',

    },
    //
    burgerMenu_image: {
        resizeMode: 'contain',
        width: hp(23),
        height: hp(23),
        marginLeft: hp(15),
    },
    smileButton: {

    },
    smileButton_text: {
        fontSize: wp(28),
    }
});
