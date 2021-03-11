import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import {MultiTypedBaseComponent} from "../../Common/BaseComponent";
import {ContactIsOnline} from "../provider/ContactIsOnline";
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { getTimeAndText } from '../functions/getTime';
import { COLORS } from '../../constants/colors';
// import { AppLog } from '../Common/AppLog';
// import {store} from "../provider/Store";
// import { TypingIndicatorView } from '../components/Indicator/TypingIndicatorView';
// import { controllers } from '../controllers/Controllers';

class ContactIsOnlineView extends MultiTypedBaseComponent<ContactIsOnline>{
    constructor(props) {
        super(props);
        this.isOnline = this.isOnline.bind(this);

    }

    isOnline(isOnline: boolean) {
            if (isOnline) {
                return (
                    ' зараз онлайн'
                );
            }
            else {
                return (
                    getTimeAndText(this.model.date)
                );
            }
    }

    render() {
        super.render();
        if(!this.model.status && typeof this.props.type === 'undefined') {
            return null;
        }
        if (parseInt(this.model.id) < 0) {
            return null;
        }
        if(typeof this.props.type === 'undefined'){
        return (
            <View style={[styles.unreadCount, this.style]} />
        )
        }else {
            return(
                <>
                    {this.model.status &&(
                        <View style={[styles.unreadCount, this.style]} />
                    )}
                    <Text style={styles.containerTextOnline}>{this.isOnline(this.model.status)}</Text>
                </>
            )
        }
    }
}

export {ContactIsOnlineView};


const styles = StyleSheet.create({
    unreadCount: {
        backgroundColor: '#4CB684',
        position: 'absolute',
        bottom: wp(0),
        right: wp(-2),
        borderRadius: hp(13 / 2),
        width: hp(13),
        height: hp(13),
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: COLORS.WHITE.bg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTextOnline: {
        fontFamily: 'Roboto-Regular',
        fontSize: hp(10),
    },
})
