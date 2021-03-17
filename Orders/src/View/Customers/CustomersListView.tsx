import React from 'react';
import {View, StyleSheet, ScrollView, Text } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { CustomerListItem } from './CustomerListItem';
import {clientItem, reduxTypes} from "../../Types";
import { useDispatch, useSelector } from 'react-redux';
import { Clients } from '../../functions/Clients';


export const CustomersListView = () => {
    const dispatch = useDispatch();
    const ClientsList = useSelector((state: reduxTypes) => state.clients.Items);
    const ClientsListInfo = useSelector((state: reduxTypes) => state.clients.clientsListInfo);
    console.log("LOADED CLIENTS TO PAGINATE: ", ClientsListInfo);

    function renderClients(){
        if(ClientsList !== undefined){ 
            if(ClientsList.length > 0){
                return ClientsList.map((item, index) => (
                    <CustomerListItem item={item} key={index}/>
                ))
            } else {
                return <Text>No users!</Text>
            }
        }
    }


    const loadDataMore = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 500;
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        );
    };


    async function loadMorePagination() {
        if (!(ClientsListInfo.PageIndex * ClientsListInfo.PageSize < ClientsListInfo.TotalItems)) {
            return;
        }
        let body = {};
        body.pageIndex = ++ClientsListInfo.PageIndex;
        body.PageSize = ClientsListInfo.PageSize;
        body.query = '';
        try {
          await  Clients.getClientsList(dispatch, '', true, body).then();
             console.log('LOADING');
        } catch (ex) {
             console.log("SOME ERROR");
        }

    }

    return (
        <View style={styles.containers}>

            <ScrollView
                onScroll={async ({nativeEvent}) => {
                    if (loadDataMore(nativeEvent)) {
                        await loadMorePagination();
                    }
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
  