import firestore from '@react-native-firebase/firestore';

export interface BankData {
    name: string; 
}

class Bank {
    private name: string; 

    constructor(data: BankData) {
        this.name = data.name; 
    }

    static async getAllBanks() {
        try {
            const snapshot = await firestore().collection('banks').get();
            const banks = snapshot.docs.map(doc => new Bank(doc.data() as BankData));
            return banks;
        } catch (error) {
            console.error('Error getting banks:', error);
            throw error;
        }
    }
}

export default Bank;