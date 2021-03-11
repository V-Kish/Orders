import { TypedBaseComponent } from '../../Common/BaseComponent';
import * as React from 'react';
import {
    RefreshControl,
    StyleSheet,
    ScrollView,
    View,
} from 'react-native';
import { mockupHeightToDP as hp } from '../../constants/Dimensions';

import { COLORS } from '../../constants/colors';
import { MessagePreloaderView } from '../ViewModel/Messages/MessagePreloaderView';
import { Chat } from '../provider/Chat';
import { MessageListItemsView } from './MessageListItems';
import {NewMessageIndicatorView} from "./NewMessageIndicatorView";

import { store } from '../provider/Store';

class MessageListIOS extends TypedBaseComponent<Chat> {
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        return (
            <View style={styles.messageListCotainer} ref={ref => (store().chats.keyboard.emojiChat.messageListRef = ref)} >
                <MessagePreloaderView model={this.model.items.preloader} key={this.model.items.preloader.id} />
                <MessagePreloaderView model={this.model.items.firstPreloader} key={this.model.items.firstPreloader.id} />
                <ScrollView
                    ref={ref => { (this.model.ref = ref); (this.model.refOnScrollList=ref);}}
                    onContentSizeChange={this.model.items.onContentSizeChange}
                    onMomentumScrollEnd={this.model.items.onMomentumScrollEnd}
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                    }}
                    refreshControl={
                         <RefreshControl
                             refreshing={this.model.items.refreshing}
                             onRefresh={this.model.items.loadOldMessages}
                         />
                   }
                >
                    <MessageListItemsView model={this.model.items} key={this.model.items.id} />
                </ScrollView>

                <NewMessageIndicatorView
                    model={this.model.items.newMessageIndicator}
                    key={this.model.items.newMessageIndicator.id}
                />
            </View>
        );
    }
}

export { MessageListIOS };

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(30),
        //paddingBottom: hp(5),
    },
    backgroundImg: {
        width: '100%',
        height: '100%',
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
        color: COLORS.FONT_WHITE,
    },
    messageListCotainer: {
        // backgroundColor: 'red',
        // flex: 1,
        // paddingBottom: hp(350)
        // height: 200,
    }
});
