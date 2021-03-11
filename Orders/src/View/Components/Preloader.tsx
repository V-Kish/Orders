import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, Modal } from 'react-native';
import { TypedBaseComponent } from '../../Common/BaseComponent';
import { Button } from '../../Models/Components/Button';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { ICONS } from '../../constants/icons';
import { Preloader } from '../../Models/Components/Preloader';
import { Loader } from './Loader/Loader';

class PreloaderView extends TypedBaseComponent<Preloader>{
  constructor(props: any) {
    super(props);
  }
  render() {
    if(!this.model.isVisible){
        return null
    }
    return <Modal 
        style={styles.modal}
        visible={this.model.isVisible}
    >
        <View 
            style={styles.container}
        >
            <Loader/>
        </View>
    </Modal>
  }
}

export { PreloaderView };

const styles = StyleSheet.create({
    modal: {

    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
