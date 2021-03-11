import React from 'react';
import {  StyleSheet, View, Modal } from 'react-native';
import { TypedBaseComponent } from '../../Common/BaseComponent';

import { Loader } from './Loader/Loader';
import {Preloader} from "../../Model/Components/Preloader";

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
