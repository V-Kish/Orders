import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {COLORS} from '../../../constants/colors';
//
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
              tintColor={COLORS.BLUE.bg}
              titleColor={COLORS.BLUE.bg}
              refreshing={refreshing}
              onRefresh={refresh}
          />
      }
      >
      {children}
    </ScrollView>
  )
};

// export class RefreshControllScroll extends MultiTypedBaseComponent<RefreshControllModel>{
//     constructor(props:IBaseProps<RefreshControllModel>) {
//         super(props);
//     }
//     render() {
//         super.render();
//         return <ScrollView
//             style={{flex: 1}}
//             refreshControl={
//                 <RefreshControl
//                     tintColor={COLORS.BLUE.bg}
//                     refreshing={this.model.refreshing}
//                     onRefresh={()=>this.model.onRefresh(this.props.onRefresh)}
//                 />
//             }
//         >
//             {this.props.children}
//         </ScrollView>
//     }
// }
