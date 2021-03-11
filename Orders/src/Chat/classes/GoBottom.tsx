import * as React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {TypedBaseComponent} from "../../Common/BaseComponent";
import { GoBottomModel } from '../provider/Messages/GoBottom';
import {store} from "../provider/Store";
import { ICONS } from '../../constants/icons';


export class GoBottom extends TypedBaseComponent<GoBottomModel> {
    constructor(props) {
        super(props);
    }

    render(){
        super.render();
        if (!this.model.isVisible){
            return  null
        }
        if (this.model.counter !== 0 || store().chats.current.items.newMessageIndicator.counter>0){
            return  null
        }
        return (
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={this.model.onPress}>
                    <Image
                        // source={require('../assets/img/Gobottom/more.png')} style={styles.img}
                        source={ICONS.close} style={styles.img}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalButton: {
        width: wp(45),
        height: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(50 / 2),
        backgroundColor: 'rgba(76, 182, 132, 0.5)',
    },
    button: {
        position: 'absolute',
        right: wp(20),
        bottom: hp(20),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    img:{
        resizeMode:'contain',
        width:hp(35),
        height:hp(35),
    },
});
