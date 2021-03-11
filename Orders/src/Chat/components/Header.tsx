import * as React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import { navigator } from '../../Core/Navigator';
import {TypedBaseComponent, IBaseProps} from "../../Common/BaseComponent";
import { ChatsHeader } from '../provider/Headers/ChatsHeader';
import {CHAT_ICONS, ICONS} from "../../constants/icons";
import {STYLES} from "../../constants/styles";
import {ButtonView} from "../../View/Components/ButtonView";
import {AdminModalHeader} from "../../View/OsbbAdminStack/Modals/AdminModalHeader";

class HeaderView extends TypedBaseComponent<ChatsHeader> {
    constructor(props: IBaseProps<ChatsHeader>) {
        super(props);
    }

    pressOnAvatar() {
        navigator().navigate('ChangePhoto');
    }

    render() {
        super.render();
        return (
            <View style={styles.container}>
                <View style={styles.topBox}>
                    <AdminModalHeader onPress={this.model.backBtnPress} title='Повідомлення'/>
                 {/*<View style={{flexDirection:'row',alignItems:'center'}}>*/}
                 {/*    <ButtonView*/}
                 {/*        model={this.model.backBtn}*/}
                 {/*        key={this.model.backBtn.id}*/}
                 {/*    />*/}
                 {/*    <Text style={[STYLES.robotoMidleTitle]} numberOfLines={1}>*/}
                 {/*        Повідомлення*/}
                 {/*    </Text>*/}
                 {/*</View>*/}
                    <View style={styles.chatNavigation}>
                        <View style={styles.chatNavigationContainer}>
                            <TouchableOpacity
                                style={styles.chatButton}
                                onPress={()=>{
                                    navigator().navigate('ContactsScreen')
                                }}
                            >
                                <Image
                                    style={styles.chatButtonImage}
                                    source={CHAT_ICONS.addChat}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.chatButton}
                                onPress={()=>{
                                    navigator().navigate('NewChatScreen')
                                }}
                            >
                                <Image
                                    style={[styles.chatButtonImage, {width: wp(20), height: wp(20)}]}
                                    source={CHAT_ICONS.newChannel}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export { HeaderView };

const styles = StyleSheet.create({
    container: {

    },
    contactHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    contactSearch: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactIcon: {
        backgroundColor: '#FFA726',
        borderRadius: 40 / 2,
        marginRight: wp(15),
        width: wp(40),
        height: wp(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactIconText: {
        fontSize: hp(24),
        color: COLORS.FONT_WHITE,
    },
    contactHeaderName: {
        //marginLeft: wp(0),
        fontFamily: 'Roboto-Medium',
        fontSize: hp(22),
        color: COLORS.FONT_WHITE,
    },
    headerIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(10),
        width: '90%',
    },
    searchImg: {
        alignSelf: 'center',
    },
    searchInput: {
        flexDirection: 'row',
        width: '75%',
        height: hp(40),
        alignSelf: 'center',
        paddingHorizontal: wp(10),
        backgroundColor: 'white',
    },
    btnClose: {
        alignSelf: 'center',
        height: hp(40),
        justifyContent: 'center',
    },
    containerTextAnimation: {
        paddingHorizontal: wp(10),
        // width: hp(150),
        //marginLeft: hp(15),
        //backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnArrow: {
        paddingTop: hp(10),
        paddingBottom: hp(10),
        paddingLeft: hp(10),
        paddingRight: hp(10),
        marginRight: wp(5),
        marginLeft: wp(-10),
    },
    // header icon
    wrapIconPerson:{
    },
    styleBtnIcon:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        // marginRight:hp(10)
    },
    styleBtn:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    wrapIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: hp(5),
        width:hp(45),
        marginRight:hp(12.5)
    },
    headerIcons: {
        resizeMode: 'contain',
        width: hp(23),
        height: hp(23),
    },
    topBox: {
        // paddingTop: hp(20),
        paddingBottom: hp(10),
        paddingHorizontal: wp(20),
    },
    chatNavigation: {
        alignItems: 'center',
        // marginTop: hp(25),
    },
    chatNavigationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.BLUE.bg,
        width: '100%',
        paddingHorizontal: wp(15),
        paddingVertical: hp(10),
        borderRadius: 15,
    },
    chatButton: {
        paddingHorizontal: wp(15),
    },
    chatButtonImage: {
        width: wp(30),
        height: wp(20),
    },
});
