import AsyncStorage from '@react-native-community/async-storage';

export const saveToLocalStorage = (key: string, value: string, callback?: (error?: Error) => void): Promise<void> => {
    return AsyncStorage.setItem(key, value, callback);
}
export const getFromLocalStorage = (key: string, callback?: (error?: Error, result?: string) => void): Promise<string | null> => {
    return AsyncStorage.getItem(key, callback);
}

export default {
    setItem: saveToLocalStorage,
    getItem: getFromLocalStorage,
    removeItem: AsyncStorage.removeItem,
}