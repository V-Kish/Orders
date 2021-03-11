import React from "react";
import {IBaseProps, MultiTypedBaseComponent, TypedBaseComponent} from "../../../Common/BaseComponent";
import {Modal, StyleSheet} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import WebView from "react-native-webview";
import {ModalStatusBar} from "../ModalStatusBar/ModalStatusBar";
import {Urler} from "../../../Models/Components/Urler/Urler";
import {UrlerHeaderView} from "./UrlerHeader";

export class UrlerView extends TypedBaseComponent<Urler> {
    constructor(props: IBaseProps<Urler>) {
        super(props);
    }

    render(){
        super.render()
        return <Modal
            visible={this.model.isVisible}
            onRequestClose={this.model.hide}
            animationType="fade"
        >
            <ModalStatusBar/>
            <UrlerHeaderView model={this.model.header} key={this.model.header.id}/>
            <WebView
                style={{flex:1}}
                ref={(webView) => (this.model.webView = webView)}
                source={{uri: this.model.link}}
                // onMessage={this.onMessage}
                onNavigationStateChange={this.model.onNavigationStateChange}
                javaScriptEnabledAndroid={true}
                javaScriptEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </Modal>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textSmall: {
        fontSize: hp(11),
        color: '#BDBDBD',
        textTransform: 'lowercase',
    },
    comisionSum: {
        fontSize: hp(30)
    },
    fontLight: {
        fontWeight: '400',
    }
})
