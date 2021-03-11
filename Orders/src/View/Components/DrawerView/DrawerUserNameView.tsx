import {IBaseProps, TypedBaseComponent} from "../../Common/BaseComponent";
import {DrawerUserName} from "../../Navigation/DrawerUserName";
import {StyleSheet, Text, View} from "react-native";
import {currentUser} from "../../Core/CurrentUser";
import React from "react";
import {mockupHeightToDP as hp} from "../../constants/Dimensions";


export class DrawerUserNameView extends TypedBaseComponent<DrawerUserName>{
    constructor(props: IBaseProps<DrawerUserName>) {
        super(props);
    }
    render(){
        super.render();
        const name = this.model.name==='' ? currentUser().user.name : this.model.name
        return(<View style={styles.wrapUserName}>
            <Text numberOfLines={2} style={styles.userName}>
                {name}
            </Text>
        </View>)
    }
}
const styles = StyleSheet.create({
    wrapUserName: {},
    userName: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '600',
        fontSize: hp(20),
    },
})
