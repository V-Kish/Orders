import React from 'react';
import {View, StyleSheet, ScrollView, Text } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { CustomerListItem } from './CustomerListItem';
import {clientItem, reduxTypes} from "../../Types";
import { useDispatch, useSelector } from 'react-redux';


export const CustomersListView = () => {
    const dispatch = useDispatch();
    const ClientsList = useSelector((state: reduxTypes) => state.clients.Items);
    console.log("HERE NOW", ClientsList);

    function renderClients(){
        if(ClientsList !== undefined){
            if(ClientsList.length > 0){
                return ClientsList.map((item) => (
                    <CustomerListItem item={item} key={item.id}/>
                ))
            } else {
                return <Text>No users!</Text>
            }
        }
    }

    return (
        <View style={styles.containers}>

            <ScrollView
                onScroll={async ({nativeEvent}) => {
                    // if (loadDataMore(nativeEvent) && statePreloader ) {
                    // await loadMorePagination();
                    // }
                    console.log("SCROOLLING CLIENTS!")
                }}

                contentContainerStyle={styles.clientsList}
            >


                {
                    renderClients()
                }

            </ScrollView>
        </View>
      );
};

const styles = StyleSheet.create({
    containers: {
      flex: 1,
      marginTop: 10
    },
    clientsList: {
        width: '100%',
        alignItems: 'center'
    }
  });
  