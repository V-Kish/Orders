import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {STYLES} from '../../constants/styles';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {navigator} from "../../Core/Navigator";
import {TypedBaseComponent, IBaseProps} from "../../Common/BaseComponent";
import {UserDetailModel} from "../../Models/ChatStack/UserDetailModel";
import {ButtonView} from "../Components/ButtonView";
import {AdminModalHeader} from "../OsbbAdminStack/Modals/AdminModalHeader";
import {controllers} from "../../Controllers/Controllers";
import {COLORS} from "../../constants/colors";
import {ContactIconViewModel} from "../../Chat/classes/ContactIconViewModel";
import {currentUser} from "../../Core/CurrentUser";
import {ICONS} from "../../constants/icons";
import {ScreenStepView} from "../Components/Step/ScreenStepView";
import {Loader} from "../Components/Loader/Loader";

class UserDetailView extends TypedBaseComponent<UserDetailModel> {
    constructor(props: IBaseProps<UserDetailModel>) {
        super(props);
    }

    render() {
        //super.render(); --added OndrashdeV
        return (
            <View style={styles.container}>
                <AdminModalHeader
                    title="Дані контакту"
                    textStyles={{
                        fontWeight: '500',
                        fontSize: wp(16),
                        fontFamily: 'Roboto-Regular',
                    }}
                    onPress={()=>{
                        navigator().toGoBack()
                    }}
                />
                <ScreenStepView model={this.model.steps[0]} key={this.model.steps[0].id}>
                    <View style={STYLES.preloaderStyle}>
                        <Loader/>
                    </View>
                </ScreenStepView>
                <ScreenStepView model={this.model.steps[1]} key={this.model.steps[1].id}>
                    <View style={styles.mainContainer}>
                        <View style={styles.containerUserInfo}>
                            <View style={styles.wrapIcon}>
                                <ContactIconViewModel
                                    model={this.model.userIcon}
                                    key={this.childId(this.model.userIcon)}
                                    id={this.childId(this.model.userIcon)}
                                    contactIconDiameter={100}
                                    type={'large'}
                                />
                            </View>
                            {/*//user information*/}
                            <View style={styles.blockUserInfo}>
                                <View style={styles.wrapUserName}>
                                    <Text numberOfLines={2} style={styles.userName}>
                                        {this.model.userName}
                                    </Text>
                                </View>
                                <View style={styles.wrapApartmentUser}>
                                    <Text numberOfLines={2} style={styles.apartmentText}>
                                        {this.model.userAddress}
                                    </Text>
                                </View>
                                <View style={styles.wrapPhoneUser}>
                                    {/*<Text numberOfLines={1} style={styles.phoneText}>*/}
                                    {/*    {currentUser().currentOsbb?.name}*/}
                                    {/*</Text>*/}
                                    <Text numberOfLines={1} style={styles.phoneText}>
                                        телефон:{' '}
                                        <Text style={styles.textNumber}>
                                            {this.model.userPhone}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.userActions}>
                            {this.model.userId !== currentUser().userId && <ButtonView
                                model={this.model.newChatBtn}
                                key={this.model.newChatBtn.id}
                            />}
                            {/*<ButtonView*/}
                            {/*    model={this.model.blockBtn}*/}
                            {/*    key={this.model.blockBtn.id}*/}
                            {/*/>*/}
                        </View>

                        {/*<View style={STYLES.smallMarginVertical}>*/}
                        {/*    <Text style={STYLES.robotoSmallTitle}>Спільні групи</Text>*/}
                        {/*    <ScrollView showsVerticalScrollIndicator={false}>*/}

                        {/*    </ScrollView>*/}
                        {/*</View>*/}
                    </View>
                </ScreenStepView>
            </View>
        );
    }
}

export {UserDetailView};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    containerUserInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: hp(25),
    },
    wrapIcon: {
        marginRight: wp(15),
        // paddingHorizontal: wp(20),
    },
    blockUserInfo: {
        width: '70%',
        // backgroundColor: 'red'
    },
    wrapUserName: {},
    wrapApartmentUser: {},
    wrapPhoneUser: {},
    userName: {
        fontFamily: 'Roboto-Light',
        fontWeight: '400',
        fontSize: hp(30),
    },
    apartmentText: {
        paddingVertical: hp(10),
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: hp(20),
        color: COLORS.HEADER_GRAY.text,
    },
    phoneText: {
        // paddingVertical: hp(10),
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: hp(20),
        color: COLORS.HEADER_GRAY.text,
    },
    textNumber: {
        // fontFamily: 'Roboto-MediumItalic',
        // fontSize: hp(18),
        // color: COLORS.FONT_GRAY_TITLE.text,
    },
    userActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: hp(30),
    },
})
