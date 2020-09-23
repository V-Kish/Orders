import AsyncStorage from '@react-native-community/async-storage';

export const readData = async (name) => {
  try {
    return await AsyncStorage.getItem(name);
  } catch (e) {
    // error reading value
  }
};
