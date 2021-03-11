import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { ContactIconViewModel } from './ContactIconViewModel';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import {  TypedBaseComponent } from '../../Common/BaseComponent';
import { ContactItem } from '../provider/Contacts/ContactItem';
import {ICONS} from "../../constants/icons";
i
// import {AppLog} from "../Common/AppLog";

class ContactItemView extends TypedBaseComponent<ContactItem> {
    constructor(props) {
        super(props);
    }
    render() {
        super.render();
        const addGroupUser = false;
        return (
            <View>
                <TouchableOpacity
                    style={styles.container}
                    onPress={this.model.onPress}
                // disabled={disabled}
                >
                    {/*Іконки юзерів при додаванні в групу*/}
                    <View>
                        <ContactIconViewModel
                            model={this.model.contactIcon}
                            key={`${this.props.id}_${this.model.contactIcon.id}`}
                            id={`${this.props.id}_${this.model.contactIcon.id}`}
                            contactIconDiameter={ typeof this.props.Diameter !== 'undefined' ? this.props.Diameter : 50}
                            type={typeof this.props.type !== 'undefined' ? this.props.type : 'large'}
                        />
                    </View>
                    <View style={
                        [
                            styles.contactTextBox,
                            typeof this.props.type !== 'undefined'
                            && this.props.type === 'small'
                               ? styles.nameContainerSmall
                               : styles.nameContainer
                        ]
                    }>
                        <Text
                            numberOfLines={1}
                            style={
                                addGroupUser ? styles.contactTextAddGroup : styles.contactText
                            }>
                            {this.model.name}
                        </Text>
                        {this.props.owner && <Image style={styles.ownerImg}
                                                    source={ICONS.close}
                        />}
                        {this.model.isOsbbLeader && <Image style={styles.ownerImg}
                                                           source={ICONS.close}
                        />}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export { ContactItemView };
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    marginRight: wp(15),
    marginBottom: hp(10),
    // borderColor: 'hsl(0,0%,95%)',
    // borderWidth: 1,
  },
  contactText: {
    fontSize: hp(18),
    fontFamily: 'Roboto',
    // letterSpacing: .4,
    color: 'red',
    marginLeft: wp(8),
      // backgroundColor: 'red',
      // width: '100%'
  },
  contactTextAddGroup: {
    fontSize: hp(14),
    fontFamily: 'Roboto-Regular',
    color:'red',
    marginLeft: wp(8),
    width: '60%',
      // backgroundColor: 'red'
  },
  nameContainer: {
    // width: wp(150),
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainerSmall: {
    width: wp(100),
  },
  fadeOut: {
    position: 'absolute',
    right: 0,
  },
  ownerImg: {
    resizeMode: 'contain',
    width: wp(12),
    height: hp(12),
    marginLeft: wp(10)
  },
    contactTextBox: {
      flexDirection: 'row',
        alignItems: 'center'
    }
});
