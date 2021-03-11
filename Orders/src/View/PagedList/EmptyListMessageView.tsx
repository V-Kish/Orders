import React from "react";
import {IBaseProps, TypedBaseComponent} from "../../Common/BaseComponent";
import {EmptyListMessageModel} from "../../Models/navigation/PagedList/EmptyListMessageModel";
import {mockupWidthToDP as wp, mockupHeightToDP as hp} from "../../constants/Dimensions"
import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../constants/colors";
import {SweetAlert} from "../Components/SweetAlert/SweetAlert";

class EmptyListMessageView extends TypedBaseComponent<EmptyListMessageModel> {
  constructor(props: IBaseProps<EmptyListMessageModel>) {
    super(props);
  }
  render() {
    if(this.model.messageName === ''){
      return null
    }
    return (
      <View style={EmptyStyles.container}>
        <SweetAlert style="primary">
          {this.model.messageName}
        </SweetAlert>
      </View>
    );
  }
}

export {EmptyListMessageView};


export const EmptyStyles = StyleSheet.create({
  container: {
    width: '100%',
    // marginVertical: wp(100),
    paddingHorizontal:wp(15),
    marginTop:hp(10)
  },
  containerBlock: {
    width: '80%',
    borderRadius: wp(10),
    borderColor: 'rgba(180,180,180,.5)',
    backgroundColor: COLORS.BORDER_BOTTOM_LINE,
    borderWidth: 1,
  },
  headerText: {
    fontFamily: 'Roboto-Light',
    fontSize: wp(20),
    paddingVertical: wp(20),
    paddingHorizontal: wp(10),
    color: COLORS.FONT_DETAIL_GRAY,
    textAlign: 'center',
  },
});
