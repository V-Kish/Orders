import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../../constants/Dimensions';
import { ICONS } from '../../../constants/icons';
import { COLORS } from '../../../constants/colors';

export enum containers {
  container,
  icon,
  text,
}

class SweetAlert extends React.Component{
  constructor(props: any) {
    super(props);
  }
  render() {
    let image = ICONS.primary
    switch(this.props.style){
        case 'error':
            image = ICONS.error
            break;
        case 'warning':
            image = ICONS.warning
            break;
        case 'success':
            image = ICONS.success
            break;
    }
    return <View style={styles.container}>
        <View style={this.props.style ? [styles.containerBlock, styles[`${this.props.style}_block`]] : styles.containerBlock}>
            <View style={styles.imageView}>
                <Image style={this.props.style ? [styles.image, styles[`${this.props.style}_image`]] : styles.image} source={image}/>
            </View>
            <Text style={this.props.style ? [styles.text, styles[`${this.props.style}_text`]] : styles.text}>
                {this.props.children}
            </Text>
        </View>
    </View>
  }
}

export { SweetAlert };

const styles = StyleSheet.create({
    container: {
    },
    containerBlock: {
        borderRadius: 5,
        padding: wp(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageView: {
        paddingRight: wp(20),
        width: '20%',
    },
    image: {
        width: wp(50),
        height: wp(50)
    },
    warning_image: {
        width: wp(55),
        height: wp(50),
    },
    text: {
        fontFamily: 'Roboto',
        width: '80%',
    },
    primary: {
        
    },
    primary_block: {
        backgroundColor: COLORS.PRIMARY.bg,
        borderColor: COLORS.PRIMARY.border,
    },
    primary_text: {
        color: COLORS.PRIMARY.text,
    },
    error: {
        
    },
    error_block: {
        backgroundColor: COLORS.ERROR.bg,
        borderColor: COLORS.ERROR.border,
    },
    error_text: {
        color: COLORS.ERROR.text,
    },
    warning: {
        
    },
    warning_block: {
        backgroundColor: COLORS.WARNING.bg,
        borderColor: COLORS.WARNING.border,
    },
    warning_text: {
        color: COLORS.WARNING.text,
    },
    success: {
        
    },
    success_block: {
        backgroundColor: COLORS.SUCCESS.bg,
        borderColor: COLORS.SUCCESS.border,
    },
    success_text: {
        color: COLORS.SUCCESS.text,
    }
});
