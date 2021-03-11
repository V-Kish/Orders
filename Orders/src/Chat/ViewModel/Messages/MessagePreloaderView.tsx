import * as React from 'react';
import { View, StyleSheet, Image,Dimensions,ActivityIndicator } from 'react-native';
import { TypedBaseComponent } from "../../../Common/BaseComponent";
import { MessagePreloader } from "../../provider/Messages/MessagePreloader";
import { MessageView } from '../../classes/MessageView';
import {
    mockupHeightToDP as hp,
} from '../../../constants/Dimensions';
import {ICONS} from "../../../constants/icons";
import {COLORS} from "../../../constants/colors";
const height = Dimensions.get('window').height

class MessagePreloaderView extends TypedBaseComponent<MessagePreloader> {

    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        if (this.model.hidden) {
            return null;
        }
        if (!this.model.messages.length){
            return (
                <>
                    <View style={styles.overlay}>
                        {!this.model.messages.length &&(
                            <ActivityIndicator size="large" color={'red'} />
                        )}
                        {this.model.messages.map(message => <MessageView model={message} key={message.id} />)}
                    </View>
                    {/*<View style={styles.backgroundImg}>*/}
                    {/*    <ActivityIndicator size="large" color="#FF4E22" />*/}
                    {/*</View>*/}
                    {/*<Image*/}
                    {/*    style={styles.backgroundImg}*/}
                    {/*    // source={require('../../assets/img/backCHAT/bg4.jpg')}>*/}
                    {/*    source={ICONS.loader}>*/}
                    {/*</Image>*/}
                </>
            );
        }else {
            return (
                <View>
                    <View style={styles.backgroundImg}>
                        {/*<Image*/}
                        {/*    style={styles.backgroundImage}*/}
                        {/*    // source={require('../../assets/img/backCHAT/bg4.jpg')}>*/}
                        {/*    source={ICONS.loader}>*/}
                        {/*</Image>*/}
                        {/*<ActivityIndicator size="large" color={COLORS.BLUE.bg} />*/}
                    </View>
                    <View style={styles.preloaderIndicator}>
                        <ActivityIndicator size="small" color="black" />
                    </View>
                    <View style={styles.overlayHistory}>
                        {this.model.messages.map(message => <MessageView model={message} key={message.id} />)}
                    </View>
                </View>
            );
        }

    }
}

export { MessagePreloaderView };

const styles = StyleSheet.create({
    overlay: {
        zIndex: 801,
        height: height - hp(200),
        justifyContent:'center',
        alignItems:'center',
    },
    overlayHistory:{
        zIndex: 801,
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: 800,
        flex:1,
        top:0,
        left:0,
        right:0,
        bottom:0,
        width:'100%',
        height:height,
    },
    preloaderIndicator:{
        position: 'absolute',
        zIndex: 802,
        width:hp(26),
        height:hp(26),
        left:'50%',
        marginLeft:hp(-13),
        top:hp(16),
        borderRadius:50,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
