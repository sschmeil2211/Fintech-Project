import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface BankAccountData {
    cvu: string;
    bankRef: FirebaseFirestoreTypes.DocumentReference;
    userRef: FirebaseFirestoreTypes.DocumentReference;
}

class BankAccount {
    private cvu: string;
    private bankRef: FirebaseFirestoreTypes.DocumentReference;
    private userRef: FirebaseFirestoreTypes.DocumentReference;

    constructor(data: BankAccountData) {
        this.cvu = data.cvu;
        this.bankRef = data.bankRef;
        this.userRef = data.userRef;
    }

    async getBankData() {
        try {
            const bankDoc = await this.bankRef.get();
            return bankDoc.data();
        } catch (error) {
            console.error('Error getting bank data:', error);
            throw error;
        }
    }

    async getUserData() {
        try {
            const userDoc = await this.userRef.get();
            return userDoc.data();
        } catch (error) {
            console.error('Error getting user data:', error);
            throw error;
        }
    }

    static async getAllBankAccounts() {
        try {
            const snapshot = await firestore().collection('bankAccounts').get();
            const bankAccounts = snapshot.docs.map(doc => new BankAccount(doc.data() as BankAccountData));
            return bankAccounts;
        } catch (error) {
            console.error('Error getting bank accounts:', error);
            throw error;
        }
    }

    static async getBankAccountsByUser(userId: string) {
        try {
            const snapshot = await firestore()
                .collection('bankAccounts')
                .where('userRef', '==', firestore().doc(`users/${userId}`))
                .get();
            const bankAccounts = snapshot.docs.map(doc => new BankAccount(doc.data() as BankAccountData));
            return bankAccounts;
        } catch (error) {
            console.error('Error getting bank accounts:', error);
            throw error;
        }
    }

    // Nuevo método para obtener un usuario por CVU
    static async getUserByCVU(cvu: string) {
        try {
            const snapshot = await firestore()
                .collection('bankAccounts')
                .where('cvu', '==', cvu)
                .get();
            if (snapshot.empty) {
                console.error('No se encontró ninguna cuenta bancaria con el CVU especificado.');
                return null;
            }
            const bankAccountData = snapshot.docs[0].data() as BankAccountData;
            const userDoc = await bankAccountData.userRef.get();
            return userDoc.data();
        } catch (error) {
            console.error('Error getting user by CVU:', error);
            throw error;
        }
    }

    // Nuevo método para obtener una cuenta bancaria por CVU
    static async getBankAccountByCVU(cvu: string) {
        try {
            const snapshot = await firestore()
                .collection('bankAccounts')
                .where('cvu', '==', cvu)
                .get();
            if (snapshot.empty) {
                console.error('No se encontró ninguna cuenta bancaria con el CVU especificado.');
                return null;
            }
            const bankAccountData = snapshot.docs[0].data() as BankAccountData;
            return new BankAccount(bankAccountData);
        } catch (error) {
            console.error('Error getting bank account by CVU:', error);
            throw error;
        }
    }

    // Agrega este método a tu clase BankAccount
    async getBankDetails() {
        try {
            if (this.bankRef) {
                const bankDoc = await this.bankRef.get();
                return bankDoc.data();
            } else {
                console.error('No se encontró la referencia del banco.');
                return null;
            }
        } catch (error) {
            console.error('Error obteniendo detalles del banco:', error);
            throw error;
        }
    }
}

export default BankAccount;