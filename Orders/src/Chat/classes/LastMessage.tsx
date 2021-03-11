import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { mockupHeightToDP as hp } from '../../constants/Dimensions';
import { currentUser } from '../../Core/CurrentUser';
import { TypedBaseComponent } from '../../Common/BaseComponent';
import { LastMessage } from '../provider/LastMessage';

class LastMessageView extends TypedBaseComponent<LastMessage> {
    private _width: any;
    constructor(props) {
        super(props);
        this._width = this.props.width || null;
    }

    get width() {
        return this._width;
    }

    signature(item: LastMessage) {
        switch (item.messageType) {
            case 1:
                return item.message;
            case 8:
                return '📎';
            case 5:
                return '📷';
            case 3:
                return '🎵';
            case 100:
                return item.message;
        }
        return '';
    }

    returnLastMessage(item: LastMessage) {
        if (item.isPublic) {
            if (typeof item.name === 'undefined' || item.name === null) {
                return this.signature(item);
            }
            if (item.userId !== currentUser().userId) {
                return item.name + ': ' + this.signature(item);
            } else {
                if (item.userId === currentUser().userId) {
                    return 'Ви' + ': ' + this.signature(item);
                } else {
                    return this.signature(item);
                }
            }
        } else {
            if (item.userId === currentUser().userId) {
                return 'Ви' + ': ' + this.signature(item);
            } else {
                return this.signature(item);
            }
        }
    }

    render() {
        return (
            <View
                style={[
                    styles.textContainer,
                    this.model.unreadCount !== null
                        ? styles.textContainerWidth
                        : null,
                ]}>
                <Text
                    style={
                        this.model.unreadCount
                            ? styles.lastMessageTextUnread
                            : styles.lastMessageText
                    }
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {this.returnLastMessage(this.model)}
                </Text>
            </View>
        );
    }
}

export { LastMessageView };

const styles = StyleSheet.create({
  textContainer: {
    width: hp(200),
  },
  textContainerWidth: {
    width: hp(160),
  },
  lastMessageText: {
    marginTop: hp(0),
    fontSize: hp(16),
    fontFamily: 'Roboto-Light',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  lastMessageTextUnread: {
    marginTop: hp(0),
    fontSize: hp(12),
    fontFamily: 'Roboto-Medium',
    color: 'rgba(0, 0, 0, 0.38)',
  },
});
