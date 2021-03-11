import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text,
    Animated,
    UIManager,
    LayoutAnimation,
    Platform
} from 'react-native';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {TypedBaseComponent} from "../../Common/BaseComponent";
import {KeyboardFilePreview} from "../provider/Messages/KeyboardFilePreview";
import {IconButtonView} from "../ViewModel/IconButtonView";
import {MessageHelper} from  "../provider/Messages/MessageHelper"
import {store} from "../provider/Store";
import {CHAT_ICONS, ICONS} from "../../constants/icons";

let height;
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
class KeyboardFilePreviewView extends TypedBaseComponent<KeyboardFilePreview>{
    constructor(props) {
        super(props);
        height = this.model.height;
    }

    render()  {
        super.render();
        if(this.model.hidden){
            return null;
        }
        return (
            <View style={styles.container}>
                <IconButtonView
                  model={this.model.removeFileButton}
                  key={this.model.removeFileButton.id}
                />
                <View style={styles.iconPreviewContainer}>
                    <View style={{flexDirection: 'row'}}>
                    {this.model.files.map((item,index) => {
                        if (item.fileType === 0){
                            return (
                              <Animated.View key={item.id}>
                                 <TouchableOpacity
                                     style={styles.containerImgView}
                                     onPress={() => {
                                     this.model.setAnimation(index,LayoutAnimation)
                                     this.model.removeItem(item)
                                 }} >
                                     <View style={styles.wrapImg}>
                                         <Image
                                           style={styles.checkedImg}
                                           // source={require('../assets/img/Icons/checked/Shape.png')}
                                           source={CHAT_ICONS.checked}
                                         />
                                     </View>
                                     <Image
                                       style={styles.iconPreview}
                                       source={{ uri: item.uri }}
                                     />
                                 </TouchableOpacity>
                              </Animated.View>
                            )
                        }else {
                            return (
                              <TouchableOpacity
                                  onPress={() => {
                                  this.model.setAnimation(index,LayoutAnimation)
                                  this.model.removeItem(item)
                              }} key={item.id}>
                                  <View style={styles.wrapImgFiles}>
                                      <Image
                                        style={styles.checkedImg}
                                        // source={require('../assets/img/Icons/checked/Shape.png')}
                                        source={CHAT_ICONS.checked}
                                      />
                                  </View>
                                  <Image
                                    style={styles.iconPreview}
                                    // source={require('../assets/img/FilesIcons/Files/files.png')}
                                    source={CHAT_ICONS.files}
                                  />
                                  <Text style={styles.filesExtension} >
                                      {'.' + MessageHelper.getFileExtension(item.name)}
                                  </Text>
                              </TouchableOpacity>
                            )
                        }
                    })}
                        {this.model.files.length < 3 && (
                          <TouchableOpacity style={styles.addNewImage} onPress={() => store().chats.keyboard.emojiChat.pickFiles()}>
                              <Image
                                style={styles.addImg}
                                // source={require('../assets/img/plus/Add.png')}
                                source={CHAT_ICONS.plus}
                              />
                          </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.wrapCounter}>
                    <Text>{this.model.files.length} / 3</Text>
                </View>
            </View>
        )
    }
}

export {KeyboardFilePreviewView};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        paddingLeft: wp(16),
        height: height,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
         paddingVertical: hp(20),

    },
    iconPreviewContainer: {
        height: hp(80),
    },
    iconPreview: {
        // width: wp(65),
        // height: hp(80),
        // resizeMode: 'stretch',
        //marginRight:hp(10),
        //

        aspectRatio: (wp(65) / hp(80)),
        // Make sure the image stretches and shrinks
        width: '100%',
        height: '100%',
        // Make sure the image doesn't exceed it's original size
        // If you want it to exceed it's original size, then
        // don't use maxWidth / maxHeight or set their
        // value to null
        maxWidth: wp(65),
        maxHeight: hp(80),
        // center horizontally
        marginLeft: 'auto',
        marginRight: 'auto',
        // make sure, the image is resized properly:
        resizeMode: 'contain',
    },
    iconPreviewCloseButton: {
        width: wp(20),
        height: wp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(20 / 2),
        position: 'absolute',
        zIndex: 1,
        right: wp(-4),
        top: hp(-4),
        backgroundColor: '#4B6F7B',
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    sendButton: {
        padding: hp(10),
    },
    filesExtension: {
        top: hp(13),
        left: wp(13),
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        position: 'absolute',
        fontSize: hp(9),
        textTransform: 'uppercase',
    },
    wrapImg:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(20 / 2),
        height:hp(18),
        width:hp(18),
        position: 'absolute',
        zIndex: 1,
        right: wp(4),
        top: hp(-5),
        backgroundColor: 'green',
    },
    wrapImgFiles:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(20 / 2),
        height:hp(18),
        width:hp(18),
        position: 'absolute',
        zIndex: 1,
        right: wp(4),
        top: hp(-10),
        backgroundColor: 'green',
    },
    checkedImg:{
        height:hp(12),
        width:hp(12),
        resizeMode: 'contain'
    },
    wrapCounter:{
        position:'absolute',
        right:hp(5),
        top:hp(25),
    },
    addNewImage:{
        width: wp(65),
        height: hp(80),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'gray',
    },
    addImg:{
        width: wp(25),
        height: hp(25),
        resizeMode:'contain'
    },
    containerImgView:{
        width: wp(65),
    }
});
