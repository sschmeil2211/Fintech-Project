import firestore from '@react-native-firebase/firestore'; 

interface Enum {
    nationalities: string[];
    occupations: string[];
    civilStatus: string[];
    genres: string[];
}

class Enum { 

    // Método para obtener los enums de Firestore
    static async getEnums(): Promise<Enum | null> { 
        try {
            const enumsDoc = await firestore().collection('enums').doc('LRJHLfGMilNeEAYnDiRZ').get();
            if (enumsDoc.exists) {
                const enumsData = enumsDoc.data() as Enum;
                return enumsData;
            } else {
                console.log('Enums document not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching enums:', error);
            return null;
        }
    } 
}

export default Enum;