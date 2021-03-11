import React from 'react';
import {IBaseProps, TypedBaseComponent} from "../../../Common/BaseComponent";
import {ChatTextBox} from "../../../Models/Components/ChatInput/ChatTextBox";
import {StyleSheet, TextInput} from "react-native";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';

export class ChatTextBoxView extends TypedBaseComponent<ChatTextBox>{
    constructor(props: IBaseProps<ChatTextBox>) {
        super(props);
    }

    render(){
        super.render();
        return(<TextInput
            numberOfLines={this.model.numberOfLines}
            multiline={true}
            value={this.model.value}
            onChangeText={this.model.onChangeText}
            style={styles.input}
        />)
    }

}
const styles= StyleSheet.create({
    input: {
        backgroundColor: 'white',
        marginHorizontal: wp(5),
        marginVertical: hp(10),
        borderRadius: 5,
        paddingHorizontal: wp(5),
        // paddingVertical: hp(5),
        minHeight: hp(35),
        maxHeight: hp(82),
        overflow: 'hidden'
    }
})
