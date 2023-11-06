import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '../models/User'; // Asegúrate de importar User y UserData correctamente

export default class AsyncStorageService {
    private static async storeData(key: string, data: any) {
        try {
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem(key, jsonData);
        } catch (error) {
            console.error('Error storing data:', error);
            throw error;
        }
    }

    private static async getData(key: string) {
        try {
            const jsonData = await AsyncStorage.getItem(key);
            return jsonData ? JSON.parse(jsonData) : null;
        } catch (error) {
            console.error('Error getting data:', error);
            throw error;
        }
    }

    static async saveUserLocally(data: UserData) {  
        try {
            await this.storeData('userData', data);
            console.log(data);
        } catch (error) {
            throw error;
        }
    }

    static async getUserLocally(): Promise<UserData | null> {
        try {
            const userData = await this.getData('userData'); 
            return userData;
        } catch (error) {
            throw error;
        }
    }

    static async clearData() {
        try {
            await AsyncStorage.clear();
            console.log("All data cleared successfully.");
        } catch (error) {
            console.error("Error clearing data:", error);
            throw error;
        }
    }
}