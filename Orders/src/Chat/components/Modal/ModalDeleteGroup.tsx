import React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { TypedBaseComponent } from '../../../Common/BaseComponent';
import { ModalDeleteGroup } from '../../provider/Drawer/ModalDeleteGroup';
import { ButtonView } from '../../../View/Components/ButtonView';
class ModalDeleteGroupView extends TypedBaseComponent<ModalDeleteGroup> {
    constructor(props) {
        super(props);
    }
    render() {
        super.render();
        return (
            <View>
                <Modal animationType="fade" transparent={true} visible={!this.model.hidden}>
                    <View style={styles.containerBonusCard}>
                        <View style={styles.container}>
                            <View style={styles.wrapMainIconAndText}>
                                <Text style={styles.mainText}>
                                    Видалити групу {this.model.groupName}? {'\n'}
                                </Text>
                            </View>
                            <View style={styles.wrapBtnYesNo}>
                                <ButtonView
                                    model={this.model.deleteButton}
                                    key={this.model.deleteButton.id}
                                />
                                <ButtonView
                                    model={this.model.cancelButton}
                                    key={this.model.cancelButton.id}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export { ModalDeleteGroupView };

const styles = StyleSheet.create({
  containerBonusCard: {
    paddingHorizontal: wp(21),
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: wp(5),
    width: wp(200),
    paddingHorizontal: hp(15),
    overflow: 'hidden',
  },
  btnCloseAlert: {
    alignItems: 'flex-end',
    marginRight: wp(18),
    marginTop: wp(20),
  },
  btnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(17),
    fontWeight: '400',
  },
  wrapMainIconAndText: {
    alignItems: 'center',
    marginTop: hp(12),
  },
  mainIconLogout: {
    width: wp(43),
    height: hp(43),
    resizeMode: 'contain',
    marginBottom: hp(33),
  },
  mainText: {
    color: '#1e1a16',
    fontFamily: 'Roboto-Regular',
    fontSize: hp(16),
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: hp(25),
  },
  wrapBtnYesNo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //  marginTop: hp(45),
    marginBottom: hp(10),
  },
});
