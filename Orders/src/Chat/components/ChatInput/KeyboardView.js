import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { mockupHeightToDP as hp } from '../../../constants/Dimensions';

const KeyboardView = ({ onClick }) => {
  const emojiItems = [
    {
      id: 1,
      symbol: '😀',
    },
    {
      id: 2,
      symbol: '😃',
    },
    {
      id: 3,
      symbol: '😄',
    },
    {
      id: 4,
      symbol: '😁',
    },
    {
      id: 5,
      symbol: '😆',
    },
    {
      id: 6,
      symbol: '😅',
    },
    {
      id: 7,
      symbol: '😂',
    },
    {
      id: 8,
      symbol: '🙂',
    },
    {
      id: 9,
      symbol: '🙃',
    },
    {
      id: 10,
      symbol: '😉',
    },
    {
      id: 11,
      symbol: '😊',
    },
    {
      id: 12,
      symbol: '😇',
    },
    {
      id: 13,
      symbol: '😍',
    },
    {
      id: 14,
      symbol: '😘',
    },
    {
      id: 15,
      symbol: '😗',
    },
    {
      id: 16,
      symbol: '☺',
    },
    {
      id: 17,
      symbol: '😚',
    },
    {
      id: 18,
      symbol: '😙',
    },
    {
      id: 19,
      symbol: '😋',
    },
    {
      id: 20,
      symbol: '😛',
    },
    {
      id: 21,
      symbol: '😜',
    },
    {
      id: 22,
      symbol: '😝',
    },
    {
      id: 23,
      symbol: '🤑',
    },
    {
      id: 24,
      symbol: '🤗',
    },
    {
      id: 25,
      symbol: '🤔',
    },
    {
      id: 26,
      symbol: '🤐',
    },
    {
      id: 27,
      symbol: '😐',
    },
    {
      id: 28,
      symbol: '😑',
    },
    {
      id: 29,
      symbol: '😶',
    },
    {
      id: 30,
      symbol: '😏',
    },
    {
      id: 31,
      symbol: '😒',
    },
    {
      id: 32,
      symbol: '🙄',
    },
    {
      id: 33,
      symbol: '😬',
    },
    {
      id: 34,
      symbol: '😌',
    },
    {
      id: 35,
      symbol: '😔',
    },
    {
      id: 36,
      symbol: '😪',
    },
    {
      id: 37,
      symbol: '😴',
    },
    {
      id: 38,
      symbol: '😷',
    },
    {
      id: 39,
      symbol: '🤒',
    },
    {
      id: 40,
      symbol: '🤕',
    },
    {
      id: 41,
      symbol: '😵',
    },
    {
      id: 42,
      symbol: '😎',
    },
    {
      id: 43,
      symbol: '🤓',
    },
    {
      id: 44,
      symbol: '😕',
    },
    {
      id: 45,
      symbol: '🙁',
    },
    {
      id: 46,
      symbol: '☹️',
    },
    {
      id: 47,
      symbol: '😮',
    },
    {
      id: 48,
      symbol: '😯',
    },
    {
      id: 49,
      symbol: '😲',
    },
    {
      id: 50,
      symbol: '😳',
    },
    {
      id: 51,
      symbol: '😦',
    },
    {
      id: 52,
      symbol: '😧',
    },
    {
      id: 53,
      symbol: '😨',
    },
    {
      id: 54,
      symbol: '😰',
    },
    {
      id: 55,
      symbol: '😥',
    },
    {
      id: 56,
      symbol: '😢',
    },
    {
      id: 57,
      symbol: '😭',
    },
    {
      id: 58,
      symbol: '😱',
    },
    {
      id: 59,
      symbol: '😖',
    },
    {
      id: 60,
      symbol: '😣',
    },
    {
      id: 61,
      symbol: '😞',
    },
    {
      id: 62,
      symbol: '😓',
    },
    {
      id: 63,
      symbol: '😩',
    },
    {
      id: 64,
      symbol: '😫',
    },
    {
      id: 65,
      symbol: '😤',
    },
    {
      id: 655,
      symbol: '😡',
    },
    {
      id: 66,
      symbol: '😠',
    },
    {
      id: 67,
      symbol: '😈',
    },
    {
      id: 68,
      symbol: '👿',
    },
    {
      id: 69,
      symbol: '💀',
    },
    {
      id: 70,
      symbol: '☠️',
    },
    {
      id: 71,
      symbol: '💩',
    },
    {
      id: 72,
      symbol: '👹',
    },
    {
      id: 73,
      symbol: '👺',
    },
    {
      id: 74,
      symbol: '👻',
    },
    {
      id: 75,
      symbol: '👽',
    },
    {
      id: 76,
      symbol: '👾',
    },
    {
      id: 77,
      symbol: '🤖',
    },
    {
      id: 78,
      symbol: '😺',
    },
    {
      id: 79,
      symbol: '😸',
    },
    {
      id: 80,
      symbol: '😹',
    },
    {
      id: 81,
      symbol: '😻',
    },
    {
      id: 82,
      symbol: '😼',
    },
    {
      id: 83,
      symbol: '😽',
    },
    {
      id: 84,
      symbol: '🙀',
    },
    {
      id: 85,
      symbol: '😿',
    },
    {
      id: 86,
      symbol: '😾',
    },
    {
      id: 87,
      symbol: '💋',
    },
    {
      id: 88,
      symbol: '👋',
    },
    {
      id: 89,
      symbol: '🖐️',
    },
    {
      id: 90,
      symbol: '✋',
    },
    {
      id: 91,
      symbol: '🖖',
    },
    {
      id: 92,
      symbol: '👌',
    },
    {
      id: 93,
      symbol: '✌️',
    },
    {
      id: 94,
      symbol: '🤘',
    },
    {
      id: 95,
      symbol: '👈',
    },
    {
      id: 96,
      symbol: '👉',
    },
    {
      id: 97,
      symbol: '🖕',
    },
    {
      id: 98,
      symbol: '👇',
    },
    {
      id: 99,
      symbol: '☝️',
    },
    {
      id: 100,
      symbol: '👍',
    },
    {
      id: 101,
      symbol: '👎',
    },
    {
      id: 102,
      symbol: '✊',
    },
    {
      id: 103,
      symbol: '👊',
    },
    {
      id: 104,
      symbol: '👏',
    },
    {
      id: 105,
      symbol: '🙌',
    },
    {
      id: 106,
      symbol: '👐',
    },
    {
      id: 107,
      symbol: '🙏',
    },
    {
      id: 108,
      symbol: '💅',
    },
    {
      id: 109,
      symbol: '💪',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {emojiItems.map(item => (
        <TouchableOpacity
          style={styles.item}
          key={item.id}
          onPress={() => onClick(item.symbol)}>
          <Text style={styles.itemText}>{item.symbol}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: '#fff',
  },
  item: {
    padding: hp(5),
  },
  itemText: {
    fontSize: hp(30),
  },
});

