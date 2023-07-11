import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_ITEMS = 5;

const SEARCH_ITEM_KEY = 'searchedItems';

const storeRecentSearched = async (
  value: string,
  key: string,
): Promise<void> => {
  try {
    const storedSearched = await AsyncStorage.getItem(key);
    const storedSearchedArray: string[] = storedSearched
      ? (JSON.parse(storedSearched) as string[])
      : [];

    const index = storedSearchedArray.indexOf(value);
    if (index !== -1) {
      storedSearchedArray.splice(index, 1);
    }

    if (storedSearchedArray.length >= MAX_ITEMS) {
      storedSearchedArray.pop();
    }

    storedSearchedArray.unshift(value);

    await AsyncStorage.setItem(key, JSON.stringify(storedSearchedArray));
  } catch (error) {
    console.error('Error storing string array:', error);
  }
};

const getRecentSearched = async (key: string): Promise<string[]> => {
  try {
    const existingSearchedArray = await AsyncStorage.getItem(key);
    return existingSearchedArray
      ? (JSON.parse(existingSearchedArray) as string[])
      : [];
  } catch (error) {
    console.error('Error retrieving string array:', error);
    return [];
  }
};

export {getRecentSearched, storeRecentSearched, SEARCH_ITEM_KEY};
