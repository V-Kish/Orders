import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import { mockupHeightToDP as hp } from '../../constants/Dimensions';
import { ChatItem } from './ChatItem';
import { TypedBaseComponent } from '../../Common/BaseComponent';
import { Chats } from '../provider/Chats';
import {controllers} from "../../Controllers/Controllers";
import {Loader} from "../../View/Components/Loader/Loader";
import {STYLES} from "../../constants/styles";

class ChatListView extends TypedBaseComponent<Chats> {
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
        const osbbLeadId = controllers().userController.osbbLead !== null ?controllers().userController.osbbLead?.userId :-1;
        const osbbLeaderChat = this.model.storage.find(ch => !ch.isPublic && ch.pairUser!==null && ch.pairUser.id == osbbLeadId)
        const osbbLeaderChatId = osbbLeaderChat!==undefined ? osbbLeaderChat.id : -1
        const osbbMainGroup = this.model.storage.find(ch=>ch.isOsbbMainGroup)
        const osbbMainGroupId = osbbMainGroup!==undefined ? osbbMainGroup.id : -1
        if(this.model.storage.length == 0){
            return <View style={{flex: 1}}><View style={STYLES.preloaderStyle}><Loader/></View></View>
        }
        return (<ScrollView style={styles.container}>
                {osbbLeaderChat!==undefined && <ChatItem
                    model={osbbLeaderChat}
                    key={`chats_lead`}
                    leader={true}
                />}
                {osbbMainGroup!==undefined && <ChatItem
                    model={osbbMainGroup}
                    key={'chats_main_group'}
                    leader={true}
                />}
                {this.model.storage.filter(ch=>
                    ch.id !== osbbLeaderChatId && ch.id !== osbbMainGroupId
                ).map((chat, index) => {
                    return <ChatItem model={chat} key={`chats_${index}`} />
                    }
                )}
                {/*// Padding for bottom navigation // */}
                {/*<LastItemBottomPadding*/}
                {/*    model={controllers().lastItemPaddingBottom}*/}
                {/*    key={this.childId(controllers().lastItemPaddingBottom)}*/}
                {/*    id={this.childId(controllers().lastItemPaddingBottom)}*/}
                {/*/>*/}
            </ScrollView>
            );
    }
}

export { ChatListView };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp(10),
    },
});
