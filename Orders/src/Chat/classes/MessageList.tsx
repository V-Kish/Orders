import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import {mockupHeightToDP as hp} from '../../constants/Dimensions';
import {COLORS} from '../../constants/colors';
import {MessagePreloaderView} from '../ViewModel/Messages/MessagePreloaderView';
import {Chat} from '../provider/Chat';
import {NewMessageIndicatorView} from "./NewMessageIndicatorView";
import {store} from '../provider/Store';
 // import { RecyclerView } from '../ViewModel/RecyclerViewList';

 // import {ScrollView} from '../ViewModel/ScrollAndroid/NativeScrollView';
import ScrollView from '../ViewModel/ScrollAndroid/NativeScrollView';

import { TypedBaseComponent } from '../../Common/BaseComponent';
import {MessageListItemsView} from "./MessageListItems";
class MessageList extends TypedBaseComponent<Chat> {
    constructor(props) {
        super(props);
    }

    check({nativeEvent}){
        if(nativeEvent){
            console.log('scrollTop', true);
        }
    }

    render() {
        super.render();
        console.log('this.model.items',this.model.items)
        return (
            <View ref={ref => (store().chats.keyboard.emojiChat.messageListRef = ref)}>
                <MessagePreloaderView model={this.model.items.preloader} key={this.model.items.preloader.id}/>
                <MessagePreloaderView model={this.model.items.firstPreloader} key={this.model.items.firstPreloader.id}/>
                <View style={styles.mainContainer}>
                    {/*<RecyclerView*/}
                    {/*     style={styles.listContainer}*/}
                    {/*     dataSource={store().chats.current.items.dataSource}*/}
                    {/*     onScrolledToEnd={store().chats.current.items.loadOldMessages}*/}
                    {/*     onScrolledTop={store().chats.current.items.showNewMessageIndicator}*/}
                    {/*     defaultInverted={store().recyclerViewInverted}*/}
                    {/*     renderItem={({item,index}) => (*/}
                    {/*            <MessageView model={item} key={`Message_${item.id}`} index={index}/>*/}
                    {/*      )}*/}
                    {/*/>*/}
                    <ScrollView
                         ref={ref => { (this.model.ref = ref); (this.model.refOnScrollList=ref);}}
                        onContentSizeChange={this.model.items.onContentSizeChange}
                        onMomentumScrollEnd={this.model.items.onMomentumScrollEnd}
                         maintainVisibleContentPosition={{
                             minIndexForVisible: 0,
                         }}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={this.model.items.refreshing}
                        //         onRefresh={this.model.items.loadOldMessages}
                        //     />
                        // }
                    >
                        <MessageListItemsView model={this.model.items} key={this.model.items.id} />
                    </ScrollView>
                    <NewMessageIndicatorView
                        model={this.model.items.newMessageIndicator}
                        key={this.model.items.newMessageIndicator.id}
                    />
                        {/*<GoBottom*/}
                        {/*    model={this.model.items.goBottom}*/}
                        {/*    key={this.model.items.goBottom.id}*/}
                        {/*/>*/}
                </View>
            </View>
        );
    }
}

export {MessageList};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        zIndex: 10
    },
    listContainer: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        // zIndex: 999
    },
    itemMessage: {
        flex: 1,
        marginTop: hp(60),
    },
    text: {
        color: 'white',
        textAlign: 'right',
    },
    container: {
        paddingTop: hp(30),
        //paddingBottom: hp(5),
    },
    messageListPreloaderBig: {
        paddingVertical: hp(30),
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        height: '100%',
        //opacity: 0.5,
        //justifyContent: 'center',
        zIndex: 10,
    },
    messageListPreloaderSmall: {
        position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 10,
    },
    messageListPreloaderText: {
        textAlign: 'center',
        marginTop: hp(15),
        color: COLORS.WHITE.bg,
    },
});
