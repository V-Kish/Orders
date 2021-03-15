import React from 'react';
import {View, StyleSheet, ScrollView, Text } from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../../constants/Dimensions';
import { CustomerListItem } from './CustomerListItem';


export const CustomersListView = () => {

    const renderCustomers = (item) =>{
        return <View>  </View>;
    };

    return (
        <View style={styles.containers}>

            <ScrollView
                onScroll={async ({nativeEvent}) => {
                    if (loadDataMore(nativeEvent) && statePreloader ) {
                    await loadMorePagination();
                    }
                }}

                contentContainerStyle={styles.clientsList}
            >

                {/* {renderCustomers({})} */}

                <CustomerListItem item={{clientName:"Таміла Валютчиця", phoneNumber: "380965204163"}} />
                <CustomerListItem item={{clientName:"Вася Кабан", phoneNumber: "380965204163"}} />
                <CustomerListItem item={{clientName:"Таміла Валютчиця", phoneNumber: "380965204163"}} />
                <CustomerListItem item={{clientName:"Вася Кабан", phoneNumber: "380965204163"}} />
                <CustomerListItem item={{clientName:"Таміла Валютчиця", phoneNumber: "380965204163"}} />
                <CustomerListItem item={{clientName:"Вася Кабан", phoneNumber: "380965204163"}} />


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
  