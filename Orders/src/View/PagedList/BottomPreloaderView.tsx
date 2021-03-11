import React from 'react';
import {IBaseProps, MultiTypedBaseComponent} from "../../Common/BaseComponent";
import {BottomPreloader} from "../../Models/navigation/PagedList/BottomPreloader";
import {StyleSheet, View} from "react-native";
import {Loader} from "../Components/Loader/Loader";
import {STYLES} from "../../constants/styles";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../.../../constants/Dimensions';

export class BottomPreloaderView extends MultiTypedBaseComponent<BottomPreloader>{
    constructor(props: IBaseProps<BottomPreloader>) {
        super(props);
    }

    render() {
        super.render();
        return(<View style={this.model.isVisible ? styles.container : STYLES.hidden}>
            <Loader/>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical:hp(10),
    }
})
