import AsyncStorage from '@react-native-community/async-storage';

export const readData = async (name: string) => {
  try {
    return await AsyncStorage.getItem(name);
  } catch (e) {
    // error reading value
  }
};
