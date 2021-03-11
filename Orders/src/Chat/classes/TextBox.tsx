import * as React from 'react';
import { StyleSheet,TextInput } from 'react-native';
import {COLORS} from '../../constants/colors';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {TypedBaseComponent} from "../../Common/BaseComponent";
import {TextBox as TB} from '../provider/TextBox';

class TextBox extends TypedBaseComponent<TB> {
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        const props = {
            onChangeText: undefined,
            onFocus: undefined,
            onBlur: undefined,
            onEndEditing: undefined,
            value: undefined,
            autoFocus: undefined,
            multiline: undefined,
            maxLength: 35,
            onSelectionChange: undefined,
            onContentSizeChange: undefined,
            sectionColor: undefined,
        };
        if (typeof this.model.onChangeText === 'function') {
            props.onChangeText = this.model.onChangeText.bind(this.model);
        }
        if(typeof this.model.onFocus !== "undefined"){
            props.onFocus = this.model.onFocus.bind(this.model);
        }
        if(typeof this.model.onBlur !== "undefined"){
            props.onBlur = this.model.onBlur.bind(this.model);
        }
        if(typeof this.model.onEndEditing !== "undefined"){
            props.onEndEditing = this.model.onEndEditing.bind(this.model);
        }
        if(typeof this.model.autoFocus !== "undefined"){
            props.autoFocus = this.model.autoFocus;
        }
        if(typeof this.model.multiline !== "undefined"){
            props.multiline = this.model.multiline;
        }
        if (typeof this.model.onSelectionChange === 'function') {
            props.onSelectionChange = this.model.onSelectionChange.bind(this.model);
        }
        if (typeof this.model.onContentSizeChange === 'function') {
            props.onContentSizeChange = this.model.onContentSizeChange.bind(this.model);
        }
        if(typeof this.props.selectionColor !== "undefined"){
            props.sectionColor = this.props.selectionColor
        }
        return (
            <TextInput
                key={`${this.model.id}_TextBox`}
                ref={(ref) => { this.model.ref = ref; }}
                placeholder={typeof this.props.placeholder !== 'undefined' ? this.props.placeholder : `${this.model.placeholder}`}
                maxLength={this.model.maxLength}
                style={styles[`${this.model.style}`]}
                secureTextEntry={this.model.secureTextEntry}
                onChangeText={props.onChangeText}
                onEndEditing={props.onEndEditing}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                autoFocus={props.autoFocus}
                autoCorrect={this.model.autoCorrect}
                autoCompleteType={'off'}
                // textAlignVertical={'center'}
                multiline={this.model.multiline}
                numberOfLines={this.model.numberOfLines}
                defaultValue={typeof this.props.placeholder !== 'undefined' ? this.props.defaultValue : null}
                onSelectionChange={props.onSelectionChange}
                onContentSizeChange={props.onContentSizeChange}
                selectionColor={props.sectionColor}
            />
       );
    }
}

export  {TextBox};

const styles = StyleSheet.create({
    inputFieldFirst: {
        borderBottomWidth: wp(1),
        borderColor: 'rgba(0, 0, 0, 0.12)',
        marginBottom: hp(50),
        marginTop: hp(30),
        paddingTop: 0,
        paddingBottom: hp(5),
        fontSize: hp(18),
    },
    inputFieldSecond: {
        borderBottomWidth: wp(1),
        borderColor: 'rgba(0, 0, 0, 0.12)',
        paddingTop: 0,
        paddingBottom: hp(5),
        fontSize: hp(18),
    },
    correctForm: {
        borderRadius: hp(5),
        marginBottom: hp(10),
        paddingHorizontal: hp(5),
        borderColor:  COLORS.FONT_BLACK,
        borderWidth: 1,
    },
    unCorrectForm: {
        borderRadius: hp(5),
        marginBottom: hp(10),
        paddingHorizontal: hp(5),
        borderColor: COLORS.FONT_BLACK,
        borderWidth: 1,
    },
    keyboardInput: {
        flex: 1,
        fontFamily: 'Roboto',
        fontSize: hp(16),
        // maxHeight: hp(140),
        // minHeight: hp(30),
        // alignSelf:'center',
        paddingLeft: wp(10),
        // height: hp(50),
         //backgroundColor: 'red',

        // height: '100%'
    },
    contactInput: {
        // width: wp(145),
        fontSize: hp(22),
        fontWeight: '500',
        color: COLORS.FONT_WHITE,
        // textAlign:'left',
        textAlign:'center',
        padding: 0,
        margin: 0,
        // paddingLeft: wp(2),
        // backgroundColor: 'green'
    },
});
