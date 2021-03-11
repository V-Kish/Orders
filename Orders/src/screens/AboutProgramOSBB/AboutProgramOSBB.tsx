import React from 'react';
import {BaseScreen} from '../../Common/BaseScreen';
import {controllers} from '../../Controllers/Controllers';
import {navigator} from '../../Core/Navigator';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {STYLES} from '../../constants/styles';
import {HeaderWithDrawerAndSearchView} from '../../View/OsbbAdminStack/Components/HeaderWithDrawerAndSearchView';
import {View} from 'react-native';
import {AboutProgramOSBBView} from '../../View/AboutProgramOSBB/AboutProgramOSBBView';
import {AdminModalHeader} from '../../View/OsbbAdminStack/Modals/AdminModalHeader';
import {ShowBottomNavigation} from "../../Core/ShowBottomNavigation";

class AboutProgramOSBB extends BaseScreen {
  constructor(props: React.Props<any>) {
    super(props);
  }

  get screenName() {
    return 'AboutProgramOSBB';
  }

  get swipeEnabled() {
    return true;
  }

  content() {
    return (
      <View style={STYLES.screen}>
        <HeaderWithDrawerAndSearchView
          model={controllers().osbbAdminController.headerWithDrawerAndSearch}
          key={`${this.screenName}_${
            controllers().osbbAdminController.headerWithDrawerAndSearch.id
          }`}
          id={`${this.screenName}_${
            controllers().osbbAdminController.headerWithDrawerAndSearch.id
          }`}
        />
        <View style={{paddingHorizontal:wp(10)}}>
        <AdminModalHeader
          onPress={() => navigator().toGoBack()}
          title={'Про програму'}
          id={'aboutProgramOSBB_SCREEN'}
        />
        </View>
        <View style={{flex: 1}}>
          <AboutProgramOSBBView
            model={controllers().aboutProgramOSBB}
            key={`${this.screenName}_${controllers().aboutProgramOSBB.id}`}
            id={`${this.screenName}_${controllers().aboutProgramOSBB.id}`}
          />
        </View>
      </View>
    );
  }
}

export {AboutProgramOSBB};
