import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';

export const RefreshControllScroll = ({children, onRefresh, referense = (ref:any)=>{}}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };
  return (
    <ScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      ref={referense}
      refreshControl={
          <RefreshControl
              tintColor={'red'}
              titleColor={'red'}
              refreshing={refreshing}
              onRefresh={refresh}
          />
      }
      >
      {children}
    </ScrollView>
  )
};
