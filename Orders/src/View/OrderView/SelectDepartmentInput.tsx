import React from 'react'
import { StyleSheet, Text,TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { selectedDepartment } from '../../store/actions/EditUserInfo';
import {
    mockupHeightToDP as hp,
    mockupWidthToDP as wp,
  } from '../../constants/Dimensions';
  
export const SelectDepartmentInput = ({switchDepartmentModal}) => {
    const selectedDepartments: Array<any> = useSelector(
        (state: reduxTypes) => state.dictionaries.selectedDepartments,
    );

    return <TouchableOpacity onPress={switchDepartmentModal} style={styles.change}>
        <Text style={styles.textDefaultSecond}>Відділення: </Text>
        <Text>{selectedDepartments.name}</Text>
  </TouchableOpacity>
}
const styles = StyleSheet.create({
    textDefaultSecond: {
        fontSize: hp(18),
      },
})