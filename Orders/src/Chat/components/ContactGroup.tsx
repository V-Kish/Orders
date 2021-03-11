import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import {
  mockupWidthToDP as wp,
  mockupHeightToDP as hp,
} from '../../constants/Dimensions';
import { TypedBaseComponent} from '../../Common/BaseComponent';
import { ContactItemView } from '../classes/ContactItem';
import { ContactsList } from "../provider/Contacts/SelectedContacts";

class SelectedContactsView extends TypedBaseComponent<ContactsList> {
    private scrollView: any;
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        return (
            <View style={styles.containerScrollView}>
                <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                    contentContainerStyle={styles.containerSmall}>
                    {Array.from(this.model.items.values()).map(contact => <ContactItemView model={contact} key={`${this.model.id}_Selected_${contact.id}`} type={'small'} Diameter={30}/>)}
                </ScrollView>
            </View>
        );
    }
}

export { SelectedContactsView };

const styles = StyleSheet.create({
  containerLarge: {
    paddingHorizontal: wp(15),
    paddingVertical: hp(15),
    //paddingBottom: hp(50),
  },
  containerSmall: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.FONT_BLACK,
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    width: '100%',
  },
  containerSmallModal: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.FONT_BLACK,
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    width: '100%',
  },
  containerScrollView: {
    maxHeight: hp(200),
    //paddingBottom: hp(30),
  },
});
