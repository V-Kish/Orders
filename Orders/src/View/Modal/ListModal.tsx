import React, {useState} from 'react';
import {StyleSheet, Text, View, Animated, ScrollView, Image} from 'react-native';
import { CustomModalButtons } from './CustomModalButtons';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
import { COLORS } from '../../constants/colors';
import {ListViewScroll} from './ListViewScroll'
import { ICONS } from '../../constants/icons';
import {ListItem} from "./ListItem";

export const ListModal = ({
    title = "",
    content = "",
    closeModal = ()=>{},
    confirmAction = (item) => {},
    list = []
}) => {
    let scrollListReftop = React.createRef();
    let _ssnodes = React.createRef();

    const [selectedItem, setSelectedItem] = useState()
    const confirmFunc = () => {
        scrollListReftop.getNode().scrollTo({ x: 500, animated: true });
        // confirmAction(selectedItem)
    }
   function scrollToElement (indexOf){
        const node = _ssnodes.get(indexOf);
        const position = findNodeHandle(node);
       scrollListReftop.scrollTo({ x: 0, y: position, animated: true });
    }
    return <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.modalHeaderView}>
                    <View style={styles.modalHeaderImageView}>
                        <Image
                          source={ICONS.mapPoint}
                          style={styles.modalHeaderImage}
                        />
                    </View>
                    <Text style={styles.modalHeaderText}>{title}</Text>
                </View>
                <ScrollView  ref={ref => {
                    scrollListReftop = ref;
                }}>
                    {list && list.map((item, i)=>{
                        return <ListItem key={i} ref={ref => _ssnodes.set(idx, ref)} item={item} setItem={setSelectedItem}/>
                    })}
                    {/*<ListViewScroll list={list} setSelectedItem={setSelectedItem}/>*/}
                </ScrollView>
            </View>
            <View style={styles.buttonsView}>
                <CustomModalButtons
                    customButton={{visible: true, title: 'Змінити'}}
                    customButtonPress={confirmFunc}
                    cancelButton={true}
                    cancelButtonPress={closeModal}
                />
            </View>
        </View>

};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '80%',
  },
  content: {
      minHeight: '90%',
      flex: 1,
  },
  buttonsView: {
    height: '10%',
  },
  modalHeaderView: {
    backgroundColor: COLORS.STATUS_BLUE,
    width: '100%',
    padding: wp(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  modalHeaderText: {
      fontSize: wp(20),
      lineHeight: 28,
      paddingBottom: hp(5),
      fontWeight: 'bold',
      color: 'white',
  },
  modalHeaderImageView: {
      paddingRight: wp(5),
  },
  modalHeaderImage: {
    width: wp(20),
    height: wp(20)
  },
  listView: {
      flex: 1
    // height: '60%'
  }
});
