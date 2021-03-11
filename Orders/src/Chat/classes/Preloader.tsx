import * as React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { TypedBaseComponent} from "../../Common/BaseComponent";
import {COLORS} from "../../constants/colors";
import { Preloader } from '../provider/Preloader/Preloader';

class PreloaderView extends TypedBaseComponent<Preloader> {
    constructor(props) {
        super(props);

    }

    render() {
        super.render();
        return this.model.visible ? (
                <View style={styles.containerModal}>
                    <View style={styles.wrapper}>
                        <ActivityIndicator
                            style={styles.loading}
                            size="large"
                            color={'red'}
                        />
                    </View>
                </View>
        ) : null;
    }
}

export  {PreloaderView};

const styles = StyleSheet.create({
    containerModal: {
        position: 'absolute',
        flex: 1,
        backgroundColor: 'red',
        left: hp(0),
        right: hp(0),
        bottom: hp(0),
        top: hp(0),
        zIndex:99999
    },
    wrapper: {
        height:'100%',
        alignItems:'center',
        justifyContent: 'center',
    },
});
