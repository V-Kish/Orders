import {Text} from 'react-native';
import React from 'react';

var lookup = {
  b: 'bold',
};

export const textBoldParser = (text: string) => {
  try {
    // split on highlight tags to get the arrays.
    text = text.split(/(<.*?>.*?<\/.*?>)/g);

    // odd indexes in array will be tags to be replaced with text tag.
    for (var i = 1; i < text.length; i += 2) {
      // extract the text string to highlight.
      var word = text[i].replace(/<.*?>(.*?)<\/.*?>/, '$1');

      //apply the style and return the text tag.
      text[i] = <Text key={text[i]} style={{fontWeight: lookup[text[i][1]]}}>{word}</Text>;
    }
    return text;
  } catch (e) {
    return text;
  }
};
export const deleteEmojiInString = (value: string) => {
  return value.replace(
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
    '',
  );
};
