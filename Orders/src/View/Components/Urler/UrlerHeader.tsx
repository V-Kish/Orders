import React from "react";
import {IBaseProps, MultiTypedBaseComponent, TypedBaseComponent} from "../../../Common/BaseComponent";
import {Modal, StyleSheet, Text, View} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import {UrlerHeader} from "../../../Models/Components/Urler/UrlerHeader";
import {ButtonView} from "../ButtonView";
import {COLORS} from "../../../constants/colors";

export class UrlerHeaderView extends MultiTypedBaseComponent<UrlerHeader> {
    constructor(props: IBaseProps<UrlerHeader>) {
        super(props);
    }

    render(){
        super.render()
        return <View style={styles.container}>
            <View style={styles.btnBox}>
                <ButtonView
                    model={this.model.closeBtn}
                    key={this.model.closeBtn.id}
                />
            </View>
            <View style={styles.titleBox}>
                <Text style={styles.title}>{this.model.title}</Text>
            </View>
            <View style={styles.btnBox}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.HEADER_GRAY.bg,
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
    },
    btnBox: {
        width: '15%'
    },
    titleBox: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    }
})
