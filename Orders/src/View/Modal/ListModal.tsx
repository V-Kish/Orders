import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {CustomModalButtons} from './CustomModalButtons';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import {COLORS} from '../../constants/colors';
import {ListViewScroll} from './ListViewScroll';
import {ICONS} from '../../constants/icons';
import {useSelector} from 'react-redux';
import {reduxTypes} from '../../Types';

export const ListModal = ({
  title = '',
  content = '',
  closeModal = () => {},
  confirmAction = (item) => {},
  list = [],
}) => {
  const listDepartments = useSelector(
    (state: reduxTypes) => state.dictionaries.listDepartments,
  );
  const selectedDepartments: Array<any> = useSelector(
    (state: reduxTypes) => state.dictionaries.selectedDepartments,
  );
  const [selectedItem, setSelectedItem] = useState(selectedDepartments);
  const [scrollView, setScrollView] = useState();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const confirmFunc = () => {
     confirmAction(selectedItem)
  };
  const findIndex = (sel) => {
    let ind = -1
    listDepartments.forEach((e,i)=>{
      if(e.id===sel.id){
        ind = i
      }
    })
    return ind
  }
  const indexToOffset = (index) => {
    return layoutHeight/listDepartments.length*index
  }
  const scrollToIndex = (index) => {
    scrollView.scrollTo({y: indexToOffset(index), animated: true});
  };

  const firstScroll = (height,sel) => {
    scrollView.scrollTo({y: height/listDepartments.length*findIndex(sel), animated: true});
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.modalHeaderView}>
          <View style={styles.modalHeaderImageView}>
            <Image source={ICONS.mapPoint} style={styles.modalHeaderImage} />
          </View>
          <Text style={styles.modalHeaderText}>{title}</Text>
        </View>
        <ScrollView
          ref={(ref) => {
            setScrollView(ref);
          }}
          >
            <View
              onLayout={(e)=>{
                setLayoutHeight(e.nativeEvent.layout.height)
                firstScroll(e.nativeEvent.layout.height, selectedDepartments)
              }}
            >
              <ListViewScroll list={list} setSelectedItem={setSelectedItem} />
          </View>
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
  );
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
    justifyContent: 'flex-start',
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
    height: wp(20),
  },
  listView: {
    flex: 1,
    // height: '60%'
  },
});
